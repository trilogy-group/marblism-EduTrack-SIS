import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { FinancialDomainFacade } from './financial.domain.facade'
import { Financial } from './financial.model'

@Module({
  imports: [TypeOrmModule.forFeature([Financial]), DatabaseHelperModule],
  providers: [FinancialDomainFacade, FinancialDomainFacade],
  exports: [FinancialDomainFacade],
})
export class FinancialDomainModule {}
