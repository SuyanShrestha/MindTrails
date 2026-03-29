import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const startedAt = Date.now();

    this.logger.log(
      JSON.stringify({
        type: "request",
        method: request.method,
        url: request.originalUrl ?? request.url,
        params: request.params,
        query: request.query,
        body: request.body
      })
    );

    return next.handle().pipe(
      tap({
        next: (payload) => {
          this.logger.log(
            JSON.stringify({
              type: "response",
              method: request.method,
              url: request.originalUrl ?? request.url,
              statusCode: response.statusCode,
              durationMs: Date.now() - startedAt,
              payload
            })
          );
        },
        error: (error: unknown) => {
          this.logger.error(
            JSON.stringify({
              type: "error",
              method: request.method,
              url: request.originalUrl ?? request.url,
              statusCode: response.statusCode,
              durationMs: Date.now() - startedAt,
              message: error instanceof Error ? error.message : "Unknown error"
            }),
            error instanceof Error ? error.stack : undefined
          );
        }
      })
    );
  }
}
