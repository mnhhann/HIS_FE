<script setup lang="ts">
  import { NTag } from 'naive-ui'
  const props = defineProps<{
    value?: string | null
    type?: 'success' | 'info' | 'warning' | 'error'
  }>()
</script>

<template>
  <NTag v-if="value" :type="type || 'default'">{{ value }}</NTag>
  <span v-else style="color: #9ca3af">-</span>
</template>
