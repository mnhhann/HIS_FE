<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <router-view />
      </n-notification-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>
