import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { FinancialDomainModule } from '../domain'
import { FinancialController } from './financial.controller'

import { StudentDomainModule } from '../../../modules/student/domain'

import { FinancialByStudentController } from './financialByStudent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    FinancialDomainModule,

    StudentDomainModule,
  ],
  controllers: [FinancialController, FinancialByStudentController],
  providers: [],
})
export class FinancialApplicationModule {}
