import { Course } from '../course'

export class Schedule {
  id: string

  dayOfWeek?: string

  startTime?: string

  endTime?: string

  courseId: string

  course?: Course

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
