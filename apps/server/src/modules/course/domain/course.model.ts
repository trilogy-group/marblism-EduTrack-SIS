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

import { Teacher } from '../../../modules/teacher/domain'

import { Schedule } from '../../../modules/schedule/domain'

import { Enrollment } from '../../../modules/enrollment/domain'

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  teacherId: string

  @ManyToOne(() => Teacher, parent => parent.courses)
  @JoinColumn({ name: 'teacherId' })
  teacher?: Teacher

  @OneToMany(() => Schedule, child => child.course)
  schedules?: Schedule[]

  @OneToMany(() => Enrollment, child => child.course)
  enrollments?: Enrollment[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
