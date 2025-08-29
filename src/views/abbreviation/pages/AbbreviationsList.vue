<script setup lang="ts">
import { useAbbreviationStore } from '@/store/modules/abbreviation'
import type { Abbreviation } from '@/types/abbreviation.types'
import { formatDate } from '@/utils/formatters'
import { truncate } from '@/utils/helpers'
import { AddOutline, SearchOutline } from '@vicons/ionicons5'
import {
  NButton,
  NCard,
  NDataTable,
  NEmpty,
  NIcon,
  NInput,
  NPopconfirm,
  NSpace,
  NTag,
  type DataTableColumns
} from 'naive-ui'
import { computed, h, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
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
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref<Abbreviation | null>(null)

// Computed
const hasAbbreviations = computed(() => {
  return abbreviations.value.length > 0
})

const filteredData = computed(() => {
  if (!searchInput.value) return abbreviations.value

  return abbreviations.value.filter(item =>
    item.abbr.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    item.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    item.longTxt.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

// Table columns configuration
const columns: DataTableColumns<Abbreviation> = [
  {
    title: 'Abbreviation',
    key: 'abbr',
    render: (row) => h('code', { style: 'background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;' }, row.abbr)
  },
  {
    title: 'Tên',
    key: 'name',
    render: (row) => h('div', [
      h('div', { style: 'font-weight: 600; margin-bottom: 2px;' }, row.name),
      row.type ? h(NTag, { size: 'small', type: 'info' }, { default: () => `Type ${row.type}` }) : null
    ])
  },
  {
    title: 'Mô tả ngắn',
    key: 'longTxt',
    render: (row) => truncate(row.longTxt, 100)
  },
  {
    title: 'Chuyên khoa',
    key: 'specialtyCode',
    render: (row) => row.specialtyCode
      ? h(NTag, { type: 'success' }, { default: () => row.specialtyCode })
      : h('span', { style: 'color: #9ca3af;' }, '-')
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (row) => h(NSpace, [
      h(NButton, {
        size: 'small',
        type: 'info',
        ghost: true,
        onClick: () => viewItem(row)
      }, {
        default: () => '👁️'
      }),
      h(NButton, {
        size: 'small',
        type: 'warning',
        ghost: true,
        onClick: () => editItem(row)
      }, {
        default: () => '✏️'
      }),
      h(NPopconfirm, {
        onPositiveClick: () => deleteItem(row)
      }, {
        trigger: () => h(NButton, {
          size: 'small',
          type: 'error',
          ghost: true
        }, {
          default: () => '🗑️'
        }),
        default: () => 'Bạn có chắc chắn muốn xóa abbreviation này?'
      })
    ])
  }
]

// Methods
const createNew = () => {
  router.push('/abbreviations/create')
}

const viewItem = (item: Abbreviation) => {
  router.push(`/abbreviations/${item.id}`)
}

const editItem = (item: Abbreviation) => {
  router.push(`/abbreviations/${item.id}/edit`)
}

const deleteItem = async (item: Abbreviation) => {
  try {
    loading.value = true
    await store.deleteAbbreviation(item.id)
  } catch (error) {
    console.error('Error deleting abbreviation:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="abbreviations-page">
    <!-- Header với search và actions -->
    <NCard class="page-header" embedded>
      <template #header>
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Danh sách Abbreviations</h1>
            <p class="page-subtitle">Quản lý các từ viết tắt y tế</p>
          </div>

          <div class="header-actions">
            <NSpace>
              <!-- Search input -->
              <NInput
                v-model:value="searchInput"
                placeholder="Tìm kiếm abbreviation..."
                style="width: 300px"
                clearable
              >
                <template #prefix>
                  <NIcon :component="SearchOutline" />
                </template>
              </NInput>

              <!-- Create button -->
              <NButton
                type="primary"
                @click="createNew"
              >
                <template #icon>
                  <NIcon :component="AddOutline" />
                </template>
                Tạo mới
              </NButton>
            </NSpace>
          </div>
        </div>
      </template>
    </NCard>

    <!-- Empty state -->
    <NEmpty
      v-if="!hasAbbreviations && !loading"
      description="Chưa có abbreviations nào"
      style="margin: 40px 0;"
    >
      <template #extra>
        <NButton type="primary" @click="createNew">
          Tạo abbreviation mới
        </NButton>
      </template>
    </NEmpty>

    <!-- Data table -->
    <NCard v-else embedded>
      <NDataTable
        :columns="columns"
        :data="filteredData"
        :loading="loading"
        :pagination="{
          pageSize: 10,
          showSizePicker: true,
          pageSizes: [10, 20, 50]
        }"
        striped
        :row-key="(row: Abbreviation) => row.id"
      />
    </NCard>
  </div>
</template>

<style scoped>
.abbreviations-page {
  padding: 24px;
  min-height: 100vh;
  background-color: #f8fafc;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 4px 0;
}

.page-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 14px;
}

.header-actions {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: stretch;
  }
}</style>
