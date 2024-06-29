import { User } from '../user'

import { Parent } from '../parent'

import { Enrollment } from '../enrollment'

import { Document } from '../document'

import { Financial } from '../financial'

export class Student {
  id: string

  grade?: string

  userId: string

  user?: User

  parentId?: string

  parent?: Parent

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  enrollments?: Enrollment[]

  documents?: Document[]

  financials?: Financial[]
}
