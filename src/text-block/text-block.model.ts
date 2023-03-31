import { Model, Table, Column, DataType } from "sequelize-typescript";

interface TextBlockCreationAttrs {
  mainHeroText: string;
  name: string;
  images: string;
  text: string;
  group: string;
}

@Table({ tableName: "text_block" })
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
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
  mainHeroText: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  images: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  group: string;
}
