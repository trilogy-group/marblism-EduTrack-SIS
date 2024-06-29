import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ScheduleDomainFacade } from '@server/modules/schedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ScheduleApplicationEvent } from './schedule.application.event'
import { ScheduleCreateDto } from './schedule.dto'

import { CourseDomainFacade } from '../../course/domain'

@Controller('/v1/courses')
export class ScheduleByCourseController {
  constructor(
    private courseDomainFacade: CourseDomainFacade,

    private scheduleDomainFacade: ScheduleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/course/:courseId/schedules')
  async findManyCourseId(
    @Param('courseId') courseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.courseDomainFacade.findOneByIdOrFail(courseId)

    const items = await this.scheduleDomainFacade.findManyByCourse(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/course/:courseId/schedules')
  async createByCourseId(
    @Param('courseId') courseId: string,
    @Body() body: ScheduleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, courseId }

    const item = await this.scheduleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ScheduleApplicationEvent.ScheduleCreated.Payload>(
      ScheduleApplicationEvent.ScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
