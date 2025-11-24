import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    const existingItem = items.value.find(item => 
      item.product.id === product.id &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        product,
        quantity,
        selectedSize,
        selectedColor
      })
    }
  }

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    const index = items.value.findIndex(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    )
    
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    const item = items.value.find(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    )
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId, selectedSize, selectedColor)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  const getItemQuantity = (productId: string, selectedSize?: string, selectedColor?: string): number => {
    const item = items.value.find(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    )
    return item ? item.quantity : 0
  }

  const isInCart = (productId: string, selectedSize?: string, selectedColor?: string): boolean => {
    return items.value.some(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    )
  }

  return {
    // State
    items,
    isOpen,
    
    // Getters
    totalItems,
    totalPrice,
    isEmpty,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemQuantity,
    isInCart,
  }
}, {
  persist: true // Persiste el estado en localStorage
})
