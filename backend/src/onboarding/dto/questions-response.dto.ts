import { ApiProperty } from "@nestjs/swagger";
import {
  OnboardingQuestionsPayloadDto,
  OnboardingResponseDto
} from "./onboarding-response.dto";

export class GetOnboardingQuestionsResponseDto extends OnboardingQuestionsPayloadDto {}

export class GetCurrentOnboardingResponseDto {
  @ApiProperty({
    type: OnboardingResponseDto,
    nullable: true
  })
  response!: OnboardingResponseDto | null;
}

export class SaveOnboardingResponseDto {
  @ApiProperty({ type: OnboardingResponseDto })
  response!: OnboardingResponseDto;
}
