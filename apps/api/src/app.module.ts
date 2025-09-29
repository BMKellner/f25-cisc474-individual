import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';

import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { SectionsModule } from './sections/sections.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ProblemsModule } from './problems/problems.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { SubmissionArtifactsModule } from './submission-artifacts/submission-artifacts.module';
import { GradesModule } from './grades/grades.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    PrismaModule,
    LinksModule,
    UsersModule,
    CoursesModule,
    SectionsModule,
    EnrollmentsModule,
    AssignmentsModule,
    ProblemsModule,
    SubmissionsModule,
    SubmissionArtifactsModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
