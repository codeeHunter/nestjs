import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import * as path from "path";
import { Op } from "sequelize";
import * as uuid from "uuid";
import { Files } from "./files.model";

@Injectable()
export class FilesService {
  constructor(@InjectModel(Files) private files: typeof Files) {}

  async createFile(files): Promise<string> {
    try {
      let fileNames = "";
      files.forEach((file, index) => {
        const fileName = uuid.v4() + ".jpg";
        fileNames += fileName + " ";
        const filePath = path.resolve(__dirname, "..", "static");

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
        }

        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      });

      return fileNames;
    } catch (error) {
      throw new HttpException(
        "Произошла ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(imageInfo, files) {
    const infoImage = await this.files.create({
      ...imageInfo,
      images: files,
    });

    return infoImage;
  }

  async deleteImages(images: string) {
    try {
      const photos = images.split(" ").filter((item) => item);

      photos.map((photo) => {
        const filePath = path.join(__dirname, "..", "static", photo);
        fs.unlinkSync(filePath);
      });
    } catch (e) {
      throw new HttpException(
        "Произошла при удаление файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteUnusedFiles(): Promise<Files[]> {
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); // Один час назад

    // Получаем все записи, удовлетворяющие условиям
    const filesToDelete = await this.files.findAll({
      where: {
        [Op.or]: [
          {
            createdAt: {
              [Op.lte]: oneHourAgo,
            },
          },
          {
            essenceId: null,
            essenceTable: null,
          },
        ],
      },
    });

    // Удаляем файлы
    for (const file of filesToDelete) {
      await file.destroy();
    }

    return filesToDelete;
  }
}
