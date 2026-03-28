import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiSuccessEnvelopeDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: "Request successful" })
  message!: string;

  @ApiProperty({ type: "object", additionalProperties: true })
  data!: unknown;

  @ApiPropertyOptional({ type: "object", additionalProperties: true })
  meta?: Record<string, unknown>;
}
