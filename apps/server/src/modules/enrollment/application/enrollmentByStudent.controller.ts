import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { EnrollmentDomainFacade } from '@server/modules/enrollment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { EnrollmentApplicationEvent } from './enrollment.application.event'
import { EnrollmentCreateDto } from './enrollment.dto'

import { StudentDomainFacade } from '../../student/domain'

@Controller('/v1/students')
export class EnrollmentByStudentController {
  constructor(
    private studentDomainFacade: StudentDomainFacade,

    private enrollmentDomainFacade: EnrollmentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/student/:studentId/enrollments')
  async findManyStudentId(
    @Param('studentId') studentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.studentDomainFacade.findOneByIdOrFail(studentId)

    const items = await this.enrollmentDomainFacade.findManyByStudent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/student/:studentId/enrollments')
  async createByStudentId(
    @Param('studentId') studentId: string,
    @Body() body: EnrollmentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, studentId }

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
