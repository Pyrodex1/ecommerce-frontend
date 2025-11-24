<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Lista de Deseos</h1>

      <!-- Empty Wishlist -->
      <div v-if="wishlistStore.isEmpty" class="text-center py-16">
        <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart class="w-16 h-16 text-gray-400" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tu lista de deseos está vacía</h2>
        <p class="text-gray-600 mb-8">Guarda tus productos favoritos para encontrarlos fácilmente más tarde.</p>
        <RouterLink to="/" class="btn-primary">
          Explorar Productos
        </RouterLink>
      </div>

      <!-- Wishlist Items -->
      <div v-else>
        <div class="flex items-center justify-between mb-6">
          <p class="text-gray-600">
            {{ wishlistStore.totalItems }} {{ wishlistStore.totalItems === 1 ? 'producto' : 'productos' }} en tu lista
          </p>
          <button
            @click="clearWishlist"
            class="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Limpiar Lista
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in wishlistStore.items"
            :key="item.product.id"
            class="card-hover group relative"
          >
            <!-- Remove Button -->
            <button
              @click="removeFromWishlist(item.product.id)"
              class="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200"
            >
              <X class="w-4 h-4" />
            </button>

            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              <!-- Sale Badge -->
              <div
                v-if="item.product.originalPrice && item.product.originalPrice > item.product.price"
                class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
              >
                -{{ Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100) }}%
              </div>

              <!-- Stock Badge -->
              <div
                v-if="!item.product.inStock"
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
              <p class="text-sm text-gray-500 mb-1">{{ item.product.brand }}</p>
              
              <!-- Name -->
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                <RouterLink :to="`/product/${item.product.id}`">
                  {{ item.product.name }}
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
                      i <= Math.floor(item.product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="text-sm text-gray-500 ml-2">
                  ({{ item.product.reviewCount }})
                </span>
              </div>

              <!-- Price -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-bold text-gray-900">
                    ${{ item.product.price.toLocaleString() }}
                  </span>
                  <span
                    v-if="item.product.originalPrice && item.product.originalPrice > item.product.price"
                    class="text-sm text-gray-500 line-through"
                  >
                    ${{ item.product.originalPrice.toLocaleString() }}
                  </span>
                </div>
              </div>

              <!-- Added Date -->
              <p class="text-xs text-gray-400 mb-3">
                Agregado {{ formatDate(item.addedAt) }}
              </p>

              <!-- Add to Cart Button -->
              <button
                @click="addToCart(item.product)"
                :disabled="!item.product.inStock"
                :class="[
                  'w-full btn transition-all duration-200',
                  item.product.inStock
                    ? 'btn-primary hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <ShoppingCart class="w-4 h-4 mr-2" />
                {{ item.product.inStock ? 'Agregar al Carrito' : 'No Disponible' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Heart, X, Star, ShoppingCart } from 'lucide-vue-next'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

// Stores
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

// Methods
const addToCart = (product: Product) => {
  if (product.inStock) {
    cartStore.addToCart(product)
    cartStore.openCart()
  }
}

const removeFromWishlist = (productId: string) => {
  wishlistStore.removeFromWishlist(productId)
}

const clearWishlist = () => {
  if (confirm('¿Estás seguro de que quieres limpiar tu lista de deseos?')) {
    wishlistStore.clearWishlist()
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return 'hace 1 día'
  } else if (diffDays < 7) {
    return `hace ${diffDays} días`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  } else {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
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
