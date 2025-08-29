import type { Ward, WardParams } from '@/types/ward.types'
import { apiService } from '../api'

export class WardService {
  private readonly baseUrl = '/ward'
  async getWards(params?: WardParams): Promise<Ward[]> {
    // Gọi API với params query
    const response = await apiService.get<Ward[]>(this.baseUrl, {
      params,
    })

    // Trả về data từ response
    return response
  }
}

// Export singleton instance
export const wardService = new WardService()
