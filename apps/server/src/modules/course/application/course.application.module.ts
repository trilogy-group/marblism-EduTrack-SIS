import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CourseDomainModule } from '../domain'
import { CourseController } from './course.controller'

import { TeacherDomainModule } from '../../../modules/teacher/domain'

import { CourseByTeacherController } from './courseByTeacher.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CourseDomainModule,

    TeacherDomainModule,
  ],
  controllers: [CourseController, CourseByTeacherController],
  providers: [],
})
export class CourseApplicationModule {}
