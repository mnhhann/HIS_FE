// Abbreviation store - Store quản lý state abbreviations
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Abbreviation,
  AbbreviationParams,
} from '@/types/abbreviation.types'
import { abbreviationService } from '@/services/types/abbreviation.service'
import { useAppStore } from './app'

export const useAbbreviationStore = defineStore('abbreviation', () => {
  // State - Trạng thái
  const abbreviations = ref<Abbreviation[]>([]) // Danh sách abbreviations
  const currentAbbreviation = ref<Abbreviation | null>(null) // Abbreviation đang xem/edit
  const isLoading = ref(false) // Loading state
  const searchKeyword = ref('') // Từ khóa tìm kiếm
  const currentParams = ref<AbbreviationParams>({}) // Params hiện tại

  // Getters - Computed values
  const filteredAbbreviations = computed(() => {
    if (!searchKeyword.value) return abbreviations.value

    const keyword = searchKeyword.value.toLowerCase()
    return abbreviations.value.filter(
      item =>
        item.name.toLowerCase().includes(keyword) ||
        item.abbr.toLowerCase().includes(keyword) ||
        item.longTxt.toLowerCase().includes(keyword)
    )
  })

  const abbreviationsCount = computed(() => abbreviations.value.length)
  const hasAbbreviations = computed(() => abbreviations.value.length > 0)

  // Actions - Các hành động

  /**
   * Fetch danh sách abbreviations từ API
   * @param params - Tham số filter
   * @param showLoading - Có hiển thị loading không (mặc định true)
   */
  async function fetchAbbreviations(
    params?: AbbreviationParams,
    showLoading: boolean = true
  ) {
    const appStore = useAppStore()

    try {
      if (showLoading) {
        isLoading.value = true
        appStore.setLoading(true)
      }

      // Lưu params hiện tại
      currentParams.value = { ...params }

      // Gọi API
      const data = await abbreviationService.getAbbreviations(params)

      // Update state
      abbreviations.value = data
      // Hiển thị thông báo thành công nếu cần
      if ((data === undefined || data.length === 0) && params?.search) {
        appStore.addNotification({
          title: 'Kết quả tìm kiếm',
          message: 'Không tìm thấy kết quả phù hợp',
          type: 'info',
          read: false,
        })
      }
    } catch (error: any) {
      console.error('Error fetching abbreviations:', error)

      // Hiển thị lỗi cho user
      const appStore = useAppStore()
      appStore.addNotification({
        title: 'Lỗi',
        message: 'Không thể tải danh sách abbreviations',
        type: 'error',
        read: false,
      })

      // Reset data khi có lỗi
      abbreviations.value = []
    } finally {
      if (showLoading) {
        isLoading.value = false
        appStore.setLoading(false)
      }
    }
  }

  /**
   * Lấy chi tiết abbreviation theo ID
   * @param id - ID abbreviation
   */
  async function fetchAbbreviationById(id: number) {
    try {
      isLoading.value = true
      const data = await abbreviationService.getAbbreviationById(id)
      currentAbbreviation.value = data
      return data
    } catch (error) {
      console.error('Error fetching abbreviation:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Tạo mới abbreviation
   * @param abbreviationData - Dữ liệu abbreviation mới
   */
  async function createAbbreviation(abbreviationData: any) {
    const appStore = useAppStore()

    try {
      isLoading.value = true
      const newAbbreviation =
        await abbreviationService.createAbbreviation(abbreviationData)

      // Thêm vào danh sách hiện tại
      abbreviations.value.unshift(newAbbreviation)

      appStore.addNotification({
        title: 'Thành công',
        message: 'Tạo abbreviation mới thành công',
        type: 'success',
        read: false,
      })

      return newAbbreviation
    } catch (error: any) {
      console.error('Error creating abbreviation:', error)
      appStore.addNotification({
        title: 'Lỗi',
        message: 'Không thể tạo abbreviation mới',
        type: 'error',
        read: false,
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Cập nhật abbreviation
   * @param id - ID abbreviation
   * @param updates - Dữ liệu cập nhật
   */
  async function updateAbbreviation(
    id: number,
    updates: Partial<Abbreviation>
  ) {
    const appStore = useAppStore()

    try {
      isLoading.value = true
      const updatedAbbreviation = await abbreviationService.updateAbbreviation(
        id,
        updates
      )

      // Update trong danh sách
      const index = abbreviations.value.findIndex(item => item.id === id)
      if (index !== -1) {
        abbreviations.value[index] = updatedAbbreviation
      }

      // Update current nếu đang xem
      if (currentAbbreviation.value?.id === id) {
        currentAbbreviation.value = updatedAbbreviation
      }

      appStore.addNotification({
        title: 'Thành công',
        message: 'Cập nhật abbreviation thành công',
        type: 'success',
        read: false,
      })

      return updatedAbbreviation
    } catch (error: any) {
      console.error('Error updating abbreviation:', error)
      appStore.addNotification({
        title: 'Lỗi',
        message: 'Không thể cập nhật abbreviation',
        type: 'error',
        read: false,
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Xóa abbreviation
   * @param id - ID abbreviation cần xóa
   */
  async function deleteAbbreviation(id: number) {
    const appStore = useAppStore()

    try {
      isLoading.value = true
      await abbreviationService.deleteAbbreviation(id)

      // Xóa khỏi danh sách
      abbreviations.value = abbreviations.value.filter(item => item.id !== id)

      // Clear current nếu đang xem abbreviation này
      if (currentAbbreviation.value?.id === id) {
        currentAbbreviation.value = null
      }

      appStore.addNotification({
        title: 'Thành công',
        message: 'Xóa abbreviation thành công',
        type: 'success',
        read: false,
      })
    } catch (error: any) {
      console.error('Error deleting abbreviation:', error)
      appStore.addNotification({
        title: 'Lỗi',
        message: 'Không thể xóa abbreviation',
        type: 'error',
        read: false,
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Tìm kiếm abbreviations
   * @param keyword - Từ khóa tìm kiếm
   */
  function searchAbbreviations(keyword: string) {
    searchKeyword.value = keyword

    // Debounce search - có thể gọi API search thật nếu muốn
    // fetchAbbreviations({ search: keyword })
  }

  /**
   * Clear search
   */
  function clearSearch() {
    searchKeyword.value = ''
  }

  /**
   * Reset store về trạng thái ban đầu
   */
  function resetStore() {
    abbreviations.value = []
    currentAbbreviation.value = null
    isLoading.value = false
    searchKeyword.value = ''
    currentParams.value = {}
  }

  /**
   * Refresh data - Tải lại data với params hiện tại
   */
  async function refreshData() {
    await fetchAbbreviations(currentParams.value, false)
  }

  return {
    // State
    abbreviations,
    currentAbbreviation,
    isLoading,
    searchKeyword,
    currentParams,
    // Getters
    filteredAbbreviations,
    abbreviationsCount,
    hasAbbreviations,
    // Actions
    fetchAbbreviations,
    fetchAbbreviationById,
    createAbbreviation,
    updateAbbreviation,
    deleteAbbreviation,
    searchAbbreviations,
    clearSearch,
    resetStore,
    refreshData,
  }
})
