import { PartialType } from "@nestjs/swagger";
import { CreateOnboardingResponseDto } from "./create-onboarding-response.dto";

export class UpdateOnboardingResponseDto extends PartialType(CreateOnboardingResponseDto) {}
