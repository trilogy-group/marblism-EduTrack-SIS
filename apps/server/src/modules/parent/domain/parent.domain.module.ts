import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ParentDomainFacade } from './parent.domain.facade'
import { Parent } from './parent.model'

@Module({
  imports: [TypeOrmModule.forFeature([Parent]), DatabaseHelperModule],
  providers: [ParentDomainFacade, ParentDomainFacade],
  exports: [ParentDomainFacade],
})
export class ParentDomainModule {}
