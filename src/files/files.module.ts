import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { Files } from "./files.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([Files]),
  ],
})
export class FilesModule {}
