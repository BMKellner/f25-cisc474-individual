import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.grade.findMany({
      include: { 
        submission: { 
          include: { user: true, assignment: true, problem: true } 
        } 
      },
    });
  }

  async findOne(id: string) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
      include: { 
        submission: { 
          include: { user: true, assignment: true, problem: true } 
        } 
      },
    });
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return grade;
  }
}
