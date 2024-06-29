import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationParentSubscriber } from './subscribers/notification.parent.subscriber'

import { NotificationStudentSubscriber } from './subscribers/notification.student.subscriber'

import { NotificationTeacherSubscriber } from './subscribers/notification.teacher.subscriber'

import { NotificationCourseSubscriber } from './subscribers/notification.course.subscriber'

import { NotificationScheduleSubscriber } from './subscribers/notification.schedule.subscriber'

import { NotificationEnrollmentSubscriber } from './subscribers/notification.enrollment.subscriber'

import { NotificationAttendanceSubscriber } from './subscribers/notification.attendance.subscriber'

import { NotificationDocumentSubscriber } from './subscribers/notification.document.subscriber'

import { NotificationFinancialSubscriber } from './subscribers/notification.financial.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationParentSubscriber,

    NotificationStudentSubscriber,

    NotificationTeacherSubscriber,

    NotificationCourseSubscriber,

    NotificationScheduleSubscriber,

    NotificationEnrollmentSubscriber,

    NotificationAttendanceSubscriber,

    NotificationDocumentSubscriber,

    NotificationFinancialSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
