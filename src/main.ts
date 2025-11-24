import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import views
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'
import Cart from './views/Cart.vue'
import Wishlist from './views/Wishlist.vue'

// Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
    }
  ]
})

// Create Pinia store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create and mount app
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
