import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success!: false;

  @ApiProperty({ example: "Validation failed" })
  message!: string;

  @ApiPropertyOptional({
    type: [String],
    example: ["email must be an email", "password must be longer than or equal to 8 characters"]
  })
  errors?: string[];
}
