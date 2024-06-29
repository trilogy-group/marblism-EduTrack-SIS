import { User } from '../user'

import { Course } from '../course'

export class Teacher {
  id: string

  department?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  courses?: Course[]
}
