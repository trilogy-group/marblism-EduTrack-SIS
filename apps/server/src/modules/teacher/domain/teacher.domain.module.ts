import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TeacherDomainFacade } from './teacher.domain.facade'
import { Teacher } from './teacher.model'

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), DatabaseHelperModule],
  providers: [TeacherDomainFacade, TeacherDomainFacade],
  exports: [TeacherDomainFacade],
})
export class TeacherDomainModule {}
