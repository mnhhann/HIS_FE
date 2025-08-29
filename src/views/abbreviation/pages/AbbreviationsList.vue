
<script setup lang="ts">
  import { useAbbreviations } from '@/composables/useAbbreviations'
  import { useAbbreviationStore } from '@/store/modules/abbreviation'
  import type { Abbreviation } from '@/types/abbreviation.types'
  import { formatDate } from '@/utils/formatters'
  import { truncate } from '@/utils/helpers'
  import { computed, onMounted, ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'

  // Router để điều hướng
  const router = useRouter()
  const store = useAbbreviationStore()
  onMounted(() => {
    store.fetchAbbreviations()
  })
  // Composable để quản lý abbreviations
  const abbreviations = ref<Abbreviation[]>([])
  watchEffect(() => {
    abbreviations.value = store.abbreviations
  })

  // Local state
  const searchInput = ref('')

  // Computed test
  const hasAbbreviations = computed(() => {
    return abbreviations.value.length > 0
  })

  // Methods
  const handleSearchInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    searchInput.value = target.value
  }

  const truncateText = (text: string, length: number) => {
    return truncate(text, length)
  }

  const handleCreateNew = () => {
    router.push('/abbreviations/create')
  }

  const handleViewDetail = (item: Abbreviation) => {
    router.push(`/abbreviations/${item.id}`)
  }

  const handleEdit = (item: Abbreviation) => {
    router.push(`/abbreviations/${item.id}/edit`)
  }
</script>

<template>
  <div class="abbreviations-page">
    <!-- Header với search và actions -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">Danh sách Abbreviations</h1>
      </div>

      <div class="header-actions">
        <!-- Search input -->
        <div class="search-box">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Tìm kiếm abbreviation..."
            class="search-input"
            @input="handleSearchInput"
          />
        </div>

        <!-- Action buttons -->

        <button @click="handleCreateNew" class="btn btn-primary">
          ➕ Tạo mới
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <!-- <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div> -->

    <!-- Empty state -->
    <div v-if="!hasAbbreviations" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>Chưa có abbreviations nào</h3>
      <p>Hãy tạo abbreviation đầu tiên của bạn</p>
      <button @click="handleCreateNew" class="btn btn-primary">
        Tạo abbreviation mới
      </button>
    </div>

    <!-- Data table -->
    <div v-else class="data-table-container">
      <!-- Table -->
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Abbreviation</th>
              <th>Tên</th>
              <th>Mô tả ngắn</th>
              <th>Chuyên khoa</th>
              <th>Ngày tạo</th>
              <th class="actions-column">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in abbreviations"
              :key="item.id"
              class="table-row"
            >
              <td class="abbr-cell">
                <code class="abbr-code">{{ item.abbr }}</code>
              </td>
              <td class="name-cell">
                <div class="name-content">
                  <strong>{{ item.name }}</strong>
                  <div v-if="item.type" class="type-badge">
                    Type {{ item.type }}
                  </div>
                </div>
              </td>
              <td class="description-cell">
                <p class="description-text">
                  {{ truncateText(item.longTxt, 100) }}
                </p>
              </td>
              <td class="specialty-cell">
                <span v-if="item.specialtyCode" class="specialty-tag">
                  {{ item.specialtyCode }}
                </span>
                <span v-else class="no-specialty">-</span>
              </td>
              <td class="date-cell">
                <time :datetime="item.createdAt" class="date-text">
                  {{ formatDate(item.createdAt) }}
                </time>
              </td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button
                    @click="handleViewDetail(item)"
                    class="btn-icon btn-view"
                    title="Xem chi tiết"
                  >
                    👁️
                  </button>
                  <button
                    @click="handleEdit(item)"
                    class="btn-icon btn-edit"
                    title="Chỉnh sửa"
                  >
                    ✏️
                  </button>
                  <button
                    class="btn-icon btn-delete"
                    title="Xóa"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <!-- <div v-if="showDeleteModal" class="modal-overlay" @click="cancelDelete">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Xác nhận xóa</h3>
        </div>
        <div class="modal-body">
          <p>Bạn có chắc chắn muốn xóa abbreviation này?</p>
          <p class="warning-text">Hành động này không thể hoàn tác.</p>
        </div>
        <div class="modal-footer">
          <button @click="cancelDelete" class="btn btn-secondary">Hủy</button>
          <button @click="confirmDelete" class="btn btn-danger">Xóa</button>
        </div>
      </div>
    </div> -->
  </div>
</template>


<style scoped>
  /* CSS Styles cho component */
  .abbreviations-page {
    padding: 24px;
    min-height: 100vh;
    background-color: #f8fafc;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-left .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 8px 0;
  }

  .page-subtitle {
    color: #64748b;
    margin: 0;
  }

  .selected-count {
    color: #3b82f6;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .search-box {
    position: relative;
  }

  .search-input {
    padding: 10px 40px 10px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    width: 300px;
    font-size: 14px;
  }

  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .clear-search-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
  }

  .btn {
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: #3b82f6;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2563eb;
  }

  .btn-secondary {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background-color: #e2e8f0;
  }

  .btn-danger {
    background-color: #dc2626;
    color: white;
  }

  .btn-danger:hover {
    background-color: #b91c1c;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px;
    text-align: center;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .data-table-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .bulk-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
</style>
