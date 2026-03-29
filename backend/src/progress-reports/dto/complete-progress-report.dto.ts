import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class CompleteProgressReportDto {
  @ApiProperty({
    format: "uuid",
    example: "4d71d7e9-cfaa-4456-9f2f-e4b7f1a35341"
  })
  @IsUUID()
  progressReportId!: string;

  @ApiProperty({
    example: "The user is showing improving confidence and more balanced responses over recent sessions."
  })
  @IsString()
  report!: string;

  @ApiPropertyOptional({
    example: "Strong recent improvement, especially in reflection and recovery.",
    nullable: true
  })
  @IsOptional()
  @IsString()
  feedback?: string;
}
