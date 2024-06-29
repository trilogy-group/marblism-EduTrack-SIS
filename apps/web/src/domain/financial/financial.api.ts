import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Financial } from './financial.model'

export class FinancialApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Financial>,
  ): Promise<Financial[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/financials${buildOptions}`)
  }

  static findOne(
    financialId: string,
    queryOptions?: ApiHelper.QueryOptions<Financial>,
  ): Promise<Financial> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/financials/${financialId}${buildOptions}`)
  }

  static createOne(values: Partial<Financial>): Promise<Financial> {
    return HttpService.api.post(`/v1/financials`, values)
  }

  static updateOne(
    financialId: string,
    values: Partial<Financial>,
  ): Promise<Financial> {
    return HttpService.api.patch(`/v1/financials/${financialId}`, values)
  }

  static deleteOne(financialId: string): Promise<void> {
    return HttpService.api.delete(`/v1/financials/${financialId}`)
  }

  static findManyByStudentId(
    studentId: string,
    queryOptions?: ApiHelper.QueryOptions<Financial>,
  ): Promise<Financial[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/students/student/${studentId}/financials${buildOptions}`,
    )
  }

  static createOneByStudentId(
    studentId: string,
    values: Partial<Financial>,
  ): Promise<Financial> {
    return HttpService.api.post(
      `/v1/students/student/${studentId}/financials`,
      values,
    )
  }
}
