import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Parent } from './parent.model'

export class ParentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Parent>,
  ): Promise<Parent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/parents${buildOptions}`)
  }

  static findOne(
    parentId: string,
    queryOptions?: ApiHelper.QueryOptions<Parent>,
  ): Promise<Parent> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/parents/${parentId}${buildOptions}`)
  }

  static createOne(values: Partial<Parent>): Promise<Parent> {
    return HttpService.api.post(`/v1/parents`, values)
  }

  static updateOne(parentId: string, values: Partial<Parent>): Promise<Parent> {
    return HttpService.api.patch(`/v1/parents/${parentId}`, values)
  }

  static deleteOne(parentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/parents/${parentId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Parent>,
  ): Promise<Parent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/parents${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Parent>,
  ): Promise<Parent> {
    return HttpService.api.post(`/v1/users/user/${userId}/parents`, values)
  }
}
