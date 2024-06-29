import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AttendanceDomainFacade } from '@server/modules/attendance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AttendanceApplicationEvent } from './attendance.application.event'
import { AttendanceCreateDto } from './attendance.dto'

import { EnrollmentDomainFacade } from '../../enrollment/domain'

@Controller('/v1/enrollments')
export class AttendanceByEnrollmentController {
  constructor(
    private enrollmentDomainFacade: EnrollmentDomainFacade,

    private attendanceDomainFacade: AttendanceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/enrollment/:enrollmentId/attendances')
  async findManyEnrollmentId(
    @Param('enrollmentId') enrollmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.enrollmentDomainFacade.findOneByIdOrFail(enrollmentId)

    const items = await this.attendanceDomainFacade.findManyByEnrollment(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/enrollment/:enrollmentId/attendances')
  async createByEnrollmentId(
    @Param('enrollmentId') enrollmentId: string,
    @Body() body: AttendanceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, enrollmentId }

    const item = await this.attendanceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AttendanceApplicationEvent.AttendanceCreated.Payload>(
      AttendanceApplicationEvent.AttendanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
