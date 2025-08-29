<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <div
      class="logo"
      style="height: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; border-bottom: 1px solid #eee;"
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
      style="flex: 1;"
    />
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon, NMenu } from 'naive-ui'
import {
  HomeOutline,
  PeopleOutline,
  SettingsOutline
} from '@vicons/ionicons5'

const props = defineProps({
  collapsed: Boolean
})

const router = useRouter()
const route = useRoute()
const activeKey = ref(route.name)

const renderIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) })

const menuOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(HomeOutline)
  },
  {
    label: 'Danh mục',
    key: 'countries',
    icon: renderIcon(PeopleOutline)
  }
  // {
  //   label: 'Settings',
  //   key: 'settings',
  //   icon: renderIcon(SettingsOutline)
  // }
]

const handleUpdateValue = (key) => {
  activeKey.value = key
  router.push({ name: key })
}
</script>
