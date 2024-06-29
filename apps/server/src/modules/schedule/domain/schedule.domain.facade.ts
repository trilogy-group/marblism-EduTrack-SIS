import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Schedule } from './schedule.model'

import { Course } from '../../course/domain'

@Injectable()
export class ScheduleDomainFacade {
  constructor(
    @InjectRepository(Schedule)
    private repository: Repository<Schedule>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Schedule>): Promise<Schedule> {
    return this.repository.save(values)
  }

  async update(item: Schedule, values: Partial<Schedule>): Promise<Schedule> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Schedule): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Schedule> = {},
  ): Promise<Schedule[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Schedule> = {},
  ): Promise<Schedule> {
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

  async findManyByCourse(
    item: Course,
    queryOptions: RequestHelper.QueryOptions<Schedule> = {},
  ): Promise<Schedule[]> {
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
