"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Brain,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  Crown,
  Zap,
  TrendingUp,
  Users,
  Percent,
  Package,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SuggestedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  reason: string
  confidence: number
  category: string
  brand: string
  unit: string
  selected: boolean
  reasonType: "history" | "trending" | "promotion" | "missing"
}

const mockSuggestedProducts: SuggestedProduct[] = [
  {
    id: "1",
    name: "Coca Cola 500ml",
    price: 405,
    originalPrice: 450,
    quantity: 6,
    reason: "Pedís cada 3 días en promedio",
    confidence: 95,
    category: "Bebidas",
    brand: "Coca Cola",
    unit: "unidades",
    selected: true,
    reasonType: "history",
  },
  {
    id: "6",
    name: "Alfajor Havanna",
    price: 256,
    originalPrice: 320,
    quantity: 12,
    reason: "20% OFF + clientes similares lo compran",
    confidence: 87,
    category: "Golosinas",
    brand: "Havanna",
    unit: "pack",
    selected: true,
    reasonType: "promotion",
  },
  {
    id: "9",
    name: "Papas Lays Original",
    price: 380,
    quantity: 4,
    reason: "Falta en tu último pedido habitual",
    confidence: 78,
    category: "Snacks",
    brand: "Lays",
    unit: "pack",
    selected: true,
    reasonType: "missing",
  },
  {
    id: "11",
    name: "Leche La Serenísima 1L",
    price: 350,
    quantity: 8,
    reason: "Tendencia en tu zona + sobrestock",
    confidence: 82,
    category: "Lácteos",
    brand: "La Serenísima",
    unit: "litros",
    selected: true,
    reasonType: "trending",
  },
  {
    id: "4",
    name: "Sprite 500ml",
    price: 420,
    quantity: 3,
    reason: "Complementa tus bebidas habituales",
    confidence: 65,
    category: "Bebidas",
    brand: "Sprite",
    unit: "unidades",
    selected: false,
    reasonType: "trending",
  },
  {
    id: "7",
    name: "Chocolate Milka",
    price: 680,
    quantity: 2,
    reason: "Promoción especial esta semana",
    confidence: 71,
    category: "Golosinas",
    brand: "Milka",
    unit: "unidades",
    selected: false,
    reasonType: "promotion",
  },
]

export default function PedidoInteligentePage() {
  const router = useRouter()
  const [products, setProducts] = useState<SuggestedProduct[]>(mockSuggestedProducts)
  const [loading, setLoading] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, quantity: Math.max(0, newQuantity) } : product)),
    )
  }

  const toggleProduct = (id: string) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, selected: !product.selected } : product)))
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const selectedProducts = products.filter((p) => p.selected && p.quantity > 0)
  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0)
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const totalSavings = selectedProducts.reduce((sum, p) => {
    if (p.originalPrice) {
      return sum + (p.originalPrice - p.price) * p.quantity
    }
    return sum
  }, 0)

  const getReasonIcon = (type: string) => {
    switch (type) {
      case "history":
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case "trending":
        return <Users className="w-4 h-4 text-green-600" />
      case "promotion":
        return <Percent className="w-4 h-4 text-orange-600" />
      case "missing":
        return <Package className="w-4 h-4 text-purple-600" />
      default:
        return <Brain className="w-4 h-4 text-gray-600" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50"
    if (confidence >= 80) return "text-blue-600 bg-blue-50"
    if (confidence >= 70) return "text-orange-600 bg-orange-50"
    return "text-gray-600 bg-gray-50"
  }

  const handleCreateOrder = async () => {
    setLoading(true)

    // Agregar productos seleccionados al carrito
    const cartItems = selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      brand: product.brand,
      originalPrice: product.originalPrice,
      discount: product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : undefined,
      promoText: product.originalPrice
        ? `¡${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF!`
        : undefined,
    }))

    // Guardar en localStorage
    localStorage.setItem("clienteCart", JSON.stringify(cartItems))

    // Disparar evento para actualizar el header
    window.dispatchEvent(new Event("cartUpdated"))

    setTimeout(() => {
      setLoading(false)
      router.push("/cliente/carrito")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sticky top-16 z-40">
        <div className="flex items-center space-x-3 mb-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6" />
            <h1 className="text-xl font-bold">Pedido Inteligente</h1>
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <Crown className="w-3 h-3" />
              <span className="text-xs font-bold">PREMIUM</span>
            </div>
          </div>
        </div>
        <p className="text-purple-100 text-sm">Sugerencias personalizadas basadas en IA y análisis de datos</p>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Resumen del Pedido */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Resumen Inteligente
            </h3>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">${totalPrice.toLocaleString()}</p>
              {totalSavings > 0 && <p className="text-sm text-green-600">Ahorrás ${totalSavings.toLocaleString()}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{selectedProducts.length}</p>
              <p className="text-sm text-gray-600">Productos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              <p className="text-sm text-gray-600">Unidades</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(selectedProducts.reduce((sum, p) => sum + p.confidence, 0) / selectedProducts.length)}%
              </p>
              <p className="text-sm text-gray-600">Precisión</p>
            </div>
          </div>
        </div>

        {/* Productos Sugeridos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Productos Sugeridos</h3>

          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg border-2 transition-all ${
                product.selected ? "border-purple-200 bg-purple-50/30" : "border-gray-200"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => toggleProduct(product.id)}
                      className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </div>

                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={`/placeholder.svg?height=60&width=60&text=${encodeURIComponent(product.name.split(" ")[0])}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      {product.originalPrice ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          <span className="text-lg font-bold text-purple-600">${product.price}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-purple-600">${product.price}</span>
                      )}
                      <span className="text-sm text-gray-500">por {product.unit}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      {getReasonIcon(product.reasonType)}
                      <span className="text-sm text-gray-700">{product.reason}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(product.confidence)}`}
                      >
                        {product.confidence}%
                      </span>
                    </div>

                    {product.selected && (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{product.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="ml-auto">
                          <span className="font-bold text-gray-900">
                            ${(product.price * product.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explicación de la IA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            ¿Cómo funciona nuestro algoritmo?
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>
                <strong>Historial:</strong> Analizamos tus últimos 30 pedidos
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-600" />
              <span>
                <strong>Tendencias:</strong> Comparamos con clientes similares de tu zona
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-orange-600" />
              <span>
                <strong>Promociones:</strong> Incluimos ofertas actuales relevantes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-purple-600" />
              <span>
                <strong>Faltantes:</strong> Detectamos productos que solés pedir pero no están
              </span>
            </div>
          </div>
        </div>

        {/* Botón Agregar al Carrito */}
        {selectedProducts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-center mb-4">
              <p className="font-semibold text-gray-900 mb-1">{selectedProducts.length} productos seleccionados</p>
              <p className="text-sm text-gray-600">
                {totalItems} unidades • ${totalPrice.toLocaleString()}
              </p>
              {totalSavings > 0 && (
                <p className="text-sm text-green-600 font-medium">Ahorrás ${totalSavings.toLocaleString()}</p>
              )}
            </div>

            <button
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Agregar al Carrito
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
