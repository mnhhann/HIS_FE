<template>
  <n-modal 
    v-model:show="showModal" 
    :mask-closable="false"
    preset="dialog"
    :title="isEdit ? 'Sửa thông tin quốc gia' : 'Thêm mới quốc gia'"
    style="width: 500px"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <!-- <span>🌍</span> -->
        <span>{{ isEdit ? 'Sửa thông tin quốc gia' : 'Thêm mới quốc gia' }}</span>
      </div>
    </template>

    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      label-width="120"
      size="medium"
    >
      <n-form-item label="Mã quốc gia" path="code">
        <n-input
          v-model:value="formData.code"
          placeholder="Nhập mã quốc gia (VD: VN)"
          :maxlength="10"
          show-count
        />
      </n-form-item>

      <n-form-item label="Tên quốc gia" path="name">
        <n-input
          v-model:value="formData.name"
          placeholder="Nhập tên quốc gia"
          :maxlength="100"
          show-count
        />
      </n-form-item>

      <n-form-item label="Tên Tiếng Việt" path="nameVN">
        <n-input
          v-model:value="formData.nameVN"
          placeholder="Nhập tên tiếng Việt"
          :maxlength="100"
          show-count
        />
      </n-form-item>

      <n-form-item label="Mã BHYT" path="bhytCode">
        <n-input
          v-model:value="formData.bhytCode"
          placeholder="Nhập mã BHYT"
          :maxlength="10"
          show-count
        />
      </n-form-item>

      <n-form-item label="Tình trạng" path="status">
        <n-select
          v-model:value="formData.status"
          placeholder="Chọn tình trạng"
          :options="statusOptions"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-space justify="end">
        <n-button @click="handleCancel">
          Hủy
        </n-button>
        <n-button 
          type="primary" 
          @click="handleSave"
          :loading="saving"
        >
          {{ isEdit ? 'Cập nhật' : 'Lưu' }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  NModal, NForm, NFormItem, NInput, NSelect, NButton, NSpace,useMessage 
} from 'naive-ui'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:show', 'save'])

const message = useMessage()
const formRef = ref(null)
const saving = ref(false)

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const isEdit = computed(() => !!props.editData)

const formData = ref({
  id: null,
  code: '',
  name: '',
  nameVN: '',
  bhytCode: '',
  status: 'Đang sử dụng'
})

// const statusOptions = [
//   { label: 'Đang sử dụng', value: 'Đang sử dụng' },
//   { label: 'Ngừng sử dụng', value: 'Ngừng sử dụng' }
// ]

// const rules = {
//   code: [
//     { required: true, message: 'Vui lòng nhập mã quốc gia', trigger: ['input', 'blur'] },
//     { min: 1, max: 10, message: 'Mã quốc gia phải từ 1-10 ký tự', trigger: ['input', 'blur'] }
//   ],
//   name: [
//     { required: true, message: 'Vui lòng nhập tên quốc gia', trigger: ['input', 'blur'] },
//     { min: 1, max: 100, message: 'Tên quốc gia phải từ 1-100 ký tự', trigger: ['input', 'blur'] }
//   ],
//   nameVN: [
//     { max: 100, message: 'Tên tiếng Việt không được vượt quá 100 ký tự', trigger: ['input', 'blur'] }
//   ],
//   bhytCode: [
//     { max: 10, message: 'Mã BHYT không được vượt quá 10 ký tự', trigger: ['input', 'blur'] }
//   ],
//   status: [
//     { required: true, message: 'Vui lòng chọn tình trạng', trigger: ['change', 'blur'] }
//   ]
// }

// Watch for editData changes to populate form
watch(() => props.editData, (newData) => {
  if (newData) {
    formData.value = {
      id: newData.id,
      code: newData.code || '',
      name: newData.name || '',
      nameVN: newData.nameVN || '',
      bhytCode: newData.bhytCode || '',
      status: newData.status || 'Đang sử dụng'
    }
  } else {
    // resetForm()
  }
}, { immediate: true })

// Watch for show prop to reset form when dialog closes
watch(() => props.show, (newShow) => {
  if (!newShow) {
    // resetForm()
  }
})

// const resetForm = () => {
//   formData.value = {
//     id: null,
//     code: '',
//     name: '',
//     nameVN: '',
//     bhytCode: '',
//     status: 'Đang sử dụng'
//   }
//   formRef.value?.restoreValidation()
// }

const handleCancel = () => {
  showModal.value = false
}

const handleSave = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      saving.value = true
      
      // Simulate API call
      setTimeout(() => {
        emit('save', { ...formData.value })
        saving.value = false
        showModal.value = false
      }, 500)
    } else {
      message.error('Vui lòng kiểm tra lại thông tin nhập vào')
    }
  })
}
</script>

<style scoped>
:deep(.n-dialog__title) {
  font-weight: 600;
}

:deep(.n-form-item-label) {
  font-weight: 500;
}

:deep(.n-input__input-el) {
  font-size: 14px;
}
</style>