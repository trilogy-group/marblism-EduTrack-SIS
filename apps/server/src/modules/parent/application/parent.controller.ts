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
import { Parent, ParentDomainFacade } from '@server/modules/parent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ParentApplicationEvent } from './parent.application.event'
import { ParentCreateDto, ParentUpdateDto } from './parent.dto'

@Controller('/v1/parents')
export class ParentController {
  constructor(
    private eventService: EventService,
    private parentDomainFacade: ParentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.parentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ParentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.parentDomainFacade.create(body)

    await this.eventService.emit<ParentApplicationEvent.ParentCreated.Payload>(
      ParentApplicationEvent.ParentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:parentId')
  async findOne(@Param('parentId') parentId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.parentDomainFacade.findOneByIdOrFail(
      parentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:parentId')
  async update(
    @Param('parentId') parentId: string,
    @Body() body: ParentUpdateDto,
  ) {
    const item = await this.parentDomainFacade.findOneByIdOrFail(parentId)

    const itemUpdated = await this.parentDomainFacade.update(
      item,
      body as Partial<Parent>,
    )
    return itemUpdated
  }

  @Delete('/:parentId')
  async delete(@Param('parentId') parentId: string) {
    const item = await this.parentDomainFacade.findOneByIdOrFail(parentId)

    await this.parentDomainFacade.delete(item)

    return item
  }
}
