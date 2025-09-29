import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.section.findMany({
      include: {
        course: true,
        enrollments: { include: { user: true } },
        assignments: true,
      },
    });
  }

  async findOne(id: string) {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        course: true,
        enrollments: { include: { user: true } },
        assignments: true,
      },
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }
}
