<script setup lang="ts">
  defineProps<{ value?: string | null }>()
</script>

<template>
  <code
    style="
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    "
  >
    {{ value || '-' }}
  </code>
</template>
