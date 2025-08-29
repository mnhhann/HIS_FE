import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Country } from '@/types/country.types.ts'
import { countriesService } from '@/services/types/country.service' 

export const useCountryStore = defineStore('country', () => {
  const countries = ref<Country[]>([])
  const loading = ref(false)

  const setCountries = (data: Country[]) => {
    countries.value = data
  }

  const loadData = async () => {
    loading.value = true
    try {
      countries.value = await countriesService.getCountry() 
    } catch (error) {
      console.error(error)
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

  return { countries, loading, setCountries, loadData, addCountry, updateCountry, deleteCountry }
})
