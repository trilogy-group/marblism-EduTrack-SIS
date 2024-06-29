import { Student } from '../student'

import { Course } from '../course'

import { Attendance } from '../attendance'

export class Enrollment {
  id: string

  enrollmentDate?: string

  studentId: string

  student?: Student

  courseId: string

  course?: Course

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  attendances?: Attendance[]
}
