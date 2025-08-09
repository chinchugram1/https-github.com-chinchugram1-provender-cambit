"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Minus, Gift, ChevronRight } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  brand: string
  unit: string
  unitAbbreviation: string
  image: string
  originalPrice?: number
  discount?: number
  promoText?: string
}

interface CartItem extends Product {
  quantity: number
}

const mockProducts: Product[] = [
  // Bebidas
  {
    id: "1",
    name: "Coca Cola 500ml",
    price: 405,
    originalPrice: 450,
    discount: 10,
    promoText: "¡10% OFF!",
    stock: 24,
    category: "Bebidas",
    brand: "Coca Cola",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Coca+500ml",
  },
  {
    id: "2",
    name: "Coca Cola 1.5L",
    price: 765,
    originalPrice: 850,
    discount: 10,
    promoText: "¡10% OFF!",
    stock: 18,
    category: "Bebidas",
    brand: "Coca Cola",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Coca+1.5L",
  },
  {
    id: "3",
    name: "Coca Cola 2.25L",
    price: 1080,
    originalPrice: 1200,
    discount: 10,
    promoText: "¡10% OFF!",
    stock: 12,
    category: "Bebidas",
    brand: "Coca Cola",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Coca+2.25L",
  },
  {
    id: "4",
    name: "Sprite 500ml",
    price: 420,
    stock: 30,
    category: "Bebidas",
    brand: "Sprite",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Sprite+500ml",
  },
  {
    id: "5",
    name: "Fanta 500ml",
    price: 420,
    stock: 25,
    category: "Bebidas",
    brand: "Fanta",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Fanta+500ml",
  },
  // Golosinas
  {
    id: "6",
    name: "Alfajor Havanna",
    price: 256,
    originalPrice: 320,
    discount: 20,
    promoText: "¡20% OFF!",
    stock: 36,
    category: "Golosinas",
    brand: "Havanna",
    unit: "pack",
    unitAbbreviation: "pk",
    image: "/placeholder.svg?height=120&width=120&text=Alfajor+Havanna",
  },
  {
    id: "7",
    name: "Chocolate Milka",
    price: 680,
    stock: 15,
    category: "Golosinas",
    brand: "Milka",
    unit: "unidades",
    unitAbbreviation: "un",
    image: "/placeholder.svg?height=120&width=120&text=Chocolate+Milka",
  },
  {
    id: "8",
    name: "Caramelos Sugus",
    price: 180,
    stock: 40,
    category: "Golosinas",
    brand: "Sugus",
    unit: "pack",
    unitAbbreviation: "pk",
    image: "/placeholder.svg?height=120&width=120&text=Caramelos+Sugus",
  },
  // Snacks
  {
    id: "9",
    name: "Papas Lays Original",
    price: 380,
    stock: 20,
    category: "Snacks",
    brand: "Lays",
    unit: "pack",
    unitAbbreviation: "pk",
    image: "/placeholder.svg?height=120&width=120&text=Papas+Lays",
  },
  {
    id: "10",
    name: "Doritos Nacho",
    price: 420,
    stock: 18,
    category: "Snacks",
    brand: "Doritos",
    unit: "pack",
    unitAbbreviation: "pk",
    image: "/placeholder.svg?height=120&width=120&text=Doritos+Nacho",
  },
  // Lácteos
  {
    id: "11",
    name: "Leche La Serenísima 1L",
    price: 350,
    stock: 25,
    category: "Lácteos",
    brand: "La Serenísima",
    unit: "litros",
    unitAbbreviation: "lt",
    image: "/placeholder.svg?height=120&width=120&text=Leche+1L",
  },
  {
    id: "12",
    name: "Yogur Ser 1L",
    price: 480,
    stock: 20,
    category: "Lácteos",
    brand: "Ser",
    unit: "litros",
    unitAbbreviation: "lt",
    image: "/placeholder.svg?height=120&width=120&text=Yogur+Ser",
  },
]

export default function NuevoPedidoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [cart, setCart] = useState<CartItem[]>([])

  const categories = ["Todos", "Bebidas", "Golosinas", "Snacks", "Lácteos"]

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("clienteCart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Guardar carrito en localStorage y notificar cambios
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem("clienteCart", JSON.stringify(newCart))
    // Disparar evento para actualizar el header
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const productsByCategory = categories.slice(1).reduce(
    (acc, category) => {
      acc[category] = filteredProducts.filter((product) => product.category === category)
      return acc
    },
    {} as Record<string, Product[]>,
  )

  const addToCart = (product: Product) => {
    const newCart = [...cart]
    const existingItem = newCart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      newCart.push({ ...product, quantity: 1 })
    }

    updateCart(newCart)
  }

  const removeFromCart = (productId: string) => {
    const newCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
      .filter((item) => item.quantity > 0)

    updateCart(newCart)
  }

  const getCartQuantity = (productId: string) => {
    const item = cart.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-32 object-cover" />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        {product.promoText && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Gift className="w-3 h-3 inline mr-1" />
            PROMO
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-2">{product.brand}</p>

        <div className="mb-3">
          {product.originalPrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              <span className="text-lg font-bold text-provender-primary">${product.price}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-provender-primary">${product.price}</span>
          )}
          <p className="text-xs text-gray-500">por {product.unitAbbreviation}</p>
        </div>

        {product.promoText && (
          <div className="mb-3 p-2 bg-orange-50 rounded-lg">
            <p className="text-xs text-orange-700 font-medium">{product.promoText}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          {getCartQuantity(product.id) > 0 ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{getCartQuantity(product.id)}</span>
              <button
                onClick={() => addToCart(product)}
                className="w-8 h-8 rounded-full bg-provender-primary text-white flex items-center justify-center hover:bg-provender-accent transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-provender-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-provender-accent transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-16 z-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Pedido</h1>
            <p className="text-sm text-gray-600">Paso 1: Selecciona tus productos</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Productos en carrito</p>
            <p className="text-2xl font-bold text-provender-primary">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="flex space-x-2 overflow-x-auto pb-2 px-4 py-4 bg-gray-50 sticky top-44 z-30">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm ${
              selectedCategory === category
                ? "bg-provender-primary text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-provender-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {selectedCategory === "Todos" ? (
          // Vista por categorías
          <div className="space-y-6">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="text-provender-primary text-sm font-medium flex items-center"
                  >
                    Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vista de categoría específica
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedCategory}</h2>
              <button
                onClick={() => setSelectedCategory("Todos")}
                className="text-provender-primary text-sm font-medium"
              >
                ← Volver a todas
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
