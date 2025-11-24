<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="spinner w-8 h-8 mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando producto...</p>
      </div>

      <!-- Product Not Found -->
      <div v-else-if="!product" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <RouterLink to="/" class="btn-primary">
          Volver al inicio
        </RouterLink>
      </div>

      <!-- Product Detail -->
      <div v-else>
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <RouterLink to="/" class="hover:text-primary-600">Inicio</RouterLink>
            </li>
            <li>/</li>
            <li>{{ product.category }}</li>
            <li>/</li>
            <li class="text-gray-900">{{ product.name }}</li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Images -->
          <div>
            <div class="aspect-square mb-4">
              <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectedImage = image"
                :class="[
                  'aspect-square rounded-lg overflow-hidden border-2 transition-colors',
                  selectedImage === image ? 'border-primary-600' : 'border-gray-200'
                ]"
              >
                <img
                  :src="image"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-2">{{ product.brand }}</p>
              <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
              
              <!-- Rating -->
              <div class="flex items-center mb-4">
                <div class="flex items-center">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-5 h-5',
                      i <= Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="ml-2 text-sm text-gray-600">
                  {{ product.rating }} ({{ product.reviewCount }} reseñas)
                </span>
              </div>

              <!-- Price -->
              <div class="flex items-center space-x-3 mb-6">
                <span class="text-3xl font-bold text-gray-900">
                  ${{ product.price.toLocaleString() }}
                </span>
                <span
                  v-if="product.originalPrice && product.originalPrice > product.price"
                  class="text-xl text-gray-500 line-through"
                >
                  ${{ product.originalPrice.toLocaleString() }}
                </span>
                <span
                  v-if="product.originalPrice && product.originalPrice > product.price"
                  class="badge bg-red-500 text-white"
                >
                  -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-2">Descripción</h3>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>

            <!-- Features -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-2">Características</h3>
              <ul class="space-y-1">
                <li
                  v-for="feature in product.features"
                  :key="feature"
                  class="flex items-center text-gray-600"
                >
                  <Check class="w-4 h-4 text-green-500 mr-2" />
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Stock Status -->
            <div class="mb-6">
              <div class="flex items-center space-x-2">
                <div
                  :class="[
                    'w-3 h-3 rounded-full',
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  ]"
                />
                <span
                  :class="[
                    'font-medium',
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ product.inStock ? `${product.stockQuantity} disponibles` : 'Agotado' }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
              <div class="flex space-x-4">
                <button
                  @click="addToCart"
                  :disabled="!product.inStock"
                  :class="[
                    'flex-1 btn transition-all duration-200',
                    product.inStock
                      ? 'btn-primary hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <ShoppingCart class="w-5 h-5 mr-2" />
                  {{ product.inStock ? 'Agregar al Carrito' : 'No Disponible' }}
                </button>
                
                <button
                  @click="toggleWishlist"
                  :class="[
                    'btn transition-all duration-200',
                    isInWishlist 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'btn-outline hover:bg-red-50 hover:text-red-500 hover:border-red-500'
                  ]"
                >
                  <Heart :class="['w-5 h-5', isInWishlist ? 'fill-current' : '']" />
                </button>
              </div>
            </div>

            <!-- Tags -->
            <div class="mt-6">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="badge badge-primary"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Specifications -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Especificaciones</h2>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="divide-y divide-gray-200">
              <div
                v-for="(value, key) in product.specifications"
                :key="key"
                class="px-6 py-4 flex items-center justify-between"
              >
                <span class="font-medium text-gray-900">{{ key }}</span>
                <span class="text-gray-600">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Star, Check, ShoppingCart, Heart } from 'lucide-vue-next'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/types'

// Route and stores
const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Local state
const loading = ref(true)
const product = ref<Product | null>(null)
const selectedImage = ref('')

// Computed
const isInWishlist = computed(() => {
  return product.value ? wishlistStore.isInWishlist(product.value.id) : false
})

// Methods
const loadProduct = () => {
  const productId = route.params.id as string
  const foundProduct = productsStore.getProductById(productId)
  
  if (foundProduct) {
    product.value = foundProduct
    selectedImage.value = foundProduct.image
  }
  
  loading.value = false
}

const addToCart = () => {
  if (product.value && product.value.inStock) {
    cartStore.addToCart(product.value)
    cartStore.openCart()
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value)
  }
}

// Lifecycle
onMounted(() => {
  loadProduct()
})
</script>
