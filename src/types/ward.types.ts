// Types cho Ward API
export interface Ward {
  id: number
  refID: number | null
  code: string // Mã khoa
  name: string // Tên khoa
  phone: string | null // Số điện thoại
  email: string | null // Email liên hệ
  nDoctor: number // Số bác sĩ
  nNurse: number // Số y tá
  nBed: number // Số giường
  advAmt: number // Số tiền ứng trước
  status: number // Trạng thái
  type: number // Loại
  typeL1: number // Loại cấp 1
  attribute: number | null // Thuộc tính thêm (nếu có)
  insCode: string | null // Mã BHYT
  srcFullName: string // Họ tên đầy đủ ghép từ code + name
  createdAt: string // Ngày tạo (ISO string)
  createdId: number // ID người tạo
  modifiedAt: string // Ngày sửa (ISO string)
  modifiedId: number // ID người sửa
  version: number // Phiên bản
}

// Request params để filter/search
export interface WardParams {
  search?: string // Tìm kiếm theo tên hoặc abbr
  page?: number // Phân trang
  limit?: number // Số lượng per page
}
