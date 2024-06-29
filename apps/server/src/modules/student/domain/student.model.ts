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

import { User } from '../../../modules/user/domain'

import { Parent } from '../../../modules/parent/domain'

import { Enrollment } from '../../../modules/enrollment/domain'

import { Document } from '../../../modules/document/domain'

import { Financial } from '../../../modules/financial/domain'

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  grade?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.students)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  parentId?: string

  @ManyToOne(() => Parent, parent => parent.students)
  @JoinColumn({ name: 'parentId' })
  parent?: Parent

  @OneToMany(() => Enrollment, child => child.student)
  enrollments?: Enrollment[]

  @OneToMany(() => Document, child => child.student)
  documents?: Document[]

  @OneToMany(() => Financial, child => child.student)
  financials?: Financial[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
