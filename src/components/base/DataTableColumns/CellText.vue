<script setup lang="ts">
  defineProps<{ value?: string | null; bold?: boolean }>()
</script>

<template>
  <span :style="bold ? 'font-weight:600' : ''">{{ value || '' }}</span>
</template>
