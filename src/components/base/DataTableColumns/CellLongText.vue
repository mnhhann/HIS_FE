<script setup lang="ts">
  import { NTooltip } from 'naive-ui'
  const props = defineProps<{ text?: string | null; limit?: number }>()
  const getShort = (text?: string | null, limit = 100) =>
    !text ? '' : text.length > limit ? text.slice(0, limit) + '…' : text
</script>

<template>
  <NTooltip v-if="text && text.length > (limit || 100)" :disabled="false">
    <template #trigger>
      <span>{{ getShort(text, limit) }}</span>
    </template>
    {{ text }}
  </NTooltip>
  <span v-else>{{ getShort(text, limit) }}</span>
</template>
