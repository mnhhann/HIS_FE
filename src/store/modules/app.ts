// App store - Store cho trạng thái ứng dụng chung
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State - Trạng thái
  const isLoading = ref(false)
  const isSidebarCollapsed = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const locale = ref('vi')
  const notifications = ref<Notification[]>([])

  // Getters - Computed values
  const hasNotifications = computed(() => notifications.value.length > 0)
  const unreadNotifications = computed(() =>
    notifications.value.filter(n => !n.read)
  )

  // Actions - Các hành động
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  function setSidebarCollapsed(collapsed: boolean) {
    isSidebarCollapsed.value = collapsed
  }

  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function setLocale(newLocale: string) {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  function addNotification(
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    notifications.value.unshift(newNotification)
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function markNotificationAsRead(id: string) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function clearAllNotifications() {
    notifications.value = []
  }

  // Initialize theme from localStorage
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }

  // Initialize locale from localStorage
  function initializeLocale() {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale) {
      setLocale(savedLocale)
    }
  }

  return {
    // State
    isLoading,
    isSidebarCollapsed,
    theme,
    locale,
    notifications,
    // Getters
    hasNotifications,
    unreadNotifications,
    // Actions
    setLoading,
    toggleSidebar,
    setSidebarCollapsed,
    setTheme,
    setLocale,
    addNotification,
    removeNotification,
    markNotificationAsRead,
    clearAllNotifications,
    initializeTheme,
    initializeLocale,
  }
})

// Notification type
interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read: boolean
}
