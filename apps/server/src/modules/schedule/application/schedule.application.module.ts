import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ScheduleDomainModule } from '../domain'
import { ScheduleController } from './schedule.controller'

import { CourseDomainModule } from '../../../modules/course/domain'

import { ScheduleByCourseController } from './scheduleByCourse.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ScheduleDomainModule,

    CourseDomainModule,
  ],
  controllers: [ScheduleController, ScheduleByCourseController],
  providers: [],
})
export class ScheduleApplicationModule {}
