import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from "class-validator";
import { OnboardingResponseStatusEnum } from "../../common/enums/onboarding-response-status.enum";

export class UpsertOnboardingAnswerDto {
  @ApiProperty({
    example: "display_name",
    description: "Unique onboarding question key"
  })
  @IsString()
  questionKey!: string;

  @ApiProperty({
    description: "Answer value. Can be a string, number, boolean, or array of strings.",
    examples: {
      text: { value: "Bitisha" },
      number: { value: 3 },
      boolean: { value: true },
      multiSelect: { value: ["stress", "sleep"] }
    }
  })
  @IsDefined()
  value!: unknown;
}

export class CreateOnboardingResponseDto {
  @ApiPropertyOptional({
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  currentPageNo?: number;

  @ApiPropertyOptional({
    enum: OnboardingResponseStatusEnum,
    example: OnboardingResponseStatusEnum.DRAFT
  })
  @IsOptional()
  @IsEnum(OnboardingResponseStatusEnum)
  status?: OnboardingResponseStatusEnum;

  @ApiProperty({
    type: [UpsertOnboardingAnswerDto]
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpsertOnboardingAnswerDto)
  answers!: UpsertOnboardingAnswerDto[];
}
