import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WishlistItem, Product } from '@/types'

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref<WishlistItem[]>([])

  // Getters
  const totalItems = computed(() => items.value.length)
  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addToWishlist = (product: Product) => {
    const exists = items.value.some(item => item.product.id === product.id)
    
    if (!exists) {
      items.value.push({
        product,
        addedAt: new Date().toISOString()
      })
    }
  }

  const removeFromWishlist = (productId: string) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
  }

  const isInWishlist = (productId: string): boolean => {
    return items.value.some(item => item.product.id === productId)
  }

  const getWishlistProducts = (): Product[] => {
    return items.value.map(item => item.product)
  }

  return {
    // State
    items,
    
    // Getters
    totalItems,
    isEmpty,
    
    // Actions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistProducts,
  }
}, {
  persist: true // Persiste el estado en localStorage
})
