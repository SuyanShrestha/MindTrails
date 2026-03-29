import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProgressReportDto {
  @ApiProperty({
    format: "uuid",
    example: "4d71d7e9-cfaa-4456-9f2f-e4b7f1a35341"
  })
  id!: string;

  @ApiProperty({
    format: "uuid",
    example: "bb6f520b-f4ad-4262-9c7e-a24b1f3a0c7d"
  })
  gameSessionId!: string;

  @ApiProperty({
    format: "uuid",
    example: "b2fd99fa-f7e6-4844-9f7c-a2f9f36208b8"
  })
  userId!: string;

  @ApiProperty({
    example: "PENDING"
  })
  status!: string;

  @ApiPropertyOptional({
    nullable: true,
    type: "object",
    additionalProperties: true,
    example: {
      summary: "The user is showing improving confidence and more balanced responses.",
      score: 78,
      strengths: ["reflection", "recovery"],
      concerns: ["avoidance under stress"]
    }
  })
  report!: Record<string, unknown> | null;

  @ApiPropertyOptional({
    nullable: true,
    example: "Strong recent improvement, especially in reflection and recovery."
  })
  feedback!: string | null;

  @ApiProperty({
    type: String,
    format: "date-time",
    example: "2026-03-29T10:20:00.000Z"
  })
  createdAt!: Date;

  @ApiProperty({
    type: String,
    format: "date-time",
    example: "2026-03-29T10:25:00.000Z"
  })
  updatedAt!: Date;
}

export class GetProgressReportResponseDto {
  @ApiProperty({ type: ProgressReportDto })
  progressReport!: ProgressReportDto;
}

export class ListProgressReportsResponseDto {
  @ApiProperty({ type: [ProgressReportDto] })
  progressReports!: ProgressReportDto[];
}

export class CompleteProgressReportResponseDto {
  @ApiProperty({ example: true })
  updated!: boolean;

  @ApiProperty({
    format: "uuid",
    example: "4d71d7e9-cfaa-4456-9f2f-e4b7f1a35341"
  })
  progressReportId!: string;

  @ApiProperty({
    example: "COMPLETED"
  })
  status!: string;
}
