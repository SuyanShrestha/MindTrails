import { ApiProperty } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";

export class UserProfileDto extends BaseUserDto {
  @ApiProperty({
    type: String,
    format: "date-time",
    example: "2026-03-28T06:15:00.000Z"
  })
  updatedAt!: Date;
}
