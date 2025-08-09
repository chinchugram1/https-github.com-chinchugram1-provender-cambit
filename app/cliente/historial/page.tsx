"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle, XCircle, Package, Calendar } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  status: "pendiente" | "confirmado" | "entregado" | "cancelado"
  total: number
  items: number
  estimatedDelivery?: string
  sucursal?: string
}

// Pedidos para razón social (todas las sucursales)
const mockOrdersRazonSocial: Order[] = [
  {
    id: "PED-001",
    date: "2024-01-15",
    status: "entregado",
    total: 1250,
    items: 5,
    estimatedDelivery: "2024-01-15",
    sucursal: "Sucursal Centro",
  },
  {
    id: "PED-002",
    date: "2024-01-18",
    status: "confirmado",
    total: 890,
    items: 3,
    estimatedDelivery: "2024-01-19",
    sucursal: "Sucursal Norte",
  },
  {
    id: "PED-003",
    date: "2024-01-20",
    status: "pendiente",
    total: 1580,
    items: 7,
    estimatedDelivery: "2024-01-21",
    sucursal: "Sucursal Centro",
  },
  {
    id: "PED-004",
    date: "2024-01-12",
    status: "cancelado",
    total: 650,
    items: 2,
    sucursal: "Sucursal Sur",
  },
]

// Pedidos para sucursal específica
const mockOrdersSucursal: Order[] = [
  {
    id: "PED-SUC-001",
    date: "2024-01-18",
    status: "entregado",
    total: 650,
    items: 3,
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "PED-SUC-002",
    date: "2024-01-20",
    status: "confirmado",
    total: 420,
    items: 2,
    estimatedDelivery: "2024-01-21",
  },
  {
    id: "PED-SUC-003",
    date: "2024-01-16",
    status: "entregado",
    total: 890,
    items: 4,
    estimatedDelivery: "2024-01-16",
  },
]

export default function HistorialPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("todos")
  const [userType, setUserType] = useState<"razon-social" | "sucursal">("sucursal")

  useEffect(() => {
    const type = localStorage.getItem("userType") as "razon-social" | "sucursal"
    if (type) {
      setUserType(type)
    }
  }, [])

  // Seleccionar pedidos según el tipo de usuario
  const allOrders = userType === "razon-social" ? mockOrdersRazonSocial : mockOrdersSucursal

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "confirmado":
        return <Package className="w-5 h-5 text-blue-500" />
      case "entregado":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelado":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente"
      case "confirmado":
        return "Confirmado"
      case "entregado":
        return "Entregado"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "confirmado":
        return "bg-blue-100 text-blue-800"
      case "entregado":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders =
    selectedStatus === "todos" ? allOrders : allOrders.filter((order) => order.status === selectedStatus)

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "pendiente", label: "Pendientes" },
    { value: "confirmado", label: "Confirmados" },
    { value: "entregado", label: "Entregados" },
    { value: "cancelado", label: "Cancelados" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {userType === "razon-social" ? "Historial de Pedidos - Todas las Sucursales" : "Mi Historial de Pedidos"}
        </h1>
        <p className="text-gray-600">
          {userType === "razon-social"
            ? "Revisá el estado de todos los pedidos de tus sucursales"
            : "Revisá el estado de todos tus pedidos"}
        </p>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedStatus(option.value)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedStatus === option.value
                ? "bg-provender-primary text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-provender-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay pedidos</h3>
            <p className="text-gray-600">No se encontraron pedidos con el filtro seleccionado</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Pedido {order.id}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString("es-AR")}</span>
                  </div>
                  {userType === "razon-social" && order.sucursal && (
                    <div className="mt-1">
                      <span className="text-xs bg-provender-primary/10 text-provender-primary px-2 py-1 rounded-full">
                        {order.sucursal}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Total</span>
                  <p className="font-semibold text-lg text-gray-900">${order.total}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Productos</span>
                  <p className="font-semibold text-lg text-gray-900">{order.items} items</p>
                </div>
              </div>

              {order.estimatedDelivery && order.status !== "entregado" && order.status !== "cancelado" && (
                <div className="bg-provender-light/10 p-3 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-provender-primary" />
                    <span className="text-sm text-provender-primary font-medium">
                      Entrega estimada: {new Date(order.estimatedDelivery).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Link
                  href={`/cliente/historial/${order.id}`}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  Ver Detalle
                </Link>
                {order.status === "entregado" && (
                  <Link href="/cliente/pedido/nuevo" className="flex-1 btn-primary text-center">
                    Repetir Pedido
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
