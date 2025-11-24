<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-amber-600 rounded-lg flex items-center justify-center">
            <ShoppingBag class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold gradient-text">ShopVue</span>
        </RouterLink>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Buscar productos..."
              class="input pl-10 pr-4 w-full"
            />
          </div>
        </div>

        <!-- Navigation Actions -->
        <div class="flex items-center space-x-4">
          <!-- Wishlist -->
          <RouterLink
            to="/wishlist"
            class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Heart class="w-6 h-6" />
            <span
              v-if="wishlistStore.totalItems > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ wishlistStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Cart -->
          <button
            @click="cartStore.toggleCart"
            class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart class="w-6 h-6" />
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Menu Button (Mobile) -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="showMobileMenu"
        class="md:hidden py-4 border-t border-gray-200 animate-slide-up"
      >
        <nav class="space-y-2">
          <RouterLink
            to="/"
            class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            Inicio
          </RouterLink>
          <RouterLink
            to="/wishlist"
            class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            Lista de Deseos ({{ wishlistStore.totalItems }})
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingBag, Search, Heart, ShoppingCart, Menu } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductsStore } from '@/stores/products'

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()

// Local state
const searchQuery = ref('')
const showMobileMenu = ref(false)

// Methods
const handleSearch = () => {
  productsStore.setSearchQuery(searchQuery.value)
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Watch for route changes to close mobile menu
watch(() => showMobileMenu.value, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
