import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DocumentDomainFacade } from '@server/modules/document/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DocumentApplicationEvent } from './document.application.event'
import { DocumentCreateDto } from './document.dto'

import { StudentDomainFacade } from '../../student/domain'

@Controller('/v1/students')
export class DocumentByStudentController {
  constructor(
    private studentDomainFacade: StudentDomainFacade,

    private documentDomainFacade: DocumentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/student/:studentId/documents')
  async findManyStudentId(
    @Param('studentId') studentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.studentDomainFacade.findOneByIdOrFail(studentId)

    const items = await this.documentDomainFacade.findManyByStudent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/student/:studentId/documents')
  async createByStudentId(
    @Param('studentId') studentId: string,
    @Body() body: DocumentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, studentId }

    const item = await this.documentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DocumentApplicationEvent.DocumentCreated.Payload>(
      DocumentApplicationEvent.DocumentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
