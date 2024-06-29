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
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  documentUrl?: string

  @Column({})
  studentId: string

  @ManyToOne(() => Student, parent => parent.documents)
  @JoinColumn({ name: 'studentId' })
  student?: Student

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
