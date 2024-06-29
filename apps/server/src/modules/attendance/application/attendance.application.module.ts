import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AttendanceDomainModule } from '../domain'
import { AttendanceController } from './attendance.controller'

import { EnrollmentDomainModule } from '../../../modules/enrollment/domain'

import { AttendanceByEnrollmentController } from './attendanceByEnrollment.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AttendanceDomainModule,

    EnrollmentDomainModule,
  ],
  controllers: [AttendanceController, AttendanceByEnrollmentController],
  providers: [],
})
export class AttendanceApplicationModule {}
