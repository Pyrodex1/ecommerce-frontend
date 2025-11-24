<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <NavHeader />
    
    <!-- Main Content -->
    <main class="pb-16">
      <RouterView />
    </main>
    
    <!-- Cart Sidebar -->
    <CartSidebar />
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavHeader from './components/NavHeader.vue'
import CartSidebar from './components/CartSidebar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
