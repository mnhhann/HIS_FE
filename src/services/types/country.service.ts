import { apiService } from "../api"
import type { Country, CountryParams } from "@/types/country.types.ts"
import type { AxiosResponse } from "axios"

export class CountryService {
  private readonly baseUrl = '/au-country'

  // async getAll(): Promise<Country[]> {
  //   const response: AxiosResponse<Country[]> = await apiService.get(this.baseUrl)
  //   return response
  // }

  async getAll(params?: CountryParams): Promise<Country[]> {
  const response = await apiService.get<Country[]>(this.baseUrl, { params })
  return response
}


}

export const countriesService = new CountryService()
