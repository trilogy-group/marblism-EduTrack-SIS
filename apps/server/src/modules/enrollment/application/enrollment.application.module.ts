import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EnrollmentDomainModule } from '../domain'
import { EnrollmentController } from './enrollment.controller'

import { StudentDomainModule } from '../../../modules/student/domain'

import { EnrollmentByStudentController } from './enrollmentByStudent.controller'

import { CourseDomainModule } from '../../../modules/course/domain'

import { EnrollmentByCourseController } from './enrollmentByCourse.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    EnrollmentDomainModule,

    StudentDomainModule,

    CourseDomainModule,
  ],
  controllers: [
    EnrollmentController,

    EnrollmentByStudentController,

    EnrollmentByCourseController,
  ],
  providers: [],
})
export class EnrollmentApplicationModule {}
