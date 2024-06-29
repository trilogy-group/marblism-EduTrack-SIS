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
  Attendance,
  AttendanceDomainFacade,
} from '@server/modules/attendance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AttendanceApplicationEvent } from './attendance.application.event'
import { AttendanceCreateDto, AttendanceUpdateDto } from './attendance.dto'

@Controller('/v1/attendances')
export class AttendanceController {
  constructor(
    private eventService: EventService,
    private attendanceDomainFacade: AttendanceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.attendanceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AttendanceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.attendanceDomainFacade.create(body)

    await this.eventService.emit<AttendanceApplicationEvent.AttendanceCreated.Payload>(
      AttendanceApplicationEvent.AttendanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:attendanceId')
  async findOne(
    @Param('attendanceId') attendanceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.attendanceDomainFacade.findOneByIdOrFail(
      attendanceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:attendanceId')
  async update(
    @Param('attendanceId') attendanceId: string,
    @Body() body: AttendanceUpdateDto,
  ) {
    const item =
      await this.attendanceDomainFacade.findOneByIdOrFail(attendanceId)

    const itemUpdated = await this.attendanceDomainFacade.update(
      item,
      body as Partial<Attendance>,
    )
    return itemUpdated
  }

  @Delete('/:attendanceId')
  async delete(@Param('attendanceId') attendanceId: string) {
    const item =
      await this.attendanceDomainFacade.findOneByIdOrFail(attendanceId)

    await this.attendanceDomainFacade.delete(item)

    return item
  }
}
