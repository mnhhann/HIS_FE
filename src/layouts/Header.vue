<template>
  <n-layout-header
    bordered
    style="
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: #fff;
    "
  >
    <!-- Left: Toggle Sidebar + Title -->
    <div style="display: flex; align-items: center; gap: 10px">
      <n-button text @click="$emit('toggle-sidebar')">
        <n-icon size="20">
          <MenuOutline />
        </n-icon>
      </n-button>
    </div>

    <!-- Right: Search + User Info -->
    <div
      style="display: flex; align-items: center; gap: 15px; flex-wrap: nowrap"
    >
      <!-- Search -->
      <n-input placeholder="Tìm kiếm..." clearable style="max-width: 300px">
        <template #prefix>
          <n-icon>
            <SearchOutline />
          </n-icon>
        </template>
      </n-input>

      <span style="font-size: 15px; font-weight: 500; white-space: nowrap">
        One Digi Health
      </span>

      <n-icon size="26">
        <PersonCircleOutline />
      </n-icon>
    </div>
  </n-layout-header>
</template>

<script setup>
  import { NLayoutHeader, NButton, NIcon, NInput } from 'naive-ui'
  import {
    MenuOutline,
    SearchOutline,
    PersonCircleOutline,
  } from '@vicons/ionicons5'
</script>
