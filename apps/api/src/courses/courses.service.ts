import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      include: { sections: true },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { sections: true },
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }
}
