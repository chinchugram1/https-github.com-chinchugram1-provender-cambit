"use client"

import { useState, useEffect } from "react"
import {
  ShoppingCart,
  Gift,
  TrendingUp,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  Percent,
  Plus,
  User,
  Brain,
  RefreshCw,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  type: "descuento" | "combo" | "cantidad"
  image: string
  validUntil: string
  featured: boolean
}

interface RecentOrder {
  id: string
  date: string
  total: number
  status: "pendiente" | "en-camino" | "entregado"
  items: number
}

interface SuggestedProduct {
  id: string
  name: string
  price: number
  reason: string
  confidence: number
  category: string
}

interface AutoReplenishment {
  id: string
  productName: string
  frequency: number
  nextDate: string
  avgConsumption: number
  status: "active" | "paused"
}

const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "¡Super Combo Bebidas!",
    description: "Llevá 6 Coca-Cola 500ml y pagá solo 5",
    discount: 15,
    type: "combo",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "2024-01-31",
    featured: true,
  },
  {
    id: "2",
    title: "Descuento Alfajores",
    description: "20% OFF en todos los alfajores Havanna",
    discount: 20,
    type: "descuento",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "2024-01-25",
    featured: true,
  },
]

const mockSuggestedProducts: SuggestedProduct[] = [
  {
    id: "1",
    name: "Coca Cola 500ml",
    price: 405,
    reason: "Pedís cada 3 días en promedio",
    confidence: 95,
    category: "Bebidas",
  },
  {
    id: "6",
    name: "Alfajor Havanna",
    price: 256,
    reason: "20% OFF + clientes similares lo compran",
    confidence: 87,
    category: "Golosinas",
  },
  {
    id: "9",
    name: "Papas Lays Original",
    price: 380,
    reason: "Falta en tu último pedido habitual",
    confidence: 78,
    category: "Snacks",
  },
  {
    id: "11",
    name: "Leche La Serenísima 1L",
    price: 350,
    reason: "Tendencia en tu zona + sobrestock",
    confidence: 82,
    category: "Lácteos",
  },
]

const mockAutoReplenishments: AutoReplenishment[] = [
  {
    id: "1",
    productName: "Coca Cola 500ml",
    frequency: 3,
    nextDate: "2024-01-23",
    avgConsumption: 12,
    status: "active",
  },
  {
    id: "2",
    productName: "Leche La Serenísima 1L",
    frequency: 2,
    nextDate: "2024-01-22",
    avgConsumption: 8,
    status: "active",
  },
  {
    id: "3",
    productName: "Pan Lactal Bimbo",
    frequency: 4,
    nextDate: "2024-01-25",
    avgConsumption: 6,
    status: "paused",
  },
]

// Datos específicos por tipo de usuario
const mockRecentOrdersRazonSocial: RecentOrder[] = [
  {
    id: "PED-001",
    date: "2024-01-15",
    total: 1250,
    status: "entregado",
    items: 5,
  },
  {
    id: "PED-002",
    date: "2024-01-18",
    total: 890,
    status: "en-camino",
    items: 3,
  },
  {
    id: "PED-003",
    date: "2024-01-20",
    total: 1580,
    status: "pendiente",
    items: 7,
  },
]

const mockRecentOrdersSucursal: RecentOrder[] = [
  {
    id: "PED-SUC-001",
    date: "2024-01-18",
    total: 650,
    status: "entregado",
    items: 3,
  },
  {
    id: "PED-SUC-002",
    date: "2024-01-20",
    total: 420,
    status: "en-camino",
    items: 2,
  },
]

export default function ClienteDashboard() {
  const [userType, setUserType] = useState<"razon-social" | "sucursal">("sucursal")
  const [currentPromotion, setCurrentPromotion] = useState(0)
  const [showSmartOrder, setShowSmartOrder] = useState(true)
  const [smartOrderTotal, setSmartOrderTotal] = useState(0)

  useEffect(() => {
    // Obtener tipo de usuario del localStorage
    const type = localStorage.getItem("userType") as "razon-social" | "sucursal"
    if (type) {
      setUserType(type)
    }

    // Calcular total del pedido inteligente
    const total = mockSuggestedProducts.reduce((sum, product) => sum + product.price, 0)
    setSmartOrderTotal(total)

    // Auto-rotate promociones
    const interval = setInterval(() => {
      setCurrentPromotion((prev) => (prev + 1) % mockPromotions.filter((p) => p.featured).length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const featuredPromotions = mockPromotions.filter((p) => p.featured)

  // Seleccionar datos según el tipo de usuario
  const recentOrders = userType === "razon-social" ? mockRecentOrdersRazonSocial : mockRecentOrdersSucursal

  // Estadísticas específicas por tipo de usuario
  const stats =
    userType === "razon-social"
      ? {
          pedidosMes: 28,
          totalGastado: 35420,
          ahorrado: 4180,
        }
      : {
          pedidosMes: 5,
          totalGastado: 8650,
          ahorrado: 1240,
        }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "en-camino":
        return "bg-blue-100 text-blue-800"
      case "entregado":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateSmartOrder = () => {
    // Aquí se crearía el pedido inteligente
    alert("Pedido inteligente creado! Redirigiendo al carrito...")
  }

  const handleDismissSmartOrder = () => {
    setShowSmartOrder(false)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 80) return "text-blue-600"
    return "text-orange-600"
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenido{userType === "sucursal" ? " - Sucursal Centro" : ""}
        </h1>
        <p className="text-gray-600">
          {userType === "razon-social"
            ? "Gestiona todas tus sucursales y pedidos"
            : "Gestiona los pedidos de tu sucursal"}
        </p>
      </div>

      {/* Pedido Inteligente Premium */}
      {showSmartOrder && (
        <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <Crown className="w-3 h-3" />
              <span className="text-xs font-bold">PREMIUM</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Pedido Inteligente Sugerido
              </h3>
              <p className="text-purple-100 mb-4">
                Armamos un pedido basado en tu historial, tendencias de tu zona y promociones actuales
              </p>

              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Productos sugeridos:</span>
                  <span className="text-lg font-bold">${smartOrderTotal.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {mockSuggestedProducts.slice(0, 4).map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <span className="truncate">{product.name}</span>
                      <span className={`text-xs ${getConfidenceColor(product.confidence)}`}>{product.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateSmartOrder}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Crear Pedido
                </button>
                <Link
                  href="/cliente/pedido-inteligente"
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Ver Detalle
                </Link>
                <button onClick={handleDismissSmartOrder} className="text-white/80 hover:text-white px-2">
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reabastecimiento Automático Premium */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
            <Crown className="w-3 h-3" />
            <span className="text-xs font-bold">PREMIUM</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Reabastecimiento Automático</h3>
            <p className="text-emerald-100 text-sm">Nunca te quedes sin stock de productos esenciales</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {mockAutoReplenishments
            .filter((r) => r.status === "active")
            .slice(0, 2)
            .map((item) => (
              <div key={item.id} className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-xs text-emerald-100">
                    Cada {item.frequency} días • Próximo: {new Date(item.nextDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{item.avgConsumption} un/sem</p>
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                </div>
              </div>
            ))}
        </div>

        <Link
          href="/cliente/reabastecimiento"
          className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Gestionar Reabastecimiento
        </Link>
      </div>

      {/* Carrusel de Promociones Destacadas */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPromotion * 100}%)` }}
          >
            {featuredPromotions.map((promo) => (
              <div key={promo.id} className="w-full flex-shrink-0">
                <div className="relative bg-gradient-to-r from-provender-primary to-provender-accent rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Gift className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">Promoción Especial</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                      <p className="text-provender-cream mb-4">{promo.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Percent className="w-4 h-4" />
                          <span className="font-bold">{promo.discount}% OFF</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Hasta {new Date(promo.validUntil).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center ml-4">
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <Link href="/cliente/promociones" className="absolute inset-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores del carrusel */}
        <div className="flex justify-center space-x-2 mt-4">
          {featuredPromotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPromotion(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPromotion ? "bg-provender-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/cliente/pedido/nuevo" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Nuevo Pedido</h3>
              <p className="text-sm text-gray-600">Crear pedido rápido</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        {userType === "razon-social" ? (
          <Link href="/cliente/sucursales" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Sucursales</h3>
                <p className="text-sm text-gray-600">Gestionar sucursales</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ) : (
          <Link href="/cliente/promociones" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Promociones</h3>
                <p className="text-sm text-gray-600">Ofertas especiales</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        )}

        <Link href="/cliente/promociones" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Promociones</h3>
              <p className="text-sm text-gray-600">Ofertas especiales</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <Link href="/cliente/pedidos/en-camino" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-provender-light/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-provender-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">En Camino</h3>
              <p className="text-sm text-gray-600">Seguir entregas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pedidosMes}</p>
          <p className="text-sm text-gray-600">Pedidos este mes</p>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${stats.totalGastado.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total gastado</p>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Star className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${stats.ahorrado.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Ahorrado en promos</p>
        </div>
      </div>

      {/* Pedidos Recientes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {userType === "razon-social" ? "Pedidos Recientes (Todas las Sucursales)" : "Mis Pedidos Recientes"}
          </h3>
          <Link href="/cliente/historial" className="text-provender-primary text-sm font-medium">
            Ver todos
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {order.items} productos • ${order.total}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status === "en-camino"
                    ? "En Camino"
                    : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="text-sm text-gray-600 mt-1">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
