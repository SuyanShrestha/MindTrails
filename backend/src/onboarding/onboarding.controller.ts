import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtUser } from "../common/interfaces/jwt-user.interface";
import {
  ApiEnvelopeResponse,
  ApiStandardErrorResponses
} from "../common/swagger/api-response.decorator";
import { createResponse } from "../common/utils/response.util";
import { CreateOnboardingResponseDto } from "./dto/create-onboarding-response.dto";
import {
  GetCurrentOnboardingResponseDto,
  GetOnboardingQuestionsResponseDto,
  SaveOnboardingResponseDto
} from "./dto/questions-response.dto";
import { UpdateOnboardingResponseDto } from "./dto/update-onboarding-response.dto";
import { OnboardingService } from "./onboarding.service";

@ApiTags("Onboarding")
@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get("questions")
  @ApiOperation({ summary: "Get onboarding questions and page metadata" })
  @ApiEnvelopeResponse({
    description: "Onboarding questions retrieved successfully",
    type: GetOnboardingQuestionsResponseDto
  })
  @ApiStandardErrorResponses()
  async getQuestions() {
    const payload: GetOnboardingQuestionsResponseDto =
      await this.onboardingService.getQuestions();
    return createResponse(payload, "Onboarding questions retrieved successfully");
  }

  @UseGuards(JwtAuthGuard)
  @Get("responses/me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the current user's onboarding response" })
  @ApiEnvelopeResponse({
    description: "Onboarding response retrieved successfully",
    type: GetCurrentOnboardingResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async getMyResponse(@CurrentUser() user: JwtUser) {
    const response = await this.onboardingService.getCurrentResponse(user.sub);
    const data: GetCurrentOnboardingResponseDto = { response };
    return createResponse(data, "Onboarding response retrieved successfully");
  }

  @UseGuards(JwtAuthGuard)
  @Post("responses")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create an onboarding response for the current user" })
  @ApiBody({ type: CreateOnboardingResponseDto })
  @ApiEnvelopeResponse({
    description: "Onboarding response created successfully",
    type: SaveOnboardingResponseDto,
    status: 201
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async createResponse(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateOnboardingResponseDto
  ) {
    const response = await this.onboardingService.createResponse(user.sub, dto);
    const data: SaveOnboardingResponseDto = { response };
    return createResponse(data, "Onboarding response created successfully");
  }

  @UseGuards(JwtAuthGuard)
  @Patch("responses/me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update the current user's onboarding response" })
  @ApiBody({ type: UpdateOnboardingResponseDto })
  @ApiEnvelopeResponse({
    description: "Onboarding response updated successfully",
    type: SaveOnboardingResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async updateResponse(
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateOnboardingResponseDto
  ) {
    const response = await this.onboardingService.updateResponse(user.sub, dto);
    const data: SaveOnboardingResponseDto = { response };
    return createResponse(data, "Onboarding response updated successfully");
  }
}
