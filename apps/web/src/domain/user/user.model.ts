import { Notification } from '../notification'

import { Parent } from '../parent'

import { Student } from '../student'

import { Teacher } from '../teacher'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  parents?: Parent[]

  students?: Student[]

  teachers?: Teacher[]
}
