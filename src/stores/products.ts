import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, Filter, SortOption } from '@/types'
import { mockProducts } from '@/data/mockData'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>(mockProducts)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const currentFilters = ref<Filter>({})
  const sortBy = ref('name')

  // Getters
  const filteredProducts = computed(() => {
    let filtered = [...products.value]

    // Search by name or description
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply filters
    if (currentFilters.value.category) {
      filtered = filtered.filter(product => 
        product.category === currentFilters.value.category
      )
    }

    if (currentFilters.value.brand) {
      filtered = filtered.filter(product => 
        product.brand === currentFilters.value.brand
      )
    }

    if (currentFilters.value.minPrice !== undefined) {
      filtered = filtered.filter(product => 
        product.price >= currentFilters.value.minPrice!
      )
    }

    if (currentFilters.value.maxPrice !== undefined) {
      filtered = filtered.filter(product => 
        product.price <= currentFilters.value.maxPrice!
      )
    }

    if (currentFilters.value.rating !== undefined) {
      filtered = filtered.filter(product => 
        product.rating >= currentFilters.value.rating!
      )
    }

    if (currentFilters.value.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    if (currentFilters.value.tags && currentFilters.value.tags.length > 0) {
      filtered = filtered.filter(product =>
        currentFilters.value.tags!.some(tag => product.tags.includes(tag))
      )
    }

    // Sort products
    switch (sortBy.value) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  })

  const categories = computed(() => {
    const categoryMap = new Map()
    products.value.forEach(product => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          name: product.category,
          count: 0
        })
      }
      categoryMap.get(product.category).count++
    })
    return Array.from(categoryMap.values())
  })

  const brands = computed(() => {
    const brandMap = new Map()
    products.value.forEach(product => {
      if (!brandMap.has(product.brand)) {
        brandMap.set(product.brand, {
          name: product.brand,
          count: 0
        })
      }
      brandMap.get(product.brand).count++
    })
    return Array.from(brandMap.values())
  })

  const priceRange = computed(() => {
    const prices = products.value.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  })

  const sortOptions = computed((): SortOption[] => [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'rating', label: 'Mejor Valorados' },
    { value: 'newest', label: 'Más Recientes' },
  ])

  // Actions
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setFilters = (filters: Filter) => {
    currentFilters.value = { ...filters }
  }

  const setSortBy = (sort: string) => {
    sortBy.value = sort
  }

  const clearFilters = () => {
    currentFilters.value = {}
    searchQuery.value = ''
  }

  const getProductById = (id: string): Product | undefined => {
    return products.value.find(product => product.id === id)
  }

  const getProductsByCategory = (category: string): Product[] => {
    return products.value.filter(product => product.category === category)
  }

  const getProductsByBrand = (brand: string): Product[] => {
    return products.value.filter(product => product.brand === brand)
  }

  return {
    // State
    products,
    loading,
    error,
    searchQuery,
    currentFilters,
    sortBy,
    
    // Getters
    filteredProducts,
    categories,
    brands,
    priceRange,
    sortOptions,
    
    // Actions
    setSearchQuery,
    setFilters,
    setSortBy,
    clearFilters,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
  }
})
