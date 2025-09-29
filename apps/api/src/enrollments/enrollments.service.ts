import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        user: true,
        section: { include: { course: true } },
      },
    });
  }

  async findOne(id: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        section: { include: { course: true } },
      },
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return enrollment;
  }
}
