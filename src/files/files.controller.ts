import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Delete,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Files } from "./files.model";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(
    @InjectModel(Files) private fileRepository: typeof Files,
    private filesRepository: FilesService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  async create(@Body() imageInfo, @UploadedFiles() images) {
    console.log(imageInfo, images)
    return await this.filesRepository.create(imageInfo, images);
  }

  @Delete("unused")
  async deleteUnused(): Promise<void> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    await Files.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneHourAgo,
        },
        [Op.and]: [{ essenceTable: null }, { essenceId: null }],
      },
    });
  }
}
