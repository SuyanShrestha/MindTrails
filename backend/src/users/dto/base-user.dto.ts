import { ApiProperty } from "@nestjs/swagger";

export class BaseUserDto {
  @ApiProperty({
    format: "uuid",
    example: "7f98fb40-9a70-4e95-9734-52c65546d9f0"
  })
  id!: string;

  @ApiProperty({ example: "user@example.com" })
  email!: string;

  @ApiProperty({
    type: String,
    format: "date-time",
    example: "2026-03-28T05:00:00.000Z"
  })
  createdAt!: Date;
}
