import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CourseDomainFacade } from './course.domain.facade'
import { Course } from './course.model'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), DatabaseHelperModule],
  providers: [CourseDomainFacade, CourseDomainFacade],
  exports: [CourseDomainFacade],
})
export class CourseDomainModule {}
