<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <select
          v-model="filters.category"
          @change="updateFilters"
          class="input"
        >
          <option value="">Todas las categorías</option>
          <option
            v-for="category in productsStore.categories"
            :key="category.name"
            :value="category.name"
          >
            {{ category.name }} ({{ category.count }})
          </option>
        </select>
      </div>

      <!-- Brand Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
        <select
          v-model="filters.brand"
          @change="updateFilters"
          class="input"
        >
          <option value="">Todas las marcas</option>
          <option
            v-for="brand in productsStore.brands"
            :key="brand.name"
            :value="brand.name"
          >
            {{ brand.name }} ({{ brand.count }})
          </option>
        </select>
      </div>

      <!-- Price Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Precio máximo</label>
        <select
          v-model="filters.maxPrice"
          @change="updateFilters"
          class="input"
        >
          <option value="">Sin límite</option>
          <option :value="500">Hasta $500</option>
          <option :value="1000">Hasta $1,000</option>
          <option :value="2000">Hasta $2,000</option>
          <option :value="3000">Hasta $3,000</option>
        </select>
      </div>

      <!-- Sort -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
        <select
          v-model="sortBy"
          @change="updateSort"
          class="input"
        >
          <option
            v-for="option in productsStore.sortOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap gap-2">
          <span
            v-if="filters.category"
            class="badge badge-primary"
          >
            {{ filters.category }}
            <button @click="clearFilter('category')" class="ml-1 hover:text-red-500">
              ×
            </button>
          </span>
          <span
            v-if="filters.brand"
            class="badge badge-primary"
          >
            {{ filters.brand }}
            <button @click="clearFilter('brand')" class="ml-1 hover:text-red-500">
              ×
            </button>
          </span>
          <span
            v-if="filters.maxPrice"
            class="badge badge-primary"
          >
            Hasta ${{ filters.maxPrice.toLocaleString() }}
            <button @click="clearFilter('maxPrice')" class="ml-1 hover:text-red-500">
              ×
            </button>
          </span>
        </div>
        <button
          @click="clearAllFilters"
          class="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Limpiar todo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import type { Filter } from '@/types'

// Store
const productsStore = useProductsStore()

// Local state
const filters = ref<Filter>({})
const sortBy = ref('name')

// Computed
const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some(value => value !== undefined && value !== '')
})

// Methods
const updateFilters = () => {
  productsStore.setFilters(filters.value)
}

const updateSort = () => {
  productsStore.setSortBy(sortBy.value)
}

const clearFilter = (key: keyof Filter) => {
  filters.value[key] = undefined
  updateFilters()
}

const clearAllFilters = () => {
  filters.value = {}
  sortBy.value = 'name'
  productsStore.clearFilters()
}

// Watch for external filter changes
watch(() => productsStore.currentFilters, (newFilters) => {
  filters.value = { ...newFilters }
}, { deep: true })

watch(() => productsStore.sortBy, (newSort) => {
  sortBy.value = newSort
})
</script>
