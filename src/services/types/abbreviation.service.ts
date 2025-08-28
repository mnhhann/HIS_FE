// Abbreviation service - Service xử lý API abbreviation
import { apiService } from '../api'
import type {
  Abbreviation,
  AbbreviationApiResponse,
  AbbreviationParams,
} from '@/types/abbreviation.types'

export class AbbreviationService {
  private readonly baseUrl = '/abbreviation'

  /**
   * Lấy danh sách abbreviations
   * @param params - Tham số filter/search
   */
  async getAbbreviations(params?: AbbreviationParams): Promise<Abbreviation[]> {
    // Gọi API với params query
    const response = await apiService.get<Abbreviation[]>(this.baseUrl, {
      params,
    })

    // Trả về data từ response
    return response
  }

  /**
   * Lấy chi tiết 1 abbreviation theo ID
   * @param id - ID của abbreviation
   */
  async getAbbreviationById(id: number): Promise<Abbreviation> {
    const response = await apiService.get<{ data: Abbreviation }>(
      `${this.baseUrl}/${id}`
    )
    return response.data
  }

  /**
   * Tạo mới abbreviation
   * @param data - Dữ liệu abbreviation mới
   */
  async createAbbreviation(
    data: Omit<
      Abbreviation,
      'id' | 'createdAt' | 'modifiedAt' | 'createdId' | 'modifiedId' | 'version'
    >
  ): Promise<Abbreviation> {
    const response = await apiService.post<{ data: Abbreviation }>(
      this.baseUrl,
      data
    )
    return response.data
  }

  /**
   * Cập nhật abbreviation
   * @param id - ID abbreviation cần update
   * @param data - Dữ liệu cập nhật
   */
  async updateAbbreviation(
    id: number,
    data: Partial<Abbreviation>
  ): Promise<Abbreviation> {
    const response = await apiService.put<{ data: Abbreviation }>(
      `${this.baseUrl}/${id}`,
      data
    )
    return response.data
  }

  /**
   * Xóa abbreviation
   * @param id - ID abbreviation cần xóa
   */
  async deleteAbbreviation(id: number): Promise<void> {
    await apiService.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * Tìm kiếm abbreviation theo từ khóa
   * @param keyword - Từ khóa tìm kiếm
   */
  async searchAbbreviations(keyword: string): Promise<Abbreviation[]> {
    return this.getAbbreviations({ search: keyword })
  }
}

// Export singleton instance
export const abbreviationService = new AbbreviationService()
