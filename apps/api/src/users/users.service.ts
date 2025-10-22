import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@repo/database';

interface UserOut {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
}

interface UserCreateIn {
  name: string;
  email: string;
  emailVerified?: boolean;
}

interface UserUpdateIn {
  name?: string;
  email?: string;
  emailVerified?: boolean;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private toUserOut(user: User): UserOut {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }

  async findAll(): Promise<UserOut[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map((user) => this.toUserOut(user));
  }

  async findOne(id: string): Promise<UserOut> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toUserOut(user);
  }

  async create(data: UserCreateIn): Promise<UserOut> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        emailVerified: data.emailVerified ? new Date() : null,
      },
    });
    return this.toUserOut(user);
  }

  async update(id: string, data: UserUpdateIn): Promise<UserOut> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData: {
      name?: string;
      email?: string;
      emailVerified?: Date | null;
    } = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.emailVerified !== undefined) {
      updateData.emailVerified = data.emailVerified ? new Date() : null;
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return this.toUserOut(user);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
