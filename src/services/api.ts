// Base API service - Service API cơ bản
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import type { ApiResponse } from '@/types/global'
import { STORAGE_KEYS, HTTP_STATUS } from '@/utils/constants'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor - Xử lý trước khi gửi request
    this.api.interceptors.request.use(
      config => {
        // Tự động thêm token vào header
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Log request trong development
        if (import.meta.env.DEV) {
          console.log(
            `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
            config
          )
        }

        return config
      },
      error => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor - Xử lý sau khi nhận response
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response trong development
        if (import.meta.env.DEV) {
          console.log(
            `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
            response.data
          )
        }
        return response
      },
      error => {
        const { response } = error

        // Log error
        console.error('Response error:', error)

        // Xử lý lỗi 401 - Unauthorized
        if (response?.status === HTTP_STATUS.UNAUTHORIZED) {
          this.handleUnauthorized()
        }

        // Xử lý lỗi 403 - Forbidden
        if (response?.status === HTTP_STATUS.FORBIDDEN) {
          this.handleForbidden()
        }

        // Xử lý lỗi server
        if (response?.status >= 500) {
          this.handleServerError()
        }

        return Promise.reject(error)
      }
    )
  }

  private handleUnauthorized() {
    // Xóa token và chuyển về trang login
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)

    // Redirect to login - có thể dùng router hoặc window.location
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
  }

  private handleForbidden() {
    // Có thể show notification hoặc redirect
    console.warn('Access forbidden')
  }

  private handleServerError() {
    // Có thể show notification lỗi server
    console.error('Server error occurred')
  }

  // Generic methods - Các method chung
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<ApiResponse<T>>(url, config)
    if (response.data && typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<ApiResponse<T>>(url, data, config)
    if (typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<ApiResponse<T>>(url, data, config)
    if (typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.patch<ApiResponse<T>>(url, data, config)
    if (typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<ApiResponse<T>>(url, config)
    if (typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  // Upload file method
  async upload<T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
    if (typeof response.data.data !== 'undefined') {
      return response.data.data as T
    }
    throw new Error('Invalid API response format')
  }

  // Download file method
  async download(url: string, filename?: string): Promise<void> {
    const response = await this.api.get(url, {
      responseType: 'blob',
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  }
}

// Export singleton instance
export const apiService = new ApiService()
