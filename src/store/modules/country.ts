import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Country } from '@/types/country.types.ts'
import { countriesService } from '@/services/types/country.service'

export const useCountryStore = defineStore('country', () => {
  // state
  const countries = ref<Country[]>([])
  const loading = ref(false)

  // actions
  const setCountries = (data: Country[]) => {
    countries.value = data
  }

  const loadCountries = async () => {
    loading.value = true
    try {
      const data = await countriesService.getAll()
      countries.value = data
    } catch (error) {
      console.error('Lỗi khi tải danh sách quốc gia', error)
    } finally {
      loading.value = false
    }
  }

  const addCountry = (country: Country) => {
    countries.value.push(country)
  }

  const updateCountry = (updated: Country) => {
    const index = countries.value.findIndex(c => c.id === updated.id)
    if (index !== -1) {
      countries.value[index] = { ...updated }
    }
  }

  const deleteCountry = (id: number) => {
    countries.value = countries.value.filter(c => c.id !== id)
  }

  return { countries, loading, setCountries, loadCountries, addCountry, updateCountry, deleteCountry }
})
