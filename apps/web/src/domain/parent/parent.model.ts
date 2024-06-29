import { User } from '../user'

import { Student } from '../student'

export class Parent {
  id: string

  phoneNumber?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  students?: Student[]
}
