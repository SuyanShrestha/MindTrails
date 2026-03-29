import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import appConfig from "./config/app.config";
import { validateEnv } from "./config/env.validation";
import { GameSessionsModule } from "./game-sessions/game-sessions.module";
import { HealthController } from "./health.controller";
import { OnboardingModule } from "./onboarding/onboarding.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProgressReportsModule } from "./progress-reports/progress-reports.module";
import { QuestionPrefetchModule } from "./question-prefetch/question-prefetch.module";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [HealthController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv
    }),
    PrismaModule,
    QuestionPrefetchModule,
    UsersModule,
    AuthModule,
    OnboardingModule,
    ProgressReportsModule,
    GameSessionsModule
  ]
})
export class AppModule {}
