import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtUser } from "../common/interfaces/jwt-user.interface";
import {
  ApiEnvelopeResponse,
  ApiStandardErrorResponses
} from "../common/swagger/api-response.decorator";
import { createResponse } from "../common/utils/response.util";
import { GetCurrentUserResponseDto } from "./dto/get-current-user-response.dto";
import { UpdateMyProfileDto } from "./dto/update-my-profile.dto";
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

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update the current authenticated user's profile" })
  @ApiBody({ type: UpdateMyProfileDto })
  @ApiEnvelopeResponse({
    description: "User profile updated successfully",
    type: GetCurrentUserResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async updateMe(@CurrentUser() user: JwtUser, @Body() dto: UpdateMyProfileDto) {
    const profile = await this.usersService.updateCurrentUser(user.sub, dto);
    const data: GetCurrentUserResponseDto = {
      user: profile
    };

    return createResponse(data, "User profile updated successfully");
  }
}
