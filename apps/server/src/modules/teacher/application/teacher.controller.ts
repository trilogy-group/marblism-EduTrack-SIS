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
import { Teacher, TeacherDomainFacade } from '@server/modules/teacher/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TeacherApplicationEvent } from './teacher.application.event'
import { TeacherCreateDto, TeacherUpdateDto } from './teacher.dto'

@Controller('/v1/teachers')
export class TeacherController {
  constructor(
    private eventService: EventService,
    private teacherDomainFacade: TeacherDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.teacherDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TeacherCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.teacherDomainFacade.create(body)

    await this.eventService.emit<TeacherApplicationEvent.TeacherCreated.Payload>(
      TeacherApplicationEvent.TeacherCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:teacherId')
  async findOne(
    @Param('teacherId') teacherId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.teacherDomainFacade.findOneByIdOrFail(
      teacherId,
      queryOptions,
    )

    return item
  }

  @Patch('/:teacherId')
  async update(
    @Param('teacherId') teacherId: string,
    @Body() body: TeacherUpdateDto,
  ) {
    const item = await this.teacherDomainFacade.findOneByIdOrFail(teacherId)

    const itemUpdated = await this.teacherDomainFacade.update(
      item,
      body as Partial<Teacher>,
    )
    return itemUpdated
  }

  @Delete('/:teacherId')
  async delete(@Param('teacherId') teacherId: string) {
    const item = await this.teacherDomainFacade.findOneByIdOrFail(teacherId)

    await this.teacherDomainFacade.delete(item)

    return item
  }
}
