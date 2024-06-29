import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Financial } from './financial.model'

import { Student } from '../../student/domain'

@Injectable()
export class FinancialDomainFacade {
  constructor(
    @InjectRepository(Financial)
    private repository: Repository<Financial>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Financial>): Promise<Financial> {
    return this.repository.save(values)
  }

  async update(
    item: Financial,
    values: Partial<Financial>,
  ): Promise<Financial> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Financial): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Financial> = {},
  ): Promise<Financial[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Financial> = {},
  ): Promise<Financial> {
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
    queryOptions: RequestHelper.QueryOptions<Financial> = {},
  ): Promise<Financial[]> {
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
}
