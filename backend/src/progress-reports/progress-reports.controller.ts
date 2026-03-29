import { Body, Controller, Get, Logger, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtUser } from "../common/interfaces/jwt-user.interface";
import {
  ApiEnvelopeResponse,
  ApiStandardErrorResponses
} from "../common/swagger/api-response.decorator";
import { createResponse } from "../common/utils/response.util";
import { CompleteProgressReportDto } from "./dto/complete-progress-report.dto";
import {
  CompleteProgressReportResponseDto,
  GetProgressReportResponseDto,
  ListProgressReportsResponseDto
} from "./dto/progress-report-response.dto";
import { ProgressReportsService } from "./progress-reports.service";

@ApiTags("Progress Reports")
@Controller("progress-reports")
export class ProgressReportsController {
  private readonly logger = new Logger(ProgressReportsController.name);

  constructor(private readonly progressReportsService: ProgressReportsService) {}

  @Post("complete")
  @ApiOperation({
    summary: "Public callback endpoint to save a generated progress report"
  })
  @ApiBody({ type: CompleteProgressReportDto })
  @ApiEnvelopeResponse({
    description: "Progress report saved successfully",
    type: CompleteProgressReportResponseDto
  })
  @ApiStandardErrorResponses()
  async completeProgressReport(@Body() dto: CompleteProgressReportDto) {
    this.logger.log(
      JSON.stringify({
        type: "progress-report-complete-request",
        payload: dto
      })
    );

    try {
      const payload = await this.progressReportsService.completeProgressReport(dto);
      const responsePayload = createResponse(payload, "Progress report saved successfully");

      this.logger.log(
        JSON.stringify({
          type: "progress-report-complete-response",
          payload: responsePayload
        })
      );

      return responsePayload;
    } catch (error) {
      this.logger.error(
        JSON.stringify({
          type: "progress-report-complete-error",
          payload: dto,
          message: error instanceof Error ? error.message : "Unknown error"
        }),
        error instanceof Error ? error.stack : undefined
      );

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get all progress reports for the current authenticated user"
  })
  @ApiEnvelopeResponse({
    description: "Progress reports retrieved successfully",
    type: ListProgressReportsResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async listProgressReports(@CurrentUser() user: JwtUser) {
    const progressReports = await this.progressReportsService.listProgressReports(user.sub);

    return createResponse(
      {
        progressReports
      },
      "Progress reports retrieved successfully"
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(":progressReportId")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get a single progress report for the current authenticated user"
  })
  @ApiParam({
    name: "progressReportId",
    format: "uuid"
  })
  @ApiEnvelopeResponse({
    description: "Progress report retrieved successfully",
    type: GetProgressReportResponseDto
  })
  @ApiStandardErrorResponses({ unauthorized: true })
  async getProgressReport(
    @CurrentUser() user: JwtUser,
    @Param("progressReportId") progressReportId: string
  ) {
    const progressReport = await this.progressReportsService.getProgressReportById(
      user.sub,
      progressReportId
    );

    return createResponse(
      {
        progressReport
      },
      "Progress report retrieved successfully"
    );
  }
}
