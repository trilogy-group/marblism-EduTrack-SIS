import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DocumentDomainModule } from '../domain'
import { DocumentController } from './document.controller'

import { StudentDomainModule } from '../../../modules/student/domain'

import { DocumentByStudentController } from './documentByStudent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DocumentDomainModule,

    StudentDomainModule,
  ],
  controllers: [DocumentController, DocumentByStudentController],
  providers: [],
})
export class DocumentApplicationModule {}
