import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.assignment.findMany({
      include: {
        section: { include: { course: true } },
        problems: true,
        submissions: true,
      },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        section: { include: { course: true } },
        problems: true,
        submissions: true,
      },
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }
}
