import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OnboardingResponseStatusEnum } from "../../common/enums/onboarding-response-status.enum";
import { BaseQuestionOptionDto } from "./base-question-option.dto";

export class OnboardingOptionDto extends BaseQuestionOptionDto {}

export class OnboardingQuestionDto {
  @ApiProperty({
    format: "uuid",
    example: "0f4df733-392e-4ab4-a9c6-3903c06dfc70"
  })
  id!: string;

  @ApiProperty({ example: "display_name" })
  key!: string;

  @ApiProperty({ example: 1 })
  pageNo!: number;

  @ApiProperty({ example: 1 })
  order!: number;

  @ApiProperty({ example: "TEXT" })
  type!: string;

  @ApiProperty({ example: "What name would you like us to call you?" })
  question!: string;

  @ApiPropertyOptional({
    nullable: true,
    example: "This can be your real name or a nickname."
  })
  description!: string | null;

  @ApiPropertyOptional({
    nullable: true,
    example: "Your preferred name"
  })
  placeholder!: string | null;

  @ApiProperty({ example: true })
  required!: boolean;

  @ApiPropertyOptional({
    type: [OnboardingOptionDto],
    nullable: true
  })
  options!: OnboardingOptionDto[] | null;
}

export class OnboardingPageDto {
  @ApiProperty({ example: 1 })
  pageNo!: number;

  @ApiProperty({ example: "Getting to know you" })
  title!: string;

  @ApiPropertyOptional({
    example: "Initial context about stress, burnout, and mental wellbeing."
  })
  description?: string;
}

export class OnboardingQuestionsPayloadDto {
  @ApiProperty({ example: "1.0.0" })
  version!: string;

  @ApiProperty({ example: "Mental Wellness Onboarding" })
  title!: string;

  @ApiProperty({
    example: "A simple onboarding flow to understand the user better and ask more relevant questions later."
  })
  description!: string;

  @ApiProperty({ type: [OnboardingPageDto] })
  pages!: OnboardingPageDto[];

  @ApiProperty({ type: [OnboardingQuestionDto] })
  questions!: OnboardingQuestionDto[];
}

export class OnboardingAnswerDto {
  @ApiProperty({ example: "display_name" })
  questionKey!: string;

  @ApiProperty({
    description: "Saved answer value. Can be a string, number, boolean, or array of strings.",
    examples: {
      text: { value: "Bitisha" },
      number: { value: 3 },
      boolean: { value: true },
      multiSelect: { value: ["stress", "sleep"] }
    }
  })
  value!: unknown;
}

export class OnboardingResponseDto {
  @ApiProperty({
    format: "uuid",
    example: "81756b32-ebf1-4c46-9438-49f8d92943a1"
  })
  id!: string;

  @ApiProperty({
    enum: OnboardingResponseStatusEnum,
    example: OnboardingResponseStatusEnum.DRAFT
  })
  status!: OnboardingResponseStatusEnum;

  @ApiPropertyOptional({
    nullable: true,
    example: 1
  })
  currentPageNo!: number | null;

  @ApiProperty({ type: [OnboardingAnswerDto] })
  answers!: OnboardingAnswerDto[];

  @ApiProperty({
    type: String,
    format: "date-time",
    example: "2026-03-28T06:15:00.000Z"
  })
  updatedAt!: Date;
}
