import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Enrollment } from './enrollment.model'

import { Student } from '../../student/domain'

import { Course } from '../../course/domain'

@Injectable()
export class EnrollmentDomainFacade {
  constructor(
    @InjectRepository(Enrollment)
    private repository: Repository<Enrollment>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Enrollment>): Promise<Enrollment> {
    return this.repository.save(values)
  }

  async update(
    item: Enrollment,
    values: Partial<Enrollment>,
  ): Promise<Enrollment> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Enrollment): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Enrollment> = {},
  ): Promise<Enrollment[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Enrollment> = {},
  ): Promise<Enrollment> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByStudent(
    item: Student,
    queryOptions: RequestHelper.QueryOptions<Enrollment> = {},
  ): Promise<Enrollment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('student')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        studentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByCourse(
    item: Course,
    queryOptions: RequestHelper.QueryOptions<Enrollment> = {},
  ): Promise<Enrollment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('course')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        courseId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
