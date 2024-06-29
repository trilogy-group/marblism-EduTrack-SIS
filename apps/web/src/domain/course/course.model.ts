import { Teacher } from '../teacher'

import { Schedule } from '../schedule'

import { Enrollment } from '../enrollment'

export class Course {
  id: string

  name?: string

  description?: string

  teacherId: string

  teacher?: Teacher

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  schedules?: Schedule[]

  enrollments?: Enrollment[]
}
