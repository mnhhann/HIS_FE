// Composable cho Abbreviations - Logic tái sử dụng
import { ref, computed, onMounted } from 'vue'
import { useAbbreviationStore } from '@/store/modules/abbreviation'
import type { AbbreviationParams } from '@/types/abbreviation.types'

export function useAbbreviations(autoFetch: boolean = true) {
  const store = useAbbreviationStore()

  // Local state cho component
  const selectedIds = ref<number[]>([]) // IDs được chọn (cho bulk actions)
  const showDeleteModal = ref(false) // Hiển thị modal xác nhận xóa
  const itemToDelete = ref<number | null>(null) // ID item cần xóa

  // Computed values
  const hasSelectedItems = computed(() => selectedIds.value.length > 0)
  const selectedCount = computed(() => selectedIds.value.length)

  // Methods
  const handleSelectItem = (id: number, selected: boolean) => {
    if (selected) {
      selectedIds.value.push(id)
    } else {
      selectedIds.value = selectedIds.value.filter(
        selectedId => selectedId !== id
      )
    }
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      selectedIds.value = store.filteredAbbreviations.map(item => item.id)
    } else {
      selectedIds.value = []
    }
  }

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
    selectedIds.value = [] // Clear selections after refresh
  }

  const handleSearch = (keyword: string) => {
    store.searchAbbreviations(keyword)
    selectedIds.value = [] // Clear selections after search
  }

  // Fetch data khi composable được khởi tạo
  if (autoFetch) {
    onMounted(() => {
      store.fetchAbbreviations()
    })
  }

  return {
    // Store state
    abbreviations: store.abbreviations,
    filteredAbbreviations: store.filteredAbbreviations,
    isLoading: store.isLoading,
    searchKeyword: store.searchKeyword,
    // Local state
    selectedIds,
    showDeleteModal,
    hasSelectedItems,
    selectedCount,
    // Store methods
    fetchAbbreviations: store.fetchAbbreviations,
    refreshData: handleRefresh,
    searchAbbreviations: handleSearch,
    clearSearch: store.clearSearch,
    // Local methods
    handleSelectItem,
    handleSelectAll,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  }
}
