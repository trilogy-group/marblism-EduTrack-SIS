import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AttendanceDomainFacade } from './attendance.domain.facade'
import { Attendance } from './attendance.model'

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), DatabaseHelperModule],
  providers: [AttendanceDomainFacade, AttendanceDomainFacade],
  exports: [AttendanceDomainFacade],
})
export class AttendanceDomainModule {}
