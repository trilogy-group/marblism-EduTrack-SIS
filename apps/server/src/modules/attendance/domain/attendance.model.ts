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

import { Enrollment } from '../../../modules/enrollment/domain'

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  date?: string

  @Column({ nullable: true })
  status?: string

  @Column({})
  enrollmentId: string

  @ManyToOne(() => Enrollment, parent => parent.attendances)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment?: Enrollment

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
