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

@Entity()
export class Financial {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  amount?: number

  @Column({ nullable: true })
  dueDate?: string

  @Column({ nullable: true })
  status?: string

  @Column({})
  studentId: string

  @ManyToOne(() => Student, parent => parent.financials)
  @JoinColumn({ name: 'studentId' })
  student?: Student

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
