import { ApiProperty } from "@nestjs/swagger";

export class BaseQuestionOptionDto {
  @ApiProperty({ example: "18-24" })
  label!: string;

  @ApiProperty({ example: "18_24" })
  value!: string;
}
