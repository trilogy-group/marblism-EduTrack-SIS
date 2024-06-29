import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Enrollment,
  EnrollmentDomainFacade,
} from '@server/modules/enrollment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EnrollmentApplicationEvent } from './enrollment.application.event'
import { EnrollmentCreateDto, EnrollmentUpdateDto } from './enrollment.dto'

@Controller('/v1/enrollments')
export class EnrollmentController {
  constructor(
    private eventService: EventService,
    private enrollmentDomainFacade: EnrollmentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.enrollmentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: EnrollmentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.enrollmentDomainFacade.create(body)

    await this.eventService.emit<EnrollmentApplicationEvent.EnrollmentCreated.Payload>(
      EnrollmentApplicationEvent.EnrollmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:enrollmentId')
  async findOne(
    @Param('enrollmentId') enrollmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.enrollmentDomainFacade.findOneByIdOrFail(
      enrollmentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:enrollmentId')
  async update(
    @Param('enrollmentId') enrollmentId: string,
    @Body() body: EnrollmentUpdateDto,
  ) {
    const item =
      await this.enrollmentDomainFacade.findOneByIdOrFail(enrollmentId)

    const itemUpdated = await this.enrollmentDomainFacade.update(
      item,
      body as Partial<Enrollment>,
    )
    return itemUpdated
  }

  @Delete('/:enrollmentId')
  async delete(@Param('enrollmentId') enrollmentId: string) {
    const item =
      await this.enrollmentDomainFacade.findOneByIdOrFail(enrollmentId)

    await this.enrollmentDomainFacade.delete(item)

    return item
  }
}
