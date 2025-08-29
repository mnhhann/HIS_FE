<script setup lang="ts">
  const props = defineProps<{ value?: number | null; locale?: string }>()
</script>

<template>
  <span>{{ props.value?.toLocaleString(props.locale || 'vi-VN') ?? '-' }}</span>
</template>
