<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :loading="loading"
    :bordered="true"
    :single-line="false"
    :pagination="pagination"
    size="small"
  />
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, NTag, NSpace } from 'naive-ui'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])

const pagination = ref({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  showQuickJumper: true,
  prefix({ itemCount }) {
    return `Tổng số ${itemCount} bản ghi`
  },
  onChange: (page) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  }
})

const columns = [
  {
    title: 'STT',
    key: 'stt',
    width: 60,
    render(row, index) {
      return index + 1 + (pagination.value.page - 1) * pagination.value.pageSize
    }
  },
  {
    title: 'Mã Quốc gia',
    key: 'code',
    width: 120,
    render(row) {
      return h('span', { class: 'font-medium text-blue-600' }, row.code)
    }
  },
  {
    title: 'Tên Quốc gia',
    key: 'name',
    minWidth: 200,
    ellipsis: { tooltip: true }
  },
  {
    title: 'Tên Tiếng Việt',
    key: 'nameVN',
    minWidth: 200,
    ellipsis: { tooltip: true },
    render(row) {
      return row.nameVN || h('span', { class: 'text-gray-400 italic' }, '(Chưa có)')
    }
  },
  {
    title: 'Mã BHYT',
    key: 'bhytCode',
    width: 100,
    render(row) {
      return row.bhytCode || h('span', { class: 'text-gray-400' }, '-')
    }
  },
  {
    title: 'Tình trạng',
    key: 'status',
    width: 120,
    render(row) {
      const type = row.status === 'Đang sử dụng' ? 'success' : 'default'
      return h(
        NTag,
        { type, size: 'small', bordered: false },
        { default: () => row.status }
      )
    }
  },
  {
    title: 'Hành động',
    key: 'actions',
    width: 120,
    fixed: 'right',
    render(row) {
      return h(
        NSpace,
        { size: 'small' },
        {
          default: () => [
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                ghost: true,
                onClick: () => emit('edit', row)
              },
              { default: () => 'Sửa' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                ghost: true,
                onClick: () => emit('delete', row)
              },
              { default: () => 'Xóa' }
            )
          ]
        }
      )
    }
  }
]
</script>
