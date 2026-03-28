import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @ApiProperty({
    example: "user@example.com"
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "password123",
    minLength: 8,
    maxLength: 128
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
