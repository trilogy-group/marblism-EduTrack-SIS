import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EnrollmentDomainFacade } from './enrollment.domain.facade'
import { Enrollment } from './enrollment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), DatabaseHelperModule],
  providers: [EnrollmentDomainFacade, EnrollmentDomainFacade],
  exports: [EnrollmentDomainFacade],
})
export class EnrollmentDomainModule {}
