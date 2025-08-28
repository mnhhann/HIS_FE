// Types cho Abbreviation API
export interface Abbreviation {
  id: number
  refID: number | null
  type: number
  abbr: string // Từ viết tắt
  name: string // Tên
  longTxt: string // Văn bản dài
  forStaffId: number | null // ID nhân viên (nếu có)
  forServiceId: number | null // ID dịch vụ (nếu có)
  specialtyCode: string | null // Mã chuyên khoa
  conclusion: string // Kết luận
  longTxtHtml: string // HTML văn bản dài
  status: number | null // Trạng thái
  createdAt: string // Ngày tạo (ISO string)
  createdId: number // ID người tạo
  modifiedAt: string // Ngày sửa (ISO string)
  modifiedId: number // ID người sửa
  version: number // Phiên bản
}

// Response từ API
export interface AbbreviationApiResponse {
  status: number
  data: Abbreviation[]
  success: boolean
  errors: any | null
  timestamp: number
}

// Request params để filter/search
export interface AbbreviationParams {
  search?: string // Tìm kiếm theo tên hoặc abbr
  type?: number // Lọc theo type
  specialtyCode?: string // Lọc theo chuyên khoa
  forStaffId?: number // Lọc theo nhân viên
  page?: number // Phân trang
  limit?: number // Số lượng per page
}

// Enum cho types (nếu biết được ý nghĩa)
export enum AbbreviationType {
  TYPE_1 = 1,
  TYPE_2 = 2,
  // Thêm các type khác nếu có
}
