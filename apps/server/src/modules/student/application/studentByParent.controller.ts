import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { StudentDomainFacade } from '@server/modules/student/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { StudentApplicationEvent } from './student.application.event'
import { StudentCreateDto } from './student.dto'

import { ParentDomainFacade } from '../../parent/domain'

@Controller('/v1/parents')
export class StudentByParentController {
  constructor(
    private parentDomainFacade: ParentDomainFacade,

    private studentDomainFacade: StudentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/parent/:parentId/students')
  async findManyParentId(
    @Param('parentId') parentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.parentDomainFacade.findOneByIdOrFail(parentId)

    const items = await this.studentDomainFacade.findManyByParent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/parent/:parentId/students')
  async createByParentId(
    @Param('parentId') parentId: string,
    @Body() body: StudentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, parentId }

    const item = await this.studentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<StudentApplicationEvent.StudentCreated.Payload>(
      StudentApplicationEvent.StudentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
