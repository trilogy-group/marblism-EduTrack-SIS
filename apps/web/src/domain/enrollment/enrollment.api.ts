import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Enrollment } from './enrollment.model'

export class EnrollmentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Enrollment>,
  ): Promise<Enrollment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/enrollments${buildOptions}`)
  }

  static findOne(
    enrollmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Enrollment>,
  ): Promise<Enrollment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/enrollments/${enrollmentId}${buildOptions}`)
  }

  static createOne(values: Partial<Enrollment>): Promise<Enrollment> {
    return HttpService.api.post(`/v1/enrollments`, values)
  }

  static updateOne(
    enrollmentId: string,
    values: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return HttpService.api.patch(`/v1/enrollments/${enrollmentId}`, values)
  }

  static deleteOne(enrollmentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/enrollments/${enrollmentId}`)
  }

  static findManyByStudentId(
    studentId: string,
    queryOptions?: ApiHelper.QueryOptions<Enrollment>,
  ): Promise<Enrollment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/students/student/${studentId}/enrollments${buildOptions}`,
    )
  }

  static createOneByStudentId(
    studentId: string,
    values: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return HttpService.api.post(
      `/v1/students/student/${studentId}/enrollments`,
      values,
    )
  }

  static findManyByCourseId(
    courseId: string,
    queryOptions?: ApiHelper.QueryOptions<Enrollment>,
  ): Promise<Enrollment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/courses/course/${courseId}/enrollments${buildOptions}`,
    )
  }

  static createOneByCourseId(
    courseId: string,
    values: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return HttpService.api.post(
      `/v1/courses/course/${courseId}/enrollments`,
      values,
    )
  }
}
