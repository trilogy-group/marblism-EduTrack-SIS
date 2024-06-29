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
  Financial,
  FinancialDomainFacade,
} from '@server/modules/financial/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { FinancialApplicationEvent } from './financial.application.event'
import { FinancialCreateDto, FinancialUpdateDto } from './financial.dto'

@Controller('/v1/financials')
export class FinancialController {
  constructor(
    private eventService: EventService,
    private financialDomainFacade: FinancialDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.financialDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: FinancialCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.financialDomainFacade.create(body)

    await this.eventService.emit<FinancialApplicationEvent.FinancialCreated.Payload>(
      FinancialApplicationEvent.FinancialCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:financialId')
  async findOne(
    @Param('financialId') financialId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.financialDomainFacade.findOneByIdOrFail(
      financialId,
      queryOptions,
    )

    return item
  }

  @Patch('/:financialId')
  async update(
    @Param('financialId') financialId: string,
    @Body() body: FinancialUpdateDto,
  ) {
    const item = await this.financialDomainFacade.findOneByIdOrFail(financialId)

    const itemUpdated = await this.financialDomainFacade.update(
      item,
      body as Partial<Financial>,
    )
    return itemUpdated
  }

  @Delete('/:financialId')
  async delete(@Param('financialId') financialId: string) {
    const item = await this.financialDomainFacade.findOneByIdOrFail(financialId)

    await this.financialDomainFacade.delete(item)

    return item
  }
}
