// Validation functions - Các hàm validation
export const validators = {
  // Kiểm tra email hợp lệ
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  // Kiểm tra mật khẩu mạnh (ít nhất 8 ký tự, có chữ hoa, chữ thường, số)
  strongPassword: (value: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return strongPasswordRegex.test(value)
  },

  // Kiểm tra số điện thoại Việt Nam
  phoneVN: (value: string): boolean => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    return phoneRegex.test(value)
  },

  // Kiểm tra URL hợp lệ
  url: (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  // Kiểm tra giá trị required
  required: (value: any): boolean => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  },

  // Kiểm tra độ dài tối thiểu
  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },

  // Kiểm tra độ dài tối đa
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },

  // Kiểm tra số nguyên
  integer: (value: string | number): boolean => {
    return Number.isInteger(Number(value))
  },

  // Kiểm tra số dương
  positive: (value: string | number): boolean => {
    return Number(value) > 0
  },
}

// Validation messages - Thông báo lỗi validation
export const validationMessages = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  strongPassword:
    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
  phoneVN: 'Số điện thoại không hợp lệ',
  url: 'URL không hợp lệ',
  minLength: (min: number) => `Phải có ít nhất ${min} ký tự`,
  maxLength: (max: number) => `Không được vượt quá ${max} ký tự`,
  integer: 'Phải là số nguyên',
  positive: 'Phải là số dương',
}
