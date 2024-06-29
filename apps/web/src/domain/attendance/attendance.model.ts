import { Enrollment } from '../enrollment'

export class Attendance {
  id: string

  date?: string

  status?: string

  enrollmentId: string

  enrollment?: Enrollment

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
