import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CourseDomainFacade } from '@server/modules/course/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CourseApplicationEvent } from './course.application.event'
import { CourseCreateDto } from './course.dto'

import { TeacherDomainFacade } from '../../teacher/domain'

@Controller('/v1/teachers')
export class CourseByTeacherController {
  constructor(
    private teacherDomainFacade: TeacherDomainFacade,

    private courseDomainFacade: CourseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/teacher/:teacherId/courses')
  async findManyTeacherId(
    @Param('teacherId') teacherId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.teacherDomainFacade.findOneByIdOrFail(teacherId)

    const items = await this.courseDomainFacade.findManyByTeacher(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/teacher/:teacherId/courses')
  async createByTeacherId(
    @Param('teacherId') teacherId: string,
    @Body() body: CourseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, teacherId }

    const item = await this.courseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CourseApplicationEvent.CourseCreated.Payload>(
      CourseApplicationEvent.CourseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
