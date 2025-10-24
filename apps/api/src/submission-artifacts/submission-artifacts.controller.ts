import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubmissionArtifactsService } from './submission-artifacts.service';

@Controller('submission-artifacts')
@UseGuards(AuthGuard('jwt'))
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
