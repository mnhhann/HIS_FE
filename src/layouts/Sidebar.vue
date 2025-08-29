<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <div
      class="logo"
      style="
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
        border-bottom: 1px solid #eee;
      "
    >
      <span v-if="!collapsed">HIS</span>
      <span v-else>H</span>
    </div>

    <!-- Menu -->
    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :value="activeKey"
      @update:value="handleUpdateValue"
      style="flex: 1"
    />
  </div>
</template>

<script setup>
  import {
    DocumentTextOutline,
    FileTrayStackedOutline,
    HomeOutline,
    PeopleOutline,
  } from '@vicons/ionicons5'
  import { NIcon, NMenu } from 'naive-ui'
  import { h, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const props = defineProps({
    collapsed: Boolean,
  })

  const router = useRouter()
  const route = useRoute()
  const activeKey = ref(route.name)

  const renderIcon = icon => () => h(NIcon, null, { default: () => h(icon) })

  const menuOptions = [
    {
      label: 'Dashboard',
      key: 'dashboard',
      icon: renderIcon(HomeOutline),
    },
    {
      label: 'Danh mục',
      key: 'countries',
      icon: renderIcon(PeopleOutline),
    },
    {
      label: 'Cách dùng thuốc',
      key: 'abbreviation',
      icon: renderIcon(DocumentTextOutline),
    },
    {
      label: 'Country',
      key: 'Country',
      icon: renderIcon(PeopleOutline),
    },
    {
      label: 'Khoa',
      key: 'ward',
      icon: renderIcon(FileTrayStackedOutline),
    },
  ]

  const handleUpdateValue = key => {
    activeKey.value = key
    router.push({ name: key })
  }
</script>
