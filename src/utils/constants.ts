// Application constants - Hằng số ứng dụng
export const APP_NAME = 'My Vue App'
export const APP_VERSION = '1.0.0'

// API endpoints - Các endpoint API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    SHOW: '/users/{id}',
    CREATE: '/users',
    UPDATE: '/users/{id}',
    DELETE: '/users/{id}',
  },
} as const

// Storage keys - Các key cho localStorage/sessionStorage
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  LOCALE: 'app_locale',
  THEME: 'app_theme',
} as const

// Status codes - Mã trạng thái HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const

// Default pagination - Phân trang mặc định
export const DEFAULT_PAGINATION = {
  page: 1,
  per_page: 10,
  total: 0,
}
