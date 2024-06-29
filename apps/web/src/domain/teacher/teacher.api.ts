import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Teacher } from './teacher.model'

export class TeacherApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Teacher>,
  ): Promise<Teacher[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teachers${buildOptions}`)
  }

  static findOne(
    teacherId: string,
    queryOptions?: ApiHelper.QueryOptions<Teacher>,
  ): Promise<Teacher> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teachers/${teacherId}${buildOptions}`)
  }

  static createOne(values: Partial<Teacher>): Promise<Teacher> {
    return HttpService.api.post(`/v1/teachers`, values)
  }

  static updateOne(
    teacherId: string,
    values: Partial<Teacher>,
  ): Promise<Teacher> {
    return HttpService.api.patch(`/v1/teachers/${teacherId}`, values)
  }

  static deleteOne(teacherId: string): Promise<void> {
    return HttpService.api.delete(`/v1/teachers/${teacherId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Teacher>,
  ): Promise<Teacher[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/teachers${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Teacher>,
  ): Promise<Teacher> {
    return HttpService.api.post(`/v1/users/user/${userId}/teachers`, values)
  }
}
