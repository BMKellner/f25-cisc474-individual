import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        enrollments: {
          include: { section: { include: { course: true } } },
        },
        submissions: {
          include: { assignment: true, problem: true, artifacts: true, grade: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: { section: { include: { course: true } } },
        },
        submissions: {
          include: { assignment: true, problem: true, artifacts: true, grade: true },
        },
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
