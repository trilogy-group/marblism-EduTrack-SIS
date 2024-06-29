import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { StudentDomainModule } from '../domain'
import { StudentController } from './student.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { StudentByUserController } from './studentByUser.controller'

import { ParentDomainModule } from '../../../modules/parent/domain'

import { StudentByParentController } from './studentByParent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    StudentDomainModule,

    UserDomainModule,

    ParentDomainModule,
  ],
  controllers: [
    StudentController,

    StudentByUserController,

    StudentByParentController,
  ],
  providers: [],
})
export class StudentApplicationModule {}
