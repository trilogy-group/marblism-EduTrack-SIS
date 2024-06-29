import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { StudentDomainFacade } from './student.domain.facade'
import { Student } from './student.model'

@Module({
  imports: [TypeOrmModule.forFeature([Student]), DatabaseHelperModule],
  providers: [StudentDomainFacade, StudentDomainFacade],
  exports: [StudentDomainFacade],
})
export class StudentDomainModule {}
