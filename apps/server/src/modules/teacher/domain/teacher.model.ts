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

import { Course } from '../../../modules/course/domain'

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  department?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.teachers)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Course, child => child.teacher)
  courses?: Course[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
