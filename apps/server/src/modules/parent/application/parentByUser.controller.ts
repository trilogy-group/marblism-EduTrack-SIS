import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ParentDomainFacade } from '@server/modules/parent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ParentApplicationEvent } from './parent.application.event'
import { ParentCreateDto } from './parent.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ParentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private parentDomainFacade: ParentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/parents')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.parentDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/parents')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ParentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.parentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ParentApplicationEvent.ParentCreated.Payload>(
      ParentApplicationEvent.ParentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
