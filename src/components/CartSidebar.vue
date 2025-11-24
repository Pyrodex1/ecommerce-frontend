<template>
  <!-- Overlay -->
  <div
    v-if="cartStore.isOpen"
    @click="cartStore.closeCart"
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
  />

  <!-- Sidebar -->
  <div
    :class="[
      'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300',
      cartStore.isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">
        Carrito de Compras
        <span v-if="cartStore.totalItems > 0" class="text-sm font-normal text-gray-500">
          ({{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'items' }})
        </span>
      </h2>
      <button
        @click="cartStore.closeCart"
        class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Cart Content -->
    <div class="flex flex-col" style="height: calc(100% - 80px);">
      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" class="flex-1 flex items-center justify-center p-8">
        <div class="text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
          <p class="text-gray-600 mb-4">Agrega algunos productos para comenzar</p>
          <button
            @click="cartStore.closeCart"
            class="btn-primary"
          >
            Continuar Comprando
          </button>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-else class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="p-4 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
            class="flex gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <!-- Product Image -->
            <div class="w-16 h-16 flex-shrink-0">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 text-sm line-clamp-2">
                {{ item.product.name }}
              </h4>
              <p class="text-xs text-gray-500">{{ item.product.brand }}</p>
              
              <!-- Variants -->
              <div v-if="item.selectedSize || item.selectedColor" class="text-xs text-gray-500 mt-1">
                <span v-if="item.selectedSize">Talla: {{ item.selectedSize }}</span>
                <span v-if="item.selectedColor" class="ml-2">Color: {{ item.selectedColor }}</span>
              </div>

              <!-- Price and Quantity -->
              <div class="flex items-center justify-between mt-2">
                <span class="font-semibold text-gray-900">
                  ${{ (item.product.price * item.quantity).toLocaleString() }}
                </span>
                
                <!-- Quantity Controls -->
                <div class="flex items-center space-x-2">
                  <button
                    @click="decreaseQuantity(item)"
                    class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item)"
                    class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeItem(item)"
              class="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="!cartStore.isEmpty" class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-4">
        <!-- Total -->
        <div class="flex items-center justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${{ cartStore.totalPrice.toLocaleString() }}</span>
        </div>

        <!-- Actions -->
        <div class="space-y-2">
          <RouterLink
            to="/cart"
            @click="cartStore.closeCart"
            class="btn btn-outline w-full"
          >
            Ver Carrito Completo
          </RouterLink>
          <button class="btn-primary w-full">
            Proceder al Checkout
          </button>
        </div>

        <!-- Clear Cart -->
        <button
          @click="clearCart"
          class="text-sm text-gray-500 hover:text-red-500 transition-colors w-full"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/types'

// Store
const cartStore = useCartStore()

// Methods
const increaseQuantity = (item: CartItem) => {
  cartStore.updateQuantity(
    item.product.id,
    item.quantity + 1,
    item.selectedSize,
    item.selectedColor
  )
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(
      item.product.id,
      item.quantity - 1,
      item.selectedSize,
      item.selectedColor
    )
  } else {
    removeItem(item)
  }
}

const removeItem = (item: CartItem) => {
  cartStore.removeFromCart(
    item.product.id,
    item.selectedSize,
    item.selectedColor
  )
}

const clearCart = () => {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    cartStore.clearCart()
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
