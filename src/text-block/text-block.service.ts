import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { TextBlockDto } from "./dto/text-block.dto";
import { TextBlock } from "./text-block.model";

@Injectable()
export class TextBlockService {
  constructor(
    @InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
    private fileService: FilesService
  ) {}

  async createBlock(textBlockDto: TextBlockDto, images: string) {
    const fileName = await this.fileService.createFile(images);
    const textBlock = await this.textBlockRepository.create({
      ...textBlockDto,
      images: fileName,
    });

    await this.fileService.create(
      {
        name: textBlockDto.name,
        essenceTable: "text-block",
        essenceId: textBlock.id,
      },
      fileName
    );

    return textBlock;
  }

  async getAllBlock() {
    const textBlock = await this.textBlockRepository.findAll();

    return textBlock;
  }

  async getBlockById(id: number) {
    const textBlock = await this.textBlockRepository.findByPk(id);

    if (textBlock) return textBlock;

    throw new HttpException(
      "Такого поста не существует",
      HttpStatus.BAD_REQUEST
    );
  }

  async getGroup(group: string) {
    const textBlock = await this.textBlockRepository.findAll({
      where: { group },
    });

    if (textBlock.length > 0) return textBlock;

    throw new HttpException(
      "Таких групп не существует",
      HttpStatus.BAD_REQUEST
    );
  }

  async editBlock(id: number, images: string, textBlock: TextBlockDto) {
    const imagesPrev = await this.textBlockRepository.findByPk(id);
    let imagesPrevious;

    if (imagesPrev) {
      imagesPrevious = imagesPrev.dataValues.images;
    } else {
      throw new HttpException(
        "Такого поста не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    let filesName = "";

    if (images.length > 0) {
      this.fileService.deleteImages(imagesPrevious);
      filesName = await this.fileService.createFile(images);
    }

    let updatedPost;

    if (images.length > 0) {
      updatedPost = await this.textBlockRepository.update(
        { ...textBlock, images: filesName },
        {
          where: { id },
          returning: true,
        }
      );
    } else {
      updatedPost = await this.textBlockRepository.update(
        { ...textBlock },
        {
          where: { id },
          returning: true,
        }
      );
    }

    if (updatedPost === 0) {
      throw new HttpException(
        "Такого поста не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    return updatedPost[1][0].dataValues;
  }

  async deleteBlock(id: number) {
    const textBlock = await this.textBlockRepository.destroy({ where: { id } });

    if (textBlock) return { data: textBlock, message: "Успешно удален" };

    throw new HttpException(
      "Такого поста не существует",
      HttpStatus.BAD_REQUEST
    );
  }
}
