import { Student } from '../student'

export class Document {
  id: string

  documentUrl?: string

  studentId: string

  student?: Student

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
