import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath
} from "@nestjs/swagger";
import { ApiErrorResponseDto } from "../dto/api-error-response.dto";
import { ApiSuccessEnvelopeDto } from "../dto/api-success-envelope.dto";

type ApiEnvelopeResponseOptions<TModel extends Type<unknown>> = {
  description: string;
  type: TModel;
  status?: 200 | 201;
};

export function ApiEnvelopeResponse<TModel extends Type<unknown>>({
  description,
  type,
  status = 200
}: ApiEnvelopeResponseOptions<TModel>) {
  const responseDecorator = status === 201 ? ApiCreatedResponse : ApiOkResponse;

  return applyDecorators(
    ApiExtraModels(ApiSuccessEnvelopeDto, type),
    responseDecorator({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessEnvelopeDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type)
              }
            }
          }
        ]
      }
    })
  );
}

export function ApiStandardErrorResponses(options?: { unauthorized?: boolean }) {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiBadRequestResponse({
      description: "Bad request",
      type: ApiErrorResponseDto
    }),
    ApiInternalServerErrorResponse({
      description: "Internal server error",
      type: ApiErrorResponseDto
    }),
    ...(options?.unauthorized
      ? [
          ApiUnauthorizedResponse({
            description: "Unauthorized",
            type: ApiErrorResponseDto
          })
        ]
      : [])
  );
}
