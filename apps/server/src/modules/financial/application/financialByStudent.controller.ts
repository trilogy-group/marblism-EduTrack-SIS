import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { FinancialDomainFacade } from '@server/modules/financial/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { FinancialApplicationEvent } from './financial.application.event'
import { FinancialCreateDto } from './financial.dto'

import { StudentDomainFacade } from '../../student/domain'

@Controller('/v1/students')
export class FinancialByStudentController {
  constructor(
    private studentDomainFacade: StudentDomainFacade,

    private financialDomainFacade: FinancialDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/student/:studentId/financials')
  async findManyStudentId(
    @Param('studentId') studentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.studentDomainFacade.findOneByIdOrFail(studentId)

    const items = await this.financialDomainFacade.findManyByStudent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/student/:studentId/financials')
  async createByStudentId(
    @Param('studentId') studentId: string,
    @Body() body: FinancialCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, studentId }

    const item = await this.financialDomainFacade.create(valuesUpdated)

    await this.eventService.emit<FinancialApplicationEvent.FinancialCreated.Payload>(
      FinancialApplicationEvent.FinancialCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
