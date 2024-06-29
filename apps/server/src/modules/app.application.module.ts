import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ParentApplicationModule } from './parent/application'

import { StudentApplicationModule } from './student/application'

import { TeacherApplicationModule } from './teacher/application'

import { CourseApplicationModule } from './course/application'

import { ScheduleApplicationModule } from './schedule/application'

import { EnrollmentApplicationModule } from './enrollment/application'

import { AttendanceApplicationModule } from './attendance/application'

import { DocumentApplicationModule } from './document/application'

import { FinancialApplicationModule } from './financial/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    ParentApplicationModule,

    StudentApplicationModule,

    TeacherApplicationModule,

    CourseApplicationModule,

    ScheduleApplicationModule,

    EnrollmentApplicationModule,

    AttendanceApplicationModule,

    DocumentApplicationModule,

    FinancialApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
