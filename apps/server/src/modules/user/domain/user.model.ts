import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { Parent } from '../../../modules/parent/domain'

import { Student } from '../../../modules/student/domain'

import { Teacher } from '../../../modules/teacher/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Parent, child => child.user)
  parents?: Parent[]

  @OneToMany(() => Student, child => child.user)
  students?: Student[]

  @OneToMany(() => Teacher, child => child.user)
  teachers?: Teacher[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
