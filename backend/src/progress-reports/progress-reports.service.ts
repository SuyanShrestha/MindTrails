import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CompleteProgressReportDto } from "./dto/complete-progress-report.dto";
import {
  CompleteProgressReportResponseDto,
  ProgressReportDto
} from "./dto/progress-report-response.dto";

@Injectable()
export class ProgressReportsService {
  private readonly logger = new Logger(ProgressReportsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async createPendingReport(userId: string, gameSessionId: string) {
    return (this.prisma as any).progressReport.upsert({
      where: {
        gameSessionId
      },
      update: {},
      create: {
        userId,
        gameSessionId
      }
    });
  }

  async triggerGeneration(payload: Record<string, unknown>): Promise<void> {
    const baseUrl = this.configService.get<string>("integrations.aiBackendUrl");

    if (!baseUrl) {
      throw new InternalServerErrorException(
        "AI backend integration is not configured for progress report generation"
      );
    }

    try {
      await fetch(
        `${baseUrl.replace(/\/$/, "")}/report-generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
    } catch (error) {
      this.logger.error(
        `Failed to trigger progress report generation for report ${String(payload.progressReportId)}`,
        error instanceof Error ? error.stack : undefined
      );
    }
  }

  async completeProgressReport(
    dto: CompleteProgressReportDto
  ): Promise<CompleteProgressReportResponseDto> {
    const progressReport = await (this.prisma as any).progressReport.findUnique({
      where: {
        id: dto.progressReportId
      }
    });

    if (!progressReport) {
      throw new NotFoundException("Progress report not found");
    }

    const updatedProgressReport = await (this.prisma as any).progressReport.update({
      where: {
        id: dto.progressReportId
      },
      data: {
        report: dto.report as Prisma.InputJsonValue,
        feedback: dto.feedback ?? null,
        status: "COMPLETED"
      }
    });

    return {
      updated: true,
      progressReportId: updatedProgressReport.id,
      status: updatedProgressReport.status
    };
  }

  async getProgressReportById(userId: string, progressReportId: string): Promise<ProgressReportDto> {
    const progressReport = await (this.prisma as any).progressReport.findFirst({
      where: {
        id: progressReportId,
        userId
      }
    });

    if (!progressReport) {
      throw new NotFoundException("Progress report not found");
    }

    return this.toProgressReportDto(progressReport);
  }

  async listProgressReports(userId: string): Promise<ProgressReportDto[]> {
    const progressReports = await (this.prisma as any).progressReport.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return progressReports.map((progressReport: any) => this.toProgressReportDto(progressReport));
  }

  private toProgressReportDto(progressReport: any): ProgressReportDto {
    return {
      id: progressReport.id,
      gameSessionId: progressReport.gameSessionId,
      userId: progressReport.userId,
      status: progressReport.status,
      report: progressReport.report,
      feedback: progressReport.feedback,
      createdAt: progressReport.createdAt,
      updatedAt: progressReport.updatedAt
    };
  }
}
