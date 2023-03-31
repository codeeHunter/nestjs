import { DataTypes } from "sequelize";
import { Model, Table, Column, DataType } from "sequelize-typescript";

interface FilesCreationAttrs {
  name: string;
  images: string;
  essenceTable: string;
  essenceId: number;
}

@Table({ tableName: "files" })
export class Files extends Model<Files, FilesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.STRING,
  })
  images: string;

  @Column({ type: DataTypes.STRING(255), allowNull: false })
  essenceTable: string;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  })
  essenceId: number;
}

