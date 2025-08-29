<template>
  <n-card title="Danh sách bệnh nhân mới" bordered>
    <n-data-table
      :columns="columns"
      :data="patients"
      size="medium"
      bordered
    />
  </n-card>
</template>

<script setup>
import { defineProps } from 'vue'
import { NCard, NDataTable } from 'naive-ui'

const props = defineProps({
  patients: {
    type: Array,
    default: () => []
  }
})

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Tên bệnh nhân', key: 'name' },
  { title: 'Loại khám', key: 'type' },
  { title: 'Ngày khám', key: 'date' }
]
</script>

<style scoped>
.n-card {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
