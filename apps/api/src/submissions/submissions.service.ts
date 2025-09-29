import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.submission.findMany({
      include: { 
        user: true, 
        assignment: true, 
        problem: true, 
        artifacts: true, 
        grade: true 
      },
    });
  }

  async findOne(id: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: { 
        user: true, 
        assignment: true, 
        problem: true, 
        artifacts: true, 
        grade: true 
      },
    });
    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }
    return submission;
  }
}
