import { wardService } from '@/services/types/ward.service'
import type { Ward, WardParams } from '@/types/ward.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from './app'

export const useWardStore = defineStore('ward', () => {
  // State - Trạng thái
  const wards = ref<Ward[]>([]) // Danh sách wards

  async function fetchWards(params?: WardParams) {
    try {
      // Gọi API lấy danh sách wards và cập nhật state
      const data = await wardService.getWards(params)
      wards.value = data
    } catch (error) {
      console.error('Error fetching wards:', error)

      // Hiển thị lỗi cho user
      const appStore = useAppStore()
      appStore.addNotification({
        title: 'Lỗi',
        message: 'Không thể tải danh sách wards',
        type: 'error',
        read: false,
      })

      // Reset data khi có lỗi
      wards.value = []
    }
  }

  return {
    // State
    wards,
    // Actions
    fetchWards,
  }
})
