import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Student } from './student.model'

export class StudentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Student>,
  ): Promise<Student[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/students${buildOptions}`)
  }

  static findOne(
    studentId: string,
    queryOptions?: ApiHelper.QueryOptions<Student>,
  ): Promise<Student> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/students/${studentId}${buildOptions}`)
  }

  static createOne(values: Partial<Student>): Promise<Student> {
    return HttpService.api.post(`/v1/students`, values)
  }

  static updateOne(
    studentId: string,
    values: Partial<Student>,
  ): Promise<Student> {
    return HttpService.api.patch(`/v1/students/${studentId}`, values)
  }

  static deleteOne(studentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/students/${studentId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Student>,
  ): Promise<Student[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/students${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Student>,
  ): Promise<Student> {
    return HttpService.api.post(`/v1/users/user/${userId}/students`, values)
  }

  static findManyByParentId(
    parentId: string,
    queryOptions?: ApiHelper.QueryOptions<Student>,
  ): Promise<Student[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/parents/parent/${parentId}/students${buildOptions}`,
    )
  }

  static createOneByParentId(
    parentId: string,
    values: Partial<Student>,
  ): Promise<Student> {
    return HttpService.api.post(
      `/v1/parents/parent/${parentId}/students`,
      values,
    )
  }
}
