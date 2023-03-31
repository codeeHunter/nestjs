import { IsString } from "class-validator";

export class TextBlockDto {
  @IsString({message: "Должно быть строкой"})
  readonly mainHeroText: string;

  @IsString({message: "Должно быть строкой"})
  readonly name: string;

  readonly images: string;

  @IsString({message: "Должно быть строкой"})
  readonly text: string;

  @IsString({message: "Должно быть строкой"})
  readonly group: string;
}
