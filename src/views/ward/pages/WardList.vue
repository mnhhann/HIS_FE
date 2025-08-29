<script setup lang="ts">
  import CellActions from '@/components/base/DataTableColumns/CellActions.vue'
  import CellCode from '@/components/base/DataTableColumns/CellCode.vue'
  import CellDate from '@/components/base/DataTableColumns/CellDate.vue'
  import CellDateTime from '@/components/base/DataTableColumns/CellDateTime.vue'
  import CellName from '@/components/base/DataTableColumns/CellName.vue'
  import CellPhone from '@/components/base/DataTableColumns/CellPhone.vue'
  import CellText from '@/components/base/DataTableColumns/CellText.vue'
  import RowActions from '@/components/base/DataTableColumns/RowActions.vue'
  import { useWardStore } from '@/store/modules/ward'
  import type { Ward } from '@/types/ward.types'
  import { AddOutline, SearchOutline } from '@vicons/ionicons5'
  import { NButton, NSpace, type DataTableColumns } from 'naive-ui'
  import { computed, h, onMounted, ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const store = useWardStore()
  // Local state
  const searchInput = ref('')
  const wards = ref<Ward[]>([])
  onMounted(() => {
    store.fetchWards()
  })
  watchEffect(() => {
    wards.value = store.wards || []
  })

  const hasWards = computed(() => {
    return wards?.value.length > 0
  })

  const filteredData = computed(() => {
    if (!searchInput.value) return wards.value

    return wards.value.filter(item =>
      item.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  })

  // Table columns configuration
  const columns = computed<DataTableColumns<Ward>>(() => [
    {
      title: 'Code',
      key: 'code',
      render: row => h(CellCode, { value: row.code }),
    },
    {
      title: 'Tên',
      key: 'name',
      render: row => h(CellText, { value: row.name }),
    },
    {
      title: 'SĐT',
      key: 'phone',
      render: row => h(CellText, { value: row.phone }),
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      render: row => h(CellDateTime, { value: row.createdAt }),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: row =>
        h(CellActions, {
          row,
          onEdit: () => editItem(row.id),
          onDelete: () => deleteItem(row.id),
        }),
    },
  ])

  // Methods
  const createNew = () => {
    router.push('/ward/create')
  }
  const editItem = (id: number) => {
    router.push(`/ward/update/${id}`)
  }
  const deleteItem = (id: number) => {
    router.push(`/ward/create/${id}`)
  }
</script>

<template>
  <div class="wards-page">
    <!-- Header với search và actions -->
    <NCard class="page-header" embedded>
      <template #header>
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Danh sách Wards</h1>
            <p class="page-subtitle">Quản lý các từ viết tắt y tế</p>
          </div>

          <div class="header-actions">
            <NSpace>
              <!-- Search input -->
              <NInput
                v-model:value="searchInput"
                placeholder="Tìm kiếm Ward..."
                style="width: 300px"
                clearable
              >
                <template #prefix>
                  <NIcon :component="SearchOutline" />
                </template>
              </NInput>

              <!-- Create button -->
              <NButton type="primary" @click="createNew">
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
      v-if="!hasWards"
      description="Chưa có Wards nào"
      style="margin: 40px 0"
    >
      <template #extra>
        <NButton type="primary" @click="createNew">Tạo Ward mới</NButton>
      </template>
    </NEmpty>

    <!-- Data table -->
    <NCard v-else embedded>
      <NDataTable
        :columns="columns"
        :data="filteredData"
        :pagination="{
          pageSize: 10,
          showSizePicker: true,
          pageSizes: [10, 20, 50],
        }"
        striped
        :row-key="(row: Ward) => row.id"
      />
    </NCard>
  </div>
</template>
