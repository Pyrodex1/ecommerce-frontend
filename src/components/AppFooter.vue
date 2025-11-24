<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
              <ShoppingBag class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold">ShopVue</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            Tu tienda online de confianza para los mejores productos tecnológicos. 
            Calidad garantizada y precios increíbles.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Github class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-gray-300 hover:text-white transition-colors">
                Inicio
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/wishlist" class="text-gray-300 hover:text-white transition-colors">
                Lista de Deseos
              </RouterLink>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Ofertas
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="font-semibold mb-4">Categorías</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Smartphones
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Laptops
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Audio
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Gaming
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p class="text-gray-400 text-sm">
          © 2024 ShopVue. Desarrollado con Vue.js, Pinia y TypeScript.
        </p>
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
            Términos de Servicio
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
            Política de Privacidad
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShoppingBag, Github, Twitter, Instagram } from 'lucide-vue-next'
</script>
