<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

      <!-- Empty Cart -->
      <div v-if="cartStore.isEmpty" class="text-center py-16">
        <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart class="w-16 h-16 text-gray-400" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tu carrito está vacío</h2>
        <p class="text-gray-600 mb-8">Parece que no has agregado nada a tu carrito todavía.</p>
        <RouterLink to="/" class="btn-primary">
          Continuar Comprando
        </RouterLink>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
            class="card p-6"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="w-24 h-24 flex-shrink-0">
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      <RouterLink
                        :to="`/product/${item.product.id}`"
                        class="hover:text-primary-600 transition-colors"
                      >
                        {{ item.product.name }}
                      </RouterLink>
                    </h3>
                    <p class="text-sm text-gray-500">{{ item.product.brand }}</p>
                    
                    <!-- Variants -->
                    <div v-if="item.selectedSize || item.selectedColor" class="text-sm text-gray-500 mt-1">
                      <span v-if="item.selectedSize">Talla: {{ item.selectedSize }}</span>
                      <span v-if="item.selectedColor" class="ml-2">Color: {{ item.selectedColor }}</span>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeItem(item)"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>

                <!-- Price and Quantity -->
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center space-x-4">
                    <!-- Quantity Controls -->
                    <div class="flex items-center space-x-3">
                      <button
                        @click="decreaseQuantity(item)"
                        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus class="w-4 h-4" />
                      </button>
                      <span class="font-medium w-8 text-center">{{ item.quantity }}</span>
                      <button
                        @click="increaseQuantity(item)"
                        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Plus class="w-4 h-4" />
                      </button>
                    </div>

                    <!-- Unit Price -->
                    <span class="text-sm text-gray-500">
                      ${{ item.product.price.toLocaleString() }} c/u
                    </span>
                  </div>

                  <!-- Total Price -->
                  <span class="text-lg font-semibold text-gray-900">
                    ${{ (item.product.price * item.quantity).toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal ({{ cartStore.totalItems }} items)</span>
                <span class="font-medium">${{ cartStore.totalPrice.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Envío</span>
                <span class="font-medium text-green-600">Gratis</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Impuestos</span>
                <span class="font-medium">${{ Math.round(cartStore.totalPrice * 0.16).toLocaleString() }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${{ Math.round(cartStore.totalPrice * 1.16).toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <button class="btn-primary w-full">
                Proceder al Checkout
              </button>
              <RouterLink to="/" class="btn-outline w-full">
                Continuar Comprando
              </RouterLink>
            </div>

            <!-- Clear Cart -->
            <button
              @click="clearCart"
              class="text-sm text-gray-500 hover:text-red-500 transition-colors w-full mt-4"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-vue-next'
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
