import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('courses')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @RequirePermissions('read:courses')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @RequirePermissions('read:courses')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
}
