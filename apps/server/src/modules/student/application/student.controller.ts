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
import { Student, StudentDomainFacade } from '@server/modules/student/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StudentApplicationEvent } from './student.application.event'
import { StudentCreateDto, StudentUpdateDto } from './student.dto'

@Controller('/v1/students')
export class StudentController {
  constructor(
    private eventService: EventService,
    private studentDomainFacade: StudentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.studentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StudentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.studentDomainFacade.create(body)

    await this.eventService.emit<StudentApplicationEvent.StudentCreated.Payload>(
      StudentApplicationEvent.StudentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:studentId')
  async findOne(
    @Param('studentId') studentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.studentDomainFacade.findOneByIdOrFail(
      studentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() body: StudentUpdateDto,
  ) {
    const item = await this.studentDomainFacade.findOneByIdOrFail(studentId)

    const itemUpdated = await this.studentDomainFacade.update(
      item,
      body as Partial<Student>,
    )
    return itemUpdated
  }

  @Delete('/:studentId')
  async delete(@Param('studentId') studentId: string) {
    const item = await this.studentDomainFacade.findOneByIdOrFail(studentId)

    await this.studentDomainFacade.delete(item)

    return item
  }
}
