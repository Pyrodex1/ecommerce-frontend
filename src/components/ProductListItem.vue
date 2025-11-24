<template>
  <div class="card-hover flex flex-col md:flex-row gap-4 p-4">
    <!-- Product Image -->
    <div class="relative w-full md:w-48 h-48 flex-shrink-0">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
      
      <!-- Sale Badge -->
      <div
        v-if="product.originalPrice && product.originalPrice > product.price"
        class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
      >
        -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex-1">
          <div class="flex items-start justify-between mb-2">
            <div>
              <p class="text-sm text-gray-500">{{ product.brand }}</p>
              <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <RouterLink :to="`/product/${product.id}`">
                  {{ product.name }}
                </RouterLink>
              </h3>
            </div>
            
            <!-- Wishlist Button -->
            <button
              @click="toggleWishlist"
              :class="[
                'p-2 rounded-full transition-all duration-200',
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
              ]"
            >
              <Heart :class="['w-5 h-5', isInWishlist ? 'fill-current' : '']" />
            </button>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">
            {{ product.description }}
          </p>

          <!-- Rating -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              <Star
                v-for="i in 5"
                :key="i"
                :class="[
                  'w-4 h-4',
                  i <= Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                ]"
              />
            </div>
            <span class="text-sm text-gray-500 ml-2">
              {{ product.rating }} ({{ product.reviewCount }} reseñas)
            </span>
          </div>

          <!-- Features -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="feature in product.features.slice(0, 3)"
              :key="feature"
              class="badge badge-primary text-xs"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <!-- Price -->
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-gray-900">
              ${{ product.price.toLocaleString() }}
            </span>
            <span
              v-if="product.originalPrice && product.originalPrice > product.price"
              class="text-sm text-gray-500 line-through"
            >
              ${{ product.originalPrice.toLocaleString() }}
            </span>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center space-x-3">
            <span
              :class="[
                'text-sm font-medium',
                product.inStock ? 'text-green-600' : 'text-red-600'
              ]"
            >
              {{ product.inStock ? `${product.stockQuantity} disponibles` : 'Agotado' }}
            </span>

            <!-- Add to Cart Button -->
            <button
              @click="addToCart"
              :disabled="!product.inStock"
              :class="[
                'btn transition-all duration-200',
                product.inStock
                  ? 'btn-primary hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <ShoppingCart class="w-4 h-4 mr-2" />
              {{ product.inStock ? 'Agregar' : 'No Disponible' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Heart, Star, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/types'

// Props
interface Props {
  product: Product
}

const props = defineProps<Props>()

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Computed
const isInWishlist = computed(() => {
  return wishlistStore.isInWishlist(props.product.id)
})

// Methods
const addToCart = () => {
  if (props.product.inStock) {
    cartStore.addToCart(props.product)
  }
}

const toggleWishlist = () => {
  wishlistStore.toggleWishlist(props.product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
