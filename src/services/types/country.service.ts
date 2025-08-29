import { apiService } from "../api"
import type { Country } from "@/types/country.types.ts"
import type { AxiosResponse } from "axios"

export class CountryService {
  private readonly baseUrl = '/country'

  async getAll(): Promise<Country[]> {
    const response: AxiosResponse<{ data: Country[] }> = await apiService.get(this.baseUrl)
    
    return response.data.data  
  }
}

// Singleton
export const countriesService = new CountryService()
