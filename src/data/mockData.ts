import type { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y diseño de titanio premium.',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'
    ],
    category: 'Smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    stockQuantity: 25,
    tags: ['premium', 'flagship', 'camera', 'gaming'],
    features: ['Chip A17 Pro', 'Cámara 48MP', 'Titanio', 'USB-C', '5G'],
    specifications: {
      'Pantalla': '6.1" Super Retina XDR',
      'Procesador': 'A17 Pro',
      'Memoria': '128GB',
      'Cámara': '48MP + 12MP + 12MP',
      'Batería': 'Hasta 23 horas de video'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone premium con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500'
    ],
    category: 'Smartphones',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 1923,
    inStock: true,
    stockQuantity: 18,
    tags: ['premium', 'stylus', 'camera', 'productivity'],
    features: ['S Pen', 'Cámara 200MP', 'AI Photography', 'DeX Mode', '5G'],
    specifications: {
      'Pantalla': '6.8" Dynamic AMOLED 2X',
      'Procesador': 'Snapdragon 8 Gen 3',
      'Memoria': '256GB',
      'Cámara': '200MP + 50MP + 12MP + 10MP',
      'Batería': '5000mAh'
    },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z'
  },
  {
    id: '3',
    name: 'MacBook Pro 14"',
    description: 'Laptop profesional con chip M3 Pro, pantalla Liquid Retina XDR y hasta 18 horas de batería.',
    price: 1999,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'
    ],
    category: 'Laptops',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 1456,
    inStock: true,
    stockQuantity: 12,
    tags: ['professional', 'creative', 'performance', 'portable'],
    features: ['Chip M3 Pro', 'Liquid Retina XDR', 'Magic Keyboard', 'Touch ID', 'Thunderbolt 4'],
    specifications: {
      'Pantalla': '14.2" Liquid Retina XDR',
      'Procesador': 'Apple M3 Pro',
      'Memoria': '512GB SSD',
      'RAM': '18GB',
      'Batería': 'Hasta 18 horas'
    },
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria y sonido Hi-Res.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: 'Audio',
    brand: 'Sony',
    rating: 4.6,
    reviewCount: 3241,
    inStock: true,
    stockQuantity: 45,
    tags: ['wireless', 'noise-cancelling', 'premium', 'travel'],
    features: ['Cancelación de ruido', 'Hi-Res Audio', '30h batería', 'Carga rápida', 'Multipoint'],
    specifications: {
      'Tipo': 'Over-ear inalámbricos',
      'Conectividad': 'Bluetooth 5.2',
      'Batería': '30 horas',
      'Carga': 'USB-C',
      'Peso': '250g'
    },
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description: 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil.',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500'
    ],
    category: 'Tablets',
    brand: 'Apple',
    rating: 4.7,
    reviewCount: 987,
    inStock: true,
    stockQuantity: 22,
    tags: ['creative', 'professional', 'portable', 'drawing'],
    features: ['Chip M2', 'Apple Pencil', 'Magic Keyboard', 'Face ID', 'Thunderbolt'],
    specifications: {
      'Pantalla': '12.9" Liquid Retina XDR',
      'Procesador': 'Apple M2',
      'Memoria': '128GB',
      'Cámara': '12MP + 10MP',
      'Conectividad': 'Wi-Fi 6E + 5G'
    },
    createdAt: '2024-01-12T13:20:00Z',
    updatedAt: '2024-01-21T10:30:00Z'
  },
  {
    id: '6',
    name: 'Dell XPS 13',
    description: 'Ultrabook premium con procesador Intel Core i7, pantalla InfinityEdge y diseño ultradelgado.',
    price: 1299,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'
    ],
    category: 'Laptops',
    brand: 'Dell',
    rating: 4.5,
    reviewCount: 756,
    inStock: true,
    stockQuantity: 15,
    tags: ['ultrabook', 'portable', 'business', 'premium'],
    features: ['Intel Core i7', 'InfinityEdge', 'Thunderbolt 4', 'Wi-Fi 6E', 'Iris Xe'],
    specifications: {
      'Pantalla': '13.4" FHD+ InfinityEdge',
      'Procesador': 'Intel Core i7-1360P',
      'Memoria': '512GB SSD',
      'RAM': '16GB LPDDR5',
      'Peso': '1.24kg'
    },
    createdAt: '2024-01-07T09:45:00Z',
    updatedAt: '2024-01-20T14:20:00Z'
  },
  {
    id: '7',
    name: 'AirPods Pro 2',
    description: 'Auriculares inalámbricos con cancelación activa de ruido, audio espacial y estuche MagSafe.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500'
    ],
    category: 'Audio',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 4521,
    inStock: true,
    stockQuantity: 67,
    tags: ['wireless', 'compact', 'premium', 'fitness'],
    features: ['Cancelación activa', 'Audio espacial', 'MagSafe', 'Resistente al agua', 'Siri'],
    specifications: {
      'Tipo': 'In-ear inalámbricos',
      'Conectividad': 'Bluetooth 5.3',
      'Batería': '6h + 24h estuche',
      'Carga': 'Lightning + MagSafe',
      'Resistencia': 'IPX4'
    },
    createdAt: '2024-01-14T16:10:00Z',
    updatedAt: '2024-01-23T11:55:00Z'
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    description: 'Consola híbrida con pantalla OLED de 7", audio mejorado y 64GB de almacenamiento interno.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      
    ],
    category: 'Gaming',
    brand: 'Nintendo',
    rating: 4.6,
    reviewCount: 2134,
    inStock: true,
    stockQuantity: 33,
    tags: ['gaming', 'portable', 'family', 'exclusive'],
    features: ['Pantalla OLED 7"', 'Modo portátil/TV', 'Joy-Con', 'Nintendo eShop', 'Multijugador'],
    specifications: {
      'Pantalla': '7" OLED multitáctil',
      'Resolución': '1280x720 (portátil), 1920x1080 (TV)',
      'Almacenamiento': '64GB interno',
      'Batería': '4.5-9 horas',
      'Conectividad': 'Wi-Fi, Bluetooth'
    },
    createdAt: '2024-01-09T12:00:00Z',
    updatedAt: '2024-01-17T08:30:00Z'
  },
  {
    id: '9',
    name: 'Samsung 4K Smart TV 55"',
    description: 'Smart TV QLED 4K con tecnología Quantum Dot, HDR10+ y sistema operativo Tizen.',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500'
    ],
    category: 'TV & Home',
    brand: 'Samsung',
    rating: 4.4,
    reviewCount: 1678,
    inStock: true,
    stockQuantity: 8,
    tags: ['smart-tv', '4k', 'streaming', 'home-theater'],
    features: ['QLED 4K', 'HDR10+', 'Tizen OS', 'Alexa Built-in', 'Gaming Hub'],
    specifications: {
      'Tamaño': '55 pulgadas',
      'Resolución': '4K UHD (3840x2160)',
      'Tecnología': 'QLED Quantum Dot',
      'Smart TV': 'Tizen OS',
      'Conectividad': '4x HDMI, 2x USB, Wi-Fi'
    },
    createdAt: '2024-01-06T15:30:00Z',
    updatedAt: '2024-01-19T13:45:00Z'
  },
  {
    id: '10',
    name: 'Canon EOS R6 Mark II',
    description: 'Cámara mirrorless full-frame con sensor de 24.2MP, estabilización de 8 pasos y video 4K.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500'
    ],
    category: 'Cameras',
    brand: 'Canon',
    rating: 4.9,
    reviewCount: 432,
    inStock: true,
    stockQuantity: 6,
    tags: ['professional', 'photography', 'video', 'full-frame'],
    features: ['Sensor 24.2MP', 'IBIS 8 pasos', 'Video 4K 60p', 'Dual Pixel AF', 'Wi-Fi'],
    specifications: {
      'Sensor': '24.2MP Full-Frame CMOS',
      'Estabilización': 'In-Body 8 pasos',
      'Video': '4K 60p, Full HD 180p',
      'Enfoque': 'Dual Pixel CMOS AF II',
      'Conectividad': 'Wi-Fi, Bluetooth, USB-C'
    },
    createdAt: '2024-01-03T10:15:00Z',
    updatedAt: '2024-01-16T17:20:00Z'
  },
  {
    id: '11',
    name: 'Logitech MX Master 3S',
    description: 'Ratón inalámbrico premium para productividad con sensor de 8000 DPI y batería de 70 días.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
    ],
    category: 'Accessories',
    brand: 'Logitech',
    rating: 4.7,
    reviewCount: 2876,
    inStock: true,
    stockQuantity: 89,
    tags: ['productivity', 'wireless', 'ergonomic', 'professional'],
    features: ['Sensor 8000 DPI', 'MagSpeed scroll', 'Multi-device', 'USB-C', '70 días batería'],
    specifications: {
      'Sensor': 'Darkfield 8000 DPI',
      'Conectividad': 'Bluetooth, USB Receiver',
      'Batería': 'Hasta 70 días',
      'Compatibilidad': 'Windows, macOS, Linux',
      'Dimensiones': '124.9 x 84.3 x 51mm'
    },
    createdAt: '2024-01-11T14:45:00Z',
    updatedAt: '2024-01-22T16:10:00Z'
  },
  {
    id: '12',
    name: 'Mechanical Gaming Keyboard',
    description: 'Teclado mecánico RGB con switches Cherry MX, teclas programables y construcción de aluminio.',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
    ],
    category: 'Accessories',
    brand: 'Corsair',
    rating: 4.5,
    reviewCount: 1543,
    inStock: true,
    stockQuantity: 34,
    tags: ['gaming', 'mechanical', 'rgb', 'programmable'],
    features: ['Cherry MX switches', 'RGB per-key', 'Aluminio', 'Teclas programables', 'USB passthrough'],
    specifications: {
      'Switches': 'Cherry MX Red/Blue/Brown',
      'Iluminación': 'RGB per-key',
      'Conectividad': 'USB 3.0',
      'Construcción': 'Marco de aluminio',
      'Teclas': '104 teclas + multimedia'
    },
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-21T09:40:00Z'
  }
]
