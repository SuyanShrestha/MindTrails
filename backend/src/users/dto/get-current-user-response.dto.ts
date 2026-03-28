import { ApiProperty } from "@nestjs/swagger";
import { UserProfileDto } from "./user-profile.dto";

export class GetCurrentUserResponseDto {
  @ApiProperty({ type: UserProfileDto })
  user!: UserProfileDto;
}
