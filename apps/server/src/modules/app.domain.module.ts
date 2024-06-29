import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ParentDomainModule } from './parent/domain'

import { StudentDomainModule } from './student/domain'

import { TeacherDomainModule } from './teacher/domain'

import { CourseDomainModule } from './course/domain'

import { ScheduleDomainModule } from './schedule/domain'

import { EnrollmentDomainModule } from './enrollment/domain'

import { AttendanceDomainModule } from './attendance/domain'

import { DocumentDomainModule } from './document/domain'

import { FinancialDomainModule } from './financial/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ParentDomainModule,

    StudentDomainModule,

    TeacherDomainModule,

    CourseDomainModule,

    ScheduleDomainModule,

    EnrollmentDomainModule,

    AttendanceDomainModule,

    DocumentDomainModule,

    FinancialDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
