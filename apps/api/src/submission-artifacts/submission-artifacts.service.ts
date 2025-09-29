import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubmissionArtifactsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.submissionArtifact.findMany({
      include: { submission: true },
    });
  }

  async findOne(id: string) {
    const artifact = await this.prisma.submissionArtifact.findUnique({
      where: { id },
      include: { submission: true },
    });
    if (!artifact) {
      throw new NotFoundException(`Submission artifact with ID ${id} not found`);
    }
    return artifact;
  }
}
