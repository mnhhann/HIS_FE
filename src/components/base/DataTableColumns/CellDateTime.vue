<script setup lang="ts">
  import { format } from 'date-fns'
  const props = defineProps<{
    value?: string | Date | null
    formatStr?: string
  }>()
</script>

<template>
  <span>
    {{
      props.value
        ? format(new Date(props.value), props.formatStr || 'dd/MM/yyyy HH:mm')
        : '-'
    }}
  </span>
</template>
