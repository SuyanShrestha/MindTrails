import { ApiProperty } from "@nestjs/swagger";
import { BaseUserDto } from "../../users/dto/base-user.dto";

export class AuthTokenDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.payload"
  })
  accessToken!: string;

  @ApiProperty({ example: "Bearer" })
  tokenType!: "Bearer";

  @ApiProperty({ example: "7d" })
  expiresIn!: string;
}

export class AuthenticatedUserDto extends BaseUserDto {}

export class AuthResponseDto {
  @ApiProperty({ type: AuthenticatedUserDto })
  user!: AuthenticatedUserDto;

  @ApiProperty({ type: AuthTokenDto })
  tokens!: AuthTokenDto;
}
