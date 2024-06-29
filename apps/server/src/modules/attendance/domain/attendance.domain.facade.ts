import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Attendance } from './attendance.model'

import { Enrollment } from '../../enrollment/domain'

@Injectable()
export class AttendanceDomainFacade {
  constructor(
    @InjectRepository(Attendance)
    private repository: Repository<Attendance>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Attendance>): Promise<Attendance> {
    return this.repository.save(values)
  }

  async update(
    item: Attendance,
    values: Partial<Attendance>,
  ): Promise<Attendance> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Attendance): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Attendance> = {},
  ): Promise<Attendance[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Attendance> = {},
  ): Promise<Attendance> {
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

  async findManyByEnrollment(
    item: Enrollment,
    queryOptions: RequestHelper.QueryOptions<Attendance> = {},
  ): Promise<Attendance[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('enrollment')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        enrollmentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
