// Helper functions - Các hàm hỗ trợ chung
import type { SelectOption } from '@/types/global'
import type { Node } from 'typescript'

/**
 * Delay execution - Trì hoãn thực thi
 * @param ms - milliseconds to delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generate random string - Tạo chuỗi ngẫu nhiên
 * @param length - độ dài chuỗi
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Debounce function - Trì hoãn thực thi function
 * @param func - function cần debounce
 * @param wait - thời gian đợi (ms)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Deep clone object - Sao chép sâu object
 * @param obj - object cần clone
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const copy = {} as { [key: string]: any }
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as { [key: string]: any })[key])
    })
    return copy as T
  }
  return obj
}

/**
 * Convert array to select options - Chuyển array thành options cho select
 * @param items - mảng dữ liệu
 * @param labelKey - key để lấy label
 * @param valueKey - key để lấy value
 */
export const arrayToSelectOptions = <T>(
  items: T[],
  labelKey: keyof T,
  valueKey: keyof T
): SelectOption[] => {
  return items.map(item => ({
    label: String(item[labelKey]),
    value: item[valueKey] as string | number,
  }))
}

/**
 * Format file size - Format kích thước file
 * @param bytes - kích thước tính bằng bytes
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Capitalize first letter - Viết hoa chữ cái đầu
 * @param str - chuỗi cần format
 */
export const capitalize = (str: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Truncate text - Cắt ngắn text
 * @param text - text cần cắt
 * @param length - độ dài tối đa
 * @param suffix - hậu tố (mặc định là '...')
 */
export const truncate = (
  text: string,
  length: number,
  suffix: string = '...'
): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + suffix
}
