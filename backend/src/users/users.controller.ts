import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtUser } from "../common/interfaces/jwt-user.interface";
import {
  ApiEnvelopeResponse,
  ApiStandardErrorResponses
} from "../common/swagger/api-response.decorator";
import { createResponse } from "../common/utils/response.util";
import { GetCurrentUserResponseDto } from "./dto/get-current-user-response.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the current authenticated user's profile" })
  @ApiEnvelopeResponse({
    description: "User profile retrieved successfully",
    type: GetCurrentUserResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async getMe(@CurrentUser() user: JwtUser) {
    const profile = await this.usersService.getCurrentUser(user.sub);
    const data: GetCurrentUserResponseDto = {
      user: profile
    };

    return createResponse(data, "User profile retrieved successfully");
  }
}
