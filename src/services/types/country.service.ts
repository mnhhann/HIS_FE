import { apiService } from "../api"
import type { Country } from "@/types/country.types.ts"
import type { AxiosResponse } from "axios"

export class CountryService {
  private readonly baseUrl = '/au-country'

    async getAbbreviations(params?: undefined): Promise<Country[]> {
      const response = await apiService.get<Country[]>(this.baseUrl, {
        params,
      })
  
      return response
    }
}

export const countriesService = new CountryService()
