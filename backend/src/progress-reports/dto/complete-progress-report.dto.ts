import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString, IsUUID } from "class-validator";

export class CompleteProgressReportDto {
  @ApiProperty({
    format: "uuid",
    example: "4d71d7e9-cfaa-4456-9f2f-e4b7f1a35341"
  })
  @IsUUID()
  progressReportId!: string;

  @ApiProperty({
    type: "object",
    additionalProperties: true,
    example: {
      summary: "The user is showing improving confidence and more balanced responses.",
      score: 78,
      strengths: ["reflection", "recovery"],
      concerns: ["avoidance under stress"]
    }
  })
  @IsObject()
  report!: Record<string, unknown>;

  @ApiPropertyOptional({
    example: "Strong recent improvement, especially in reflection and recovery.",
    nullable: true
  })
  @IsOptional()
  @IsString()
  feedback?: string;
}
