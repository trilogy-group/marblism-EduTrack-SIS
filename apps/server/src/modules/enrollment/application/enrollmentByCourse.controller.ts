import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { EnrollmentDomainFacade } from '@server/modules/enrollment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { EnrollmentApplicationEvent } from './enrollment.application.event'
import { EnrollmentCreateDto } from './enrollment.dto'

import { CourseDomainFacade } from '../../course/domain'

@Controller('/v1/courses')
export class EnrollmentByCourseController {
  constructor(
    private courseDomainFacade: CourseDomainFacade,

    private enrollmentDomainFacade: EnrollmentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/course/:courseId/enrollments')
  async findManyCourseId(
    @Param('courseId') courseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.courseDomainFacade.findOneByIdOrFail(courseId)

    const items = await this.enrollmentDomainFacade.findManyByCourse(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/course/:courseId/enrollments')
  async createByCourseId(
    @Param('courseId') courseId: string,
    @Body() body: EnrollmentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, courseId }

    const item = await this.enrollmentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<EnrollmentApplicationEvent.EnrollmentCreated.Payload>(
      EnrollmentApplicationEvent.EnrollmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
