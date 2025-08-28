// Composable cho Abbreviations - Logic tái sử dụng
import { ref, computed, onMounted } from 'vue'
import { useAbbreviationStore } from '@/store/modules/abbreviation'
import type { AbbreviationParams } from '@/types/abbreviation.types'

export function useAbbreviations(autoFetch: boolean = true) {
  const store = useAbbreviationStore()
  const abbreviations = ref(store.abbreviations)

  // Local state cho component
  const showDeleteModal = ref(false) // Hiển thị modal xác nhận xóa
  const itemToDelete = ref<number | null>(null) // ID item cần xóa

  // Methods
  const handleDeleteClick = (id: number) => {
    itemToDelete.value = id
    showDeleteModal.value = true
  }

  const confirmDelete = async () => {
    if (itemToDelete.value) {
      await store.deleteAbbreviation(itemToDelete.value)
      showDeleteModal.value = false
      itemToDelete.value = null
    }
  }

  const cancelDelete = () => {
    showDeleteModal.value = false
    itemToDelete.value = null
  }

  const handleRefresh = async () => {
    await store.refreshData()
  }

  const handleSearch = (keyword: string) => {
    store.searchAbbreviations(keyword)
  }

  // Fetch data khi composable được khởi tạo
  if (autoFetch) {
    store.fetchAbbreviations()
  }

  return {
    // Store state
    abbreviations: abbreviations,
    filteredAbbreviations: store.filteredAbbreviations,
    isLoading: store.isLoading,
    searchKeyword: store.searchKeyword,
    // Local state
    showDeleteModal,
    // Store methods
    fetchAbbreviations: store.fetchAbbreviations,
    refreshData: handleRefresh,
    searchAbbreviations: handleSearch,
    clearSearch: store.clearSearch,
    // Local methods
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  }
}
