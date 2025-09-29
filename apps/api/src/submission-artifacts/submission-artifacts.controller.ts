import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionArtifactsService } from './submission-artifacts.service';

@Controller('submission-artifacts')
export class SubmissionArtifactsController {
  constructor(private readonly submissionArtifactsService: SubmissionArtifactsService) {}

  @Get()
  findAll() {
    return this.submissionArtifactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionArtifactsService.findOne(id);
  }
}
