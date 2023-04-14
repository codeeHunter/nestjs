import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
  UseInterceptors,
  ValidationPipe,
  Request,
} from "@nestjs/common";
import { TextBlockDto } from "./dto/text-block.dto";
import { TextBlockService } from "./text-block.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuards } from "../auth/roles.guard";
import { Query, UploadedFiles, UsePipes } from "@nestjs/common/decorators";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("text_block")
export class TextBlockController {
  constructor(private textBlockController: TextBlockService) {}

  @UseGuards(RolesGuards, JwtAuthGuard)
  @Post()
  @Roles("admin")
  @UseInterceptors(FilesInterceptor("images")) 
  @UsePipes(ValidationPipe)
  async create(
    @Body() textBlockDto: TextBlockDto,
    @UploadedFiles() images: string
  ) {
    return await this.textBlockController.createBlock(textBlockDto, images);
  }

  @Get()
  async getAll() {
    return await this.textBlockController.getAllBlock();
  }

  @Get("/filter")
  async getGroup(@Query("group") group: string) {
    return await this.textBlockController.getGroup(group);
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    return await this.textBlockController.getBlockById(id);
  }

  @Put(":id")
  @UseGuards(RolesGuards, JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images")) 
  @Roles("admin")
  async editBlock(
    @Param("id") id: number,
    @UploadedFiles() images: string,
    @Body() textBlock: TextBlockDto,
  ) {
    return await this.textBlockController.editBlock(id, images, textBlock);
  }

  @Delete(":id")
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles("admin")
  async deleteBlock(@Param("id") id: number) {
    return await this.textBlockController.deleteBlock(id);
  }
}
