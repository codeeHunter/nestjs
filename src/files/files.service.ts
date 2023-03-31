import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { Files } from "./files.model";

@Injectable()
export class FilesService {
  constructor(@InjectModel(Files) private files: typeof Files) {}

  async createFile(files): Promise<string> {
    try {
      let fileNames = "";
      files.forEach((file) => {
        const fileName = uuid.v4() + ".jpg";
        fileNames += fileName + " ";
        const filePath = path.resolve(__dirname, "..", "static");

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
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
    const image = await this.createFile(files);
    const infoImage = await this.files.create({
      ...imageInfo,
      images: image
    });

    return infoImage;
  }

  async overwrite(files) {
    try {
      let fileNames = "";
      files.forEach((file) => {
        const fileName = uuid.v4() + ".jpg";
        fileNames += fileName + " ";
        const filePath = path.resolve(__dirname, "..", "static");

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
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
}
