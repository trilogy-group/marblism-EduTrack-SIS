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

import { Course } from '../../../modules/course/domain'

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  dayOfWeek?: string

  @Column({ nullable: true })
  startTime?: string

  @Column({ nullable: true })
  endTime?: string

  @Column({})
  courseId: string

  @ManyToOne(() => Course, parent => parent.schedules)
  @JoinColumn({ name: 'courseId' })
  course?: Course

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
