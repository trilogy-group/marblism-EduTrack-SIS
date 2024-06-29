import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TeacherDomainFacade } from '@server/modules/teacher/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TeacherApplicationEvent } from './teacher.application.event'
import { TeacherCreateDto } from './teacher.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TeacherByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private teacherDomainFacade: TeacherDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/teachers')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.teacherDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/teachers')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: TeacherCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.teacherDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TeacherApplicationEvent.TeacherCreated.Payload>(
      TeacherApplicationEvent.TeacherCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
