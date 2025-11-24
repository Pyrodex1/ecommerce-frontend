# 🛒 Vue.js E-commerce Catalog

Una aplicación moderna de catálogo e-commerce construida con **Vue.js 3**, **Pinia**, **TypeScript** y **Tailwind CSS**, que demuestra gestión de estado avanzada y experiencia de usuario excepcional.

## ✨ Características

- **Vue.js 3** - Composition API y reactividad moderna
- **Pinia** - Gestión de estado con TypeScript
- **TypeScript** - Tipado estático completo
- **Tailwind CSS** - Diseño moderno y responsive
- **Vue Router** - Navegación SPA fluida
- **Carrito de Compras** - Gestión completa con persistencia
- **Lista de Deseos** - Favoritos con localStorage
- **Filtros Avanzados** - Búsqueda y filtrado en tiempo real
- **Responsive Design** - Funciona en todos los dispositivos

## 🛠️ Tecnologías

- **Vue.js 3** - Framework progresivo de JavaScript
- **Composition API** - Lógica reutilizable y tipada
- **Pinia** - Store pattern moderno para Vue
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **Vite** - Build tool rápido y moderno
- **Lucide Vue** - Iconos modernos y consistentes

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

3. **Construir para producción**
   ```bash
   npm run build
   ```

4. **Vista previa de producción**
   ```bash
   npm run preview
   ```

## 📱 Funcionalidades

### Catálogo de Productos
- 🔍 **Búsqueda avanzada** - Busca por nombre, marca, descripción o tags
- 🏷️ **Filtros múltiples** - Por categoría, marca, precio, rating y disponibilidad
- 📊 **Ordenamiento** - Por nombre, precio, rating y fecha
- 👁️ **Vistas múltiples** - Grid y lista adaptables
- ⭐ **Sistema de ratings** - Valoraciones y reseñas

### Carrito de Compras
- 🛒 **Gestión completa** - Agregar, quitar, modificar cantidades
- 💾 **Persistencia** - Mantiene el carrito entre sesiones
- 💰 **Cálculos automáticos** - Total, subtotales y contadores
- 🎨 **Sidebar deslizante** - Acceso rápido desde cualquier página
- 📱 **Responsive** - Optimizado para móviles

### Lista de Deseos
- ❤️ **Favoritos** - Guarda productos para después
- 🔄 **Toggle rápido** - Agregar/quitar con un click
- 📊 **Contador visual** - Badge con número de items
- 💾 **Persistencia** - Mantiene favoritos entre sesiones

### Experiencia de Usuario
- ⚡ **Carga rápida** - Vite para desarrollo y build optimizado
- 🎭 **Animaciones suaves** - Transiciones CSS personalizadas
- 📱 **Mobile-first** - Diseño responsive desde móvil
- 🎨 **UI moderna** - Glass morphism y gradientes
- ♿ **Accesible** - Navegación por teclado y screen readers

## 🏗️ Arquitectura

### Estructura del Proyecto
```
vue-ecommerce-catalog/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── NavHeader.vue   # Navegación principal
│   │   ├── ProductCard.vue # Tarjeta de producto
│   │   ├── ProductFilters.vue # Filtros de búsqueda
│   │   ├── CartSidebar.vue # Sidebar del carrito
│   │   └── AppFooter.vue   # Footer de la app
│   ├── views/              # Páginas principales
│   │   ├── Home.vue        # Página principal
│   │   ├── ProductDetail.vue # Detalle de producto
│   │   ├── Cart.vue        # Página del carrito
│   │   └── Wishlist.vue    # Lista de deseos
│   ├── stores/             # Gestión de estado Pinia
│   │   ├── products.ts     # Store de productos
│   │   ├── cart.ts         # Store del carrito
│   │   └── wishlist.ts     # Store de favoritos
│   ├── types/              # Definiciones TypeScript
│   │   └── index.ts        # Interfaces principales
│   ├── data/               # Datos simulados
│   │   └── mockData.ts     # Productos de ejemplo
│   ├── App.vue             # Componente raíz
│   ├── main.ts             # Punto de entrada
│   └── style.css           # Estilos globales
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json           # Configuración de TypeScript
```

### Características Técnicas

#### Gestión de Estado con Pinia
- **Stores modulares** - Separación clara de responsabilidades
- **TypeScript nativo** - Tipado automático sin configuración
- **Persistencia** - localStorage para carrito y wishlist
- **Reactividad** - Actualizaciones automáticas en toda la app

#### Composition API
- **Lógica reutilizable** - Composables para funcionalidad común
- **Mejor organización** - Agrupación lógica por funcionalidad
- **TypeScript friendly** - Inferencia de tipos automática
- **Performance** - Optimizaciones automáticas de reactividad

#### Responsive Design
- **Mobile-first** - Diseño desde móvil hacia desktop
- **Breakpoints** - sm, md, lg, xl para diferentes pantallas
- **Grid adaptativo** - 1-4 columnas según el dispositivo
- **Touch-friendly** - Botones y áreas de toque optimizadas

## 🎨 Diseño

### Paleta de Colores
- **Primario**: Azul (primary-600: #2563eb)
- **Acento**: Ámbar (accent-600: #d97706)
- **Grises**: Escala completa para texto y fondos
- **Estados**: Verde (éxito), Rojo (error), Amarillo (advertencia)

### Componentes de UI
- **Botones**: Variantes primary, secondary, outline, ghost
- **Tarjetas**: Hover effects y sombras suaves
- **Badges**: Colores semánticos para tags y estados
- **Inputs**: Focus states y validación visual

### Animaciones
- **Fade in** - Aparición suave de elementos
- **Slide up** - Deslizamiento desde abajo
- **Bounce in** - Efecto de rebote para acciones
- **Hover effects** - Transformaciones en tarjetas

## 📊 Datos y Tipos

### Modelo de Producto
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
}
```

### Gestión del Carrito
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
```

### Sistema de Filtros
```typescript
interface Filter {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  tags?: string[];
}
```

## 📊 Demostración de Habilidades

Este proyecto demuestra:

- ✅ **Vue.js 3** con Composition API
- ✅ **Pinia** para gestión de estado moderna
- ✅ **TypeScript** avanzado con interfaces
- ✅ **Tailwind CSS** con diseño responsive
- ✅ **Vue Router** para navegación SPA
- ✅ **Persistencia de datos** con localStorage
- ✅ **Filtros y búsqueda** en tiempo real
- ✅ **UX/UI moderna** y accesible
- ✅ **Performance** optimizada
- ✅ **Arquitectura escalable** y mantenible

## 🌟 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Checkout y pagos
- [ ] Reseñas y comentarios
- [ ] Comparación de productos
- [ ] Historial de compras
- [ ] Notificaciones push
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Integración con APIs reales

## 🔗 Enlaces Útiles

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

**Desarrollado con ❤️ por pyrodex*
