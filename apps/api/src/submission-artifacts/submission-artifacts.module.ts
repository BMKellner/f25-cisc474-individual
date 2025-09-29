import { Module } from '@nestjs/common';
import { SubmissionArtifactsController } from './submission-artifacts.controller';
import { SubmissionArtifactsService } from './submission-artifacts.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionArtifactsController],
  providers: [SubmissionArtifactsService],
})
export class SubmissionArtifactsModule {}
