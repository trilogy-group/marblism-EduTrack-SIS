import { ColumnNumeric } from '@server/core/database'
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

import { Student } from '../../../modules/student/domain'

import { Course } from '../../../modules/course/domain'

import { Attendance } from '../../../modules/attendance/domain'

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  enrollmentDate?: string

  @Column({})
  studentId: string

  @ManyToOne(() => Student, parent => parent.enrollments)
  @JoinColumn({ name: 'studentId' })
  student?: Student

  @Column({})
  courseId: string

  @ManyToOne(() => Course, parent => parent.enrollments)
  @JoinColumn({ name: 'courseId' })
  course?: Course

  @OneToMany(() => Attendance, child => child.enrollment)
  attendances?: Attendance[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
