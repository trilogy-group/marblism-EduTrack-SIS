import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ParentDomainModule } from '../domain'
import { ParentController } from './parent.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ParentByUserController } from './parentByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ParentDomainModule, UserDomainModule],
  controllers: [ParentController, ParentByUserController],
  providers: [],
})
export class ParentApplicationModule {}
