"use client"

import { useState } from "react"
import {
  ArrowLeft,
  RefreshCw,
  Crown,
  Plus,
  Calendar,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Trash2,
  Bell,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AutoReplenishment {
  id: string
  productName: string
  productId: string
  brand: string
  price: number
  frequency: number
  nextDate: string
  avgConsumption: number
  status: "active" | "paused"
  lastOrderDate: string
  totalOrders: number
  category: string
}

interface NewReplenishment {
  productId: string
  productName: string
  frequency: number
  quantity: number
}

const mockAutoReplenishments: AutoReplenishment[] = [
  {
    id: "1",
    productName: "Coca Cola 500ml",
    productId: "1",
    brand: "Coca Cola",
    price: 405,
    frequency: 3,
    nextDate: "2024-01-23",
    avgConsumption: 12,
    status: "active",
    lastOrderDate: "2024-01-20",
    totalOrders: 8,
    category: "Bebidas",
  },
  {
    id: "2",
    productName: "Leche La Serenísima 1L",
    productId: "11",
    brand: "La Serenísima",
    price: 350,
    frequency: 2,
    nextDate: "2024-01-22",
    avgConsumption: 8,
    status: "active",
    lastOrderDate: "2024-01-20",
    totalOrders: 12,
    category: "Lácteos",
  },
  {
    id: "3",
    productName: "Pan Lactal Bimbo",
    productId: "13",
    brand: "Bimbo",
    price: 280,
    frequency: 4,
    nextDate: "2024-01-25",
    avgConsumption: 6,
    status: "paused",
    lastOrderDate: "2024-01-17",
    totalOrders: 6,
    category: "Panadería",
  },
  {
    id: "4",
    productName: "Alfajor Havanna",
    productId: "6",
    brand: "Havanna",
    price: 256,
    frequency: 7,
    nextDate: "2024-01-27",
    avgConsumption: 15,
    status: "active",
    lastOrderDate: "2024-01-20",
    totalOrders: 4,
    category: "Golosinas",
  },
]

const suggestedProducts = [
  { id: "9", name: "Papas Lays Original", brand: "Lays", price: 380, category: "Snacks" },
  { id: "4", name: "Sprite 500ml", brand: "Sprite", price: 420, category: "Bebidas" },
  { id: "7", name: "Chocolate Milka", brand: "Milka", price: 680, category: "Golosinas" },
]

export default function ReabastecimientoPage() {
  const router = useRouter()
  const [replenishments, setReplenishments] = useState<AutoReplenishment[]>(mockAutoReplenishments)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newReplenishment, setNewReplenishment] = useState<NewReplenishment>({
    productId: "",
    productName: "",
    frequency: 7,
    quantity: 1,
  })

  const toggleStatus = (id: string) => {
    setReplenishments(
      replenishments.map((item) =>
        item.id === id ? { ...item, status: item.status === "active" ? "paused" : "active" } : item,
      ),
    )
  }

  const deleteReplenishment = (id: string) => {
    setReplenishments(replenishments.filter((item) => item.id !== id))
  }

  const addReplenishment = () => {
    if (newReplenishment.productId && newReplenishment.productName) {
      const newItem: AutoReplenishment = {
        id: Date.now().toString(),
        productName: newReplenishment.productName,
        productId: newReplenishment.productId,
        brand: "Marca",
        price: 0,
        frequency: newReplenishment.frequency,
        nextDate: new Date(Date.now() + newReplenishment.frequency * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        avgConsumption: newReplenishment.quantity,
        status: "active",
        lastOrderDate: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        category: "General",
      }
      setReplenishments([...replenishments, newItem])
      setNewReplenishment({ productId: "", productName: "", frequency: 7, quantity: 1 })
      setShowAddForm(false)
    }
  }

  const activeReplenishments = replenishments.filter((r) => r.status === "active")
  const pausedReplenishments = replenishments.filter((r) => r.status === "paused")
  const totalSavings = replenishments.reduce((sum, r) => sum + r.price * r.avgConsumption * 0.05, 0)

  const getDaysUntilNext = (nextDate: string) => {
    const today = new Date()
    const next = new Date(nextDate)
    const diffTime = next.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sticky top-16 z-40">
        <div className="flex items-center space-x-3 mb-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6" />
            <h1 className="text-xl font-bold">Reabastecimiento Automático</h1>
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <Crown className="w-3 h-3" />
              <span className="text-xs font-bold">PREMIUM</span>
            </div>
          </div>
        </div>
        <p className="text-emerald-100 text-sm">Nunca te quedes sin stock de productos esenciales</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Resumen */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-emerald-600">{activeReplenishments.length}</p>
              <p className="text-sm text-gray-600">Activos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{pausedReplenishments.length}</p>
              <p className="text-sm text-gray-600">Pausados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">${totalSavings.toFixed(0)}</p>
              <p className="text-sm text-gray-600">Ahorro mensual</p>
            </div>
          </div>
        </div>

        {/* Próximos Reabastecimientos */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Próximos Reabastecimientos
            </h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </button>
          </div>

          <div className="space-y-3">
            {activeReplenishments
              .sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())
              .map((item) => {
                const daysUntil = getDaysUntilNext(item.nextDate)
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                        <p className="text-sm text-gray-600">
                          {item.brand} • {item.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => toggleStatus(item.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                          <Pause className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteReplenishment(item.id)}
                          className="p-2 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Próximo pedido</p>
                        <p className="font-medium">
                          {daysUntil === 0 ? "Hoy" : daysUntil === 1 ? "Mañana" : `En ${daysUntil} días`}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(item.nextDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Frecuencia</p>
                        <p className="font-medium">Cada {item.frequency} días</p>
                        <p className="text-xs text-gray-500">{item.avgConsumption} un/pedido</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Último: {new Date(item.lastOrderDate).toLocaleDateString()}</span>
                        <span>Total: {item.totalOrders} pedidos</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status === "active" ? "Activo" : "Pausado"}
                      </span>
                    </div>

                    {daysUntil <= 1 && (
                      <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center">
                        <Bell className="w-4 h-4 text-orange-600 mr-2" />
                        <span className="text-sm text-orange-800">
                          {daysUntil === 0 ? "Pedido programado para hoy" : "Pedido programado para mañana"}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>

        {/* Productos Pausados */}
        {pausedReplenishments.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pause className="w-5 h-5 mr-2 text-gray-600" />
              Reabastecimientos Pausados
            </h3>

            <div className="space-y-3">
              {pausedReplenishments.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-700">{item.productName}</h4>
                      <p className="text-sm text-gray-500">
                        {item.brand} • Cada {item.frequency} días
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700 transition-colors flex items-center"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Reactivar
                      </button>
                      <button onClick={() => deleteReplenishment(item.id)} className="p-2 hover:bg-red-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Productos Sugeridos */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Productos Sugeridos para Reabastecimiento
          </h3>
          <p className="text-sm text-gray-600 mb-4">Basado en tu historial de pedidos y patrones de consumo</p>

          <div className="space-y-3">
            {suggestedProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      {product.brand} • {product.category}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">Pedís en promedio cada 5-7 días</p>
                  </div>
                  <button
                    onClick={() => {
                      setNewReplenishment({
                        productId: product.id,
                        productName: product.name,
                        frequency: 6,
                        quantity: 1,
                      })
                      setShowAddForm(true)
                    }}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuración Avanzada */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-600" />
            Configuración Avanzada
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Notificaciones por Email</h4>
                <p className="text-sm text-gray-600">Recibir alertas antes de cada reabastecimiento</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Pedidos Automáticos</h4>
                <p className="text-sm text-gray-600">Crear pedidos automáticamente sin confirmación</p>
              </div>
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Ajuste Inteligente</h4>
                <p className="text-sm text-gray-600">Ajustar frecuencias basado en consumo real</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Agregar Nuevo Reabastecimiento */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo Reabastecimiento</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
                <select
                  value={newReplenishment.productId}
                  onChange={(e) => {
                    const selectedProduct = suggestedProducts.find((p) => p.id === e.target.value)
                    setNewReplenishment({
                      ...newReplenishment,
                      productId: e.target.value,
                      productName: selectedProduct?.name || "",
                    })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Seleccionar producto</option>
                  {suggestedProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia (días)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newReplenishment.frequency}
                  onChange={(e) =>
                    setNewReplenishment({
                      ...newReplenishment,
                      frequency: Number.parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad por pedido</label>
                <input
                  type="number"
                  min="1"
                  value={newReplenishment.quantity}
                  onChange={(e) =>
                    setNewReplenishment({
                      ...newReplenishment,
                      quantity: Number.parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addReplenishment}
                className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Agregar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
