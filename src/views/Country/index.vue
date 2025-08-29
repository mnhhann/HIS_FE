<template>
  <div class="p-6">
    <n-card title="Danh mục quốc gia" class="shadow-lg">
      <template #header-extra>
        <n-button type="primary" @click="openAddDialog">
          + Thêm mới
        </n-button>
      </template>

      <countries-table 
        :data="countries" 
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />

      <countries-form-modal
        v-model:show="showDialog"
        :edit-data="editData"
        @save="handleSave"
      />
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { NCard, NButton, useMessage, useDialog } from "naive-ui"
import CountriesTable from "@/views/country/components/CountryTable.vue"
import CountriesFormModal from "@/views/country/components/CountryFormModel.vue"
import { CountryService } from "@/services/types/country.service"
const message = useMessage()
const dialog = useDialog()

const countries = ref([])
const loading = ref(false)
const showDialog = ref(false)
const editData = ref(null)

onMounted(() => loadData())

const loadData = async () => {
  loading.value = true
  try {
    countries.value = await CountryService.getAll()
  } catch (error) {
    console.error(error)
    message.error("Lỗi khi tải dữ liệu")
  } finally {
    loading.value = false
  }
}

const openAddDialog = () => {
  editData.value = null
  showDialog.value = true
}

const handleEdit = (row) => {
  editData.value = { ...row }
  showDialog.value = true
}

const handleDelete = (row) => {
  dialog.warning({
    title: "Xác nhận xóa",
    content: `Bạn có chắc chắn muốn xóa quốc gia "${row.name}"?`,
    positiveText: "Xóa",
    negativeText: "Hủy",
    onPositiveClick: async () => {
      try {
        await CountriesService.delete(row.id)
        countries.value = countries.value.filter(c => c.id !== row.id)
        message.success("Xóa thành công")
      } catch (error) {
        message.error("Xóa thất bại")
      }
    }
  })
}

const handleSave = async (data) => {
  try {
    if (data.id) {
      await CountriesService.update(data.id, data)
      const index = countries.value.findIndex(c => c.id === data.id)
      if (index > -1) countries.value[index] = { ...data }
      message.success("Cập nhật thành công")
    } else {
      const res = await CountriesService.create(data)
      countries.value.push({
        ...data,
        id: res?.id ?? Math.max(...countries.value.map(c => c.id), 0) + 1
      })
      message.success("Thêm mới thành công")
    }
    showDialog.value = false
  } catch (error) {
    message.error("Lưu thất bại")
  }
}
</script>
