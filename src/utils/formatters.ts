// Formatting functions - Các hàm format dữ liệu
/**
 * Format currency - Format tiền tệ
 * @param amount - số tiền
 * @param currency - loại tiền tệ (mặc định VND)
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'VND'
): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  })
  return formatter.format(amount)
}

/**
 * Format number - Format số
 * @param num - số cần format
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num)
}

/**
 * Format date - Format ngày tháng
 * @param date - ngày cần format
 * @param format - định dạng ('short', 'medium', 'long', 'full')
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: format,
  }).format(dateObj)
}

/**
 * Format datetime - Format ngày giờ
 * @param datetime - ngày giờ cần format
 */
export const formatDateTime = (datetime: string | Date): string => {
  const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(dateObj)
}

/**
 * Format relative time - Format thời gian tương đối (2 phút trước, 1 giờ trước...)
 * @param date - ngày cần format
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Vừa xong'
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} phút trước`
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} giờ trước`
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`
  return formatDate(dateObj)
}

/**
 * Format percentage - Format phần trăm
 * @param value - giá trị (0-1 hoặc 0-100)
 * @param isDecimal - có phải số thập phân không (0-1)
 */
export const formatPercentage = (
  value: number,
  isDecimal: boolean = true
): string => {
  const percentage = isDecimal ? value * 100 : value
  return `${percentage.toFixed(1)}%`
}
