import { Module } from "@nestjs/common";
import { ProgressReportsModule } from "../progress-reports/progress-reports.module";
import { QuestionPrefetchModule } from "../question-prefetch/question-prefetch.module";
import { GameSessionsController } from "./game-sessions.controller";
import { GameSessionsService } from "./game-sessions.service";

@Module({
  imports: [QuestionPrefetchModule, ProgressReportsModule],
  controllers: [GameSessionsController],
  providers: [GameSessionsService]
})
export class GameSessionsModule {}
