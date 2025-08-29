import type { ApiResponse } from "./global"

export interface Country{
    id: number,
    code: string,
    name: string,
    nameVN: string, 
    bhytCode: string,
    status: number | null
}

export interface CountryParams {
  search?: string 
  page?: number 
  limit?: number
}

export type CountryApiResponse = ApiResponse<Country[]>