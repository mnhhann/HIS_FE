// Global type definitions - Định nghĩa types toàn cục
export {}

declare global {
  // Environment variables - Biến môi trường
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_VERSION: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  // Window object extensions - Mở rộng object window
  interface Window {
    // Có thể thêm các property tùy chỉnh vào window
  }
}

// Common utility types - Các type tiện ích chung
export type ID = string | number

export type ApiResponse<T = any> = {
  status: number
  success: boolean
  data: T
  message: string
  errors?: Record<string, string[]>
}

export type PaginatedResponse<T = any> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type SelectOption = {
  label: string
  value: string | number
}
