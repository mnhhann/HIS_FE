<script setup lang="ts">
  import { NButton, NSpace } from 'naive-ui'
  const props = defineProps<{ row: any }>()
  const emit = defineEmits<{
    (e: 'edit'): void
    (e: 'delete'): void
  }>()
</script>

<template>
  <NSpace size="small">
    <NButton size="small" type="primary" ghost @click="emit('edit')">
      Sửa
    </NButton>
    <NButton size="small" type="error" ghost @click="emit('delete')">
      Xóa
    </NButton>
  </NSpace>
</template>
