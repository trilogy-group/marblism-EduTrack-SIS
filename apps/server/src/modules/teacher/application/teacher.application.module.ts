import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TeacherDomainModule } from '../domain'
import { TeacherController } from './teacher.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TeacherByUserController } from './teacherByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, TeacherDomainModule, UserDomainModule],
  controllers: [TeacherController, TeacherByUserController],
  providers: [],
})
export class TeacherApplicationModule {}
