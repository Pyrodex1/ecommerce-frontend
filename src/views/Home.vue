<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Descubre los Mejores
            <span class="block text-yellow-300">Productos Tech</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Encuentra smartphones, laptops, accesorios y más con la mejor calidad y precios increíbles
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="scrollToProducts"
              class="btn-primary px-8 py-4 text-lg font-semibold"
            >
              Explorar Productos
            </button>
            <button class="btn-outline border-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
              Ver Ofertas
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and Products Section -->
    <section ref="productsSection" class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters Bar -->
        <div class="mb-8">
          <ProductFilters />
        </div>

        <!-- Products Grid -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              Productos
              <span class="text-lg font-normal text-gray-500">
                ({{ productsStore.filteredProducts.length }} resultados)
              </span>
            </h2>
            
            <!-- View Toggle -->
            <div class="flex items-center space-x-4">
              <div class="flex bg-gray-100 rounded-lg p-1">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  <Grid3X3 class="w-5 h-5" />
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  <List class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Products Display -->
          <div v-if="productsStore.loading" class="text-center py-12">
            <div class="spinner w-8 h-8 mx-auto mb-4"></div>
            <p class="text-gray-600">Cargando productos...</p>
          </div>

          <div v-else-if="productsStore.filteredProducts.length === 0" class="text-center py-12">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p class="text-gray-600 mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
            <button
              @click="productsStore.clearFilters"
              class="btn-primary"
            >
              Limpiar Filtros
            </button>
          </div>

          <div v-else>
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <ProductCard
                v-for="product in productsStore.filteredProducts"
                :key="product.id"
                :product="product"
                class="animate-fade-in"
              />
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <ProductListItem
                v-for="product in productsStore.filteredProducts"
                :key="product.id"
                :product="product"
                class="animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Grid3X3, List, Search } from 'lucide-vue-next'
import { useProductsStore } from '@/stores/products'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductListItem from '@/components/ProductListItem.vue'

// Stores
const productsStore = useProductsStore()

// Local state
const viewMode = ref<'grid' | 'list'>('grid')
const productsSection = ref<HTMLElement>()

// Methods
const scrollToProducts = () => {
  productsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  // Initialize any data if needed
})
</script>
