<template>
  <div class="card-hover group">
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      
      <!-- Wishlist Button -->
      <button
        @click="toggleWishlist"
        :class="[
          'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
          isInWishlist 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
        ]"
      >
        <Heart :class="['w-4 h-4', isInWishlist ? 'fill-current' : '']" />
      </button>

      <!-- Sale Badge -->
      <div
        v-if="product.originalPrice && product.originalPrice > product.price"
        class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
      >
        -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
      </div>

      <!-- Stock Badge -->
      <div
        v-if="!product.inStock"
        class="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <span class="bg-gray-900 text-white px-3 py-1 rounded-lg font-semibold">
          Agotado
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Brand -->
      <p class="text-sm text-gray-500 mb-1">{{ product.brand }}</p>
      
      <!-- Name -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        <RouterLink :to="`/product/${product.id}`">
          {{ product.name }}
        </RouterLink>
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-2">
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
          ({{ product.reviewCount }})
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-gray-900">
            ${{ product.price.toLocaleString() }}
          </span>
          <span
            v-if="product.originalPrice && product.originalPrice > product.price"
            class="text-sm text-gray-500 line-through"
          >
            ${{ product.originalPrice.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in product.tags.slice(0, 2)"
          :key="tag"
          class="badge badge-primary text-xs"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        :disabled="!product.inStock"
        :class="[
          'w-full btn transition-all duration-200',
          product.inStock
            ? 'btn-primary hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        ]"
      >
        <ShoppingCart class="w-4 h-4 mr-2" />
        {{ product.inStock ? 'Agregar al Carrito' : 'No Disponible' }}
      </button>
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
    // You could add a toast notification here
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
