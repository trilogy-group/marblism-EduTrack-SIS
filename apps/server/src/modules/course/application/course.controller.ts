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
import { Course, CourseDomainFacade } from '@server/modules/course/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CourseApplicationEvent } from './course.application.event'
import { CourseCreateDto, CourseUpdateDto } from './course.dto'

@Controller('/v1/courses')
export class CourseController {
  constructor(
    private eventService: EventService,
    private courseDomainFacade: CourseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.courseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CourseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.courseDomainFacade.create(body)

    await this.eventService.emit<CourseApplicationEvent.CourseCreated.Payload>(
      CourseApplicationEvent.CourseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:courseId')
  async findOne(@Param('courseId') courseId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.courseDomainFacade.findOneByIdOrFail(
      courseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:courseId')
  async update(
    @Param('courseId') courseId: string,
    @Body() body: CourseUpdateDto,
  ) {
    const item = await this.courseDomainFacade.findOneByIdOrFail(courseId)

    const itemUpdated = await this.courseDomainFacade.update(
      item,
      body as Partial<Course>,
    )
    return itemUpdated
  }

  @Delete('/:courseId')
  async delete(@Param('courseId') courseId: string) {
    const item = await this.courseDomainFacade.findOneByIdOrFail(courseId)

    await this.courseDomainFacade.delete(item)

    return item
  }
}
