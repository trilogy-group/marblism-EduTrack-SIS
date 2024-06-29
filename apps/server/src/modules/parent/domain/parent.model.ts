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

import { Student } from '../../../modules/student/domain'

@Entity()
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  phoneNumber?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.parents)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Student, child => child.parent)
  students?: Student[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
