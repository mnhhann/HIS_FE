// Pinia store setup - Thiết lập store chính
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import type { Router } from 'vue-router'

// Tạo Pinia instance
const pinia = createPinia()

// Plugin để có thể sử dụng router trong stores
pinia.use(({ store }) => {
  // @ts-ignore - Sẽ được inject router sau
  store.$router = markRaw(undefined)
})

export default pinia

// Type cho Pinia custom properties
declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
  }
}

// Helper để inject router vào tất cả stores
export function setupStoreRouter(router: Router) {
  pinia.use(({ store }) => {
    store.$router = markRaw(router)
  })
}
