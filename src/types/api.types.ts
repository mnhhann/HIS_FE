// API related types - Types liên quan đến API
export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  expires_in: number
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: UserRole
  email_verified_at?: string
  created_at: string
  updated_at: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}
