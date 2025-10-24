import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@CurrentUser() user: JwtUser): Promise<JwtUser> {
    return user;
  }

  @Get()
  async findAll(): Promise<UserOut[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserOut> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: UserCreateIn): Promise<UserOut> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateIn,
  ): Promise<UserOut> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
