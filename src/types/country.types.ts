export interface Country{
    id: number,
    code: string,
    name: string,
    nameVN: string, 
    bhytCode: string,
    status: number | null
}

export interface CountryParams {
  search?: string // Tìm kiếm theo tên hoặc abbr
  page?: number // Phân trang
  limit?: number // Số lượng per page
}

export interface CountryApiResponse {
  status: number
  data: Country[]
  success: boolean
  errors: any | null
  timestamp: number
}