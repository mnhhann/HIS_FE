<template>
  <n-layout has-sider style="height: 100vh">
    <!-- Sidebar -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger
      v-model:collapsed="collapsed"
    >
      <Sidebar :collapsed="collapsed" />
    </n-layout-sider>

    <!-- Main layout -->
    <n-layout>
      <!-- Header -->
      <Header :collapsed="collapsed" @toggle-sidebar="collapsed = !collapsed" />

      <!-- Content -->
      <n-layout-content
        style="
          padding: 20px;
          background: #f5f5f5;
          height: calc(100vh - 60px);
          overflow: auto;
        "
      >
        <!-- router-view để render các page -->
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
  import Header from './Header.vue'
  import Sidebar from './Sidebar.vue'

  const collapsed = ref(false)
</script>
