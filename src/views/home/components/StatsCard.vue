<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <n-card title="Bệnh nhân hôm nay" bordered>
      <p class="text-2xl font-semibold">{{ stats.todayPatients }}</p>
    </n-card>
    <n-card title="Lượt khám tuần này" bordered>
      <p class="text-2xl font-semibold">{{ stats.weeklyVisits }}</p>
    </n-card>
    <n-card title="Tổng số quốc gia" bordered>
      <p class="text-2xl font-semibold">{{ stats.totalCountries }}</p>
    </n-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { NCard } from 'naive-ui'

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.n-card {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
