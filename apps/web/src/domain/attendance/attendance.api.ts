import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Attendance } from './attendance.model'

export class AttendanceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Attendance>,
  ): Promise<Attendance[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/attendances${buildOptions}`)
  }

  static findOne(
    attendanceId: string,
    queryOptions?: ApiHelper.QueryOptions<Attendance>,
  ): Promise<Attendance> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/attendances/${attendanceId}${buildOptions}`)
  }

  static createOne(values: Partial<Attendance>): Promise<Attendance> {
    return HttpService.api.post(`/v1/attendances`, values)
  }

  static updateOne(
    attendanceId: string,
    values: Partial<Attendance>,
  ): Promise<Attendance> {
    return HttpService.api.patch(`/v1/attendances/${attendanceId}`, values)
  }

  static deleteOne(attendanceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/attendances/${attendanceId}`)
  }

  static findManyByEnrollmentId(
    enrollmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Attendance>,
  ): Promise<Attendance[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/enrollments/enrollment/${enrollmentId}/attendances${buildOptions}`,
    )
  }

  static createOneByEnrollmentId(
    enrollmentId: string,
    values: Partial<Attendance>,
  ): Promise<Attendance> {
    return HttpService.api.post(
      `/v1/enrollments/enrollment/${enrollmentId}/attendances`,
      values,
    )
  }
}
