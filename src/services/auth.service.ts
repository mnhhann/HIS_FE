// Authentication service - Service xác thực
import { apiService } from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '@/types/api.types'

export class AuthService {
  /**
   * Đăng nhập
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
  }

  /**
   * Đăng ký
   */
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    return apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, userData)
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT)
  }

  /**
   * Lấy thông tin profile user hiện tại
   */
  async getProfile(): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.AUTH.PROFILE)
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<LoginResponse> {
    return apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH)
  }

  /**
   * Cập nhật profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    return apiService.put<User>(API_ENDPOINTS.AUTH.PROFILE, userData)
  }

  /**
   * Đổi mật khẩu
   */
  async changePassword(data: {
    current_password: string
    password: string
    password_confirmation: string
  }): Promise<void> {
    return apiService.post('/auth/change-password', data)
  }

  /**
   * Quên mật khẩu
   */
  async forgotPassword(email: string): Promise<void> {
    return apiService.post('/auth/forgot-password', { email })
  }

  /**
   * Reset mật khẩu
   */
  async resetPassword(data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<void> {
    return apiService.post('/auth/reset-password', data)
  }
}

// Export singleton instance
export const authService = new AuthService()
