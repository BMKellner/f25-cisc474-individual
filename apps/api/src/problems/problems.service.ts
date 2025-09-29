import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.problem.findMany({
      include: { assignment: true, submissions: true },
    });
  }

  async findOne(id: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { id },
      include: { assignment: true, submissions: true },
    });
    if (!problem) {
      throw new NotFoundException(`Problem with ID ${id} not found`);
    }
    return problem;
  }
}
