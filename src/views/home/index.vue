<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-bold mb-4">Dashboard HIS</h2>

    <!-- Stats cards -->
    <StatsCards :stats="stats" />

    <!-- Recent patients table -->
    <RecentPatientsTable :patients="recentPatients" />
  </div>
</template>

<script setup>
import StatsCards from './components/StatsCard.vue'
import RecentPatientsTable from './components/RecentPatientsTable.vue'
import { ref } from 'vue'

const stats = {
  todayPatients: 24,
  weeklyVisits: 102,
  totalCountries: 15
}

const recentPatients = ref([
  { id: 1, name: 'Nguyen Van A', type: 'Ngoại trú', date: '2025-08-29' },
  { id: 2, name: 'Tran Thi B', type: 'Nội trú', date: '2025-08-28' },
  { id: 3, name: 'Le Van C', type: 'Cấp cứu', date: '2025-08-27' }
])
</script>
