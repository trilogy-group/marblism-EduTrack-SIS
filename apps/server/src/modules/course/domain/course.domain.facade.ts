import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Course } from './course.model'

import { Teacher } from '../../teacher/domain'

@Injectable()
export class CourseDomainFacade {
  constructor(
    @InjectRepository(Course)
    private repository: Repository<Course>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Course>): Promise<Course> {
    return this.repository.save(values)
  }

  async update(item: Course, values: Partial<Course>): Promise<Course> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Course): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Course> = {},
  ): Promise<Course[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Course> = {},
  ): Promise<Course> {
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

  async findManyByTeacher(
    item: Teacher,
    queryOptions: RequestHelper.QueryOptions<Course> = {},
  ): Promise<Course[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('teacher')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        teacherId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
