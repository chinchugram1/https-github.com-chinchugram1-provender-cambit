"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Filter, Eye, Calendar, MapPin, DollarSign, Package } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Order {
  id: string
  orderNumber: string
  date: string
  branchName: string
  branchAddress: string
  status: "pendiente" | "confirmado" | "preparando" | "enviado" | "entregado" | "cancelado"
  subtotal: number
  discounts: number
  taxes: number
  total: number
  itemsCount: number
}

interface Client {
  id: string
  fantasyName: string
  businessName: string
}

// Mock data
const mockClient: Client = {
  id: "1",
  fantasyName: "Super San Martín",
  businessName: "Supermercados San Martín S.A.",
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "PED-2024-001",
    date: "2024-01-20T10:30:00",
    branchName: "Sucursal Centro",
    branchAddress: "San Martín 1234, Centro",
    status: "entregado",
    subtotal: 15000,
    discounts: 1500,
    taxes: 2835,
    total: 16335,
    itemsCount: 25,
  },
  {
    id: "2",
    orderNumber: "PED-2024-002",
    date: "2024-01-18T14:15:00",
    branchName: "Sucursal Norte",
    branchAddress: "Belgrano 567, Norte",
    status: "enviado",
    subtotal: 8500,
    discounts: 850,
    taxes: 1606.5,
    total: 9256.5,
    itemsCount: 18,
  },
  {
    id: "3",
    orderNumber: "PED-2024-003",
    date: "2024-01-15T09:45:00",
    branchName: "Sucursal Sur",
    branchAddress: "Mitre 890, Sur",
    status: "preparando",
    subtotal: 12000,
    discounts: 600,
    taxes: 2394,
    total: 13794,
    itemsCount: 32,
  },
  {
    id: "4",
    orderNumber: "PED-2024-004",
    date: "2024-01-12T16:20:00",
    branchName: "Sucursal Centro",
    branchAddress: "San Martín 1234, Centro",
    status: "entregado",
    subtotal: 22000,
    discounts: 2200,
    taxes: 4158,
    total: 23958,
    itemsCount: 45,
  },
  {
    id: "5",
    orderNumber: "PED-2024-005",
    date: "2024-01-10T11:00:00",
    branchName: "Sucursal Norte",
    branchAddress: "Belgrano 567, Norte",
    status: "cancelado",
    subtotal: 5500,
    discounts: 0,
    taxes: 1155,
    total: 6655,
    itemsCount: 12,
  },
]

export default function ClientePedidosPage() {
  const params = useParams()
  const clientId = params.id as string
  const [client, setClient] = useState<Client | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setClient(mockClient)
      setOrders(mockOrders)
      setLoading(false)
    }, 500)
  }, [clientId])

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "pendiente", label: "Pendientes" },
    { value: "confirmado", label: "Confirmados" },
    { value: "preparando", label: "Preparando" },
    { value: "enviado", label: "Enviados" },
    { value: "entregado", label: "Entregados" },
    { value: "cancelado", label: "Cancelados" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.branchName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "todos" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "entregado":
        return "bg-green-100 text-green-800"
      case "enviado":
        return "bg-blue-100 text-blue-800"
      case "preparando":
        return "bg-yellow-100 text-yellow-800"
      case "confirmado":
        return "bg-purple-100 text-purple-800"
      case "pendiente":
        return "bg-orange-100 text-orange-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "entregado":
        return "Entregado"
      case "enviado":
        return "Enviado"
      case "preparando":
        return "Preparando"
      case "confirmado":
        return "Confirmado"
      case "pendiente":
        return "Pendiente"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div>
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente no encontrado</h3>
          <Link href="/proveedor/clientes" className="btn-primary">
            Volver a Clientes
          </Link>
        </div>
      </div>
    )
  }

  const totalOrders = orders.length
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0)
  const averageOrder = totalOrders > 0 ? totalAmount / totalOrders : 0

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/proveedor/clientes/${clientId}`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos de {client.fantasyName}</h1>
          <p className="text-gray-600">{client.businessName}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <Package className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monto Total</p>
              <p className="text-2xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Promedio por Pedido</p>
              <p className="text-2xl font-bold text-blue-600">${averageOrder.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por número de pedido o sucursal..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Estado:</span>
        </div>

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
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{order.orderNumber}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.date).toLocaleString("es-AR")}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{order.branchName}</p>
                    <p>{order.branchAddress}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Productos</span>
                  <p className="font-semibold text-gray-900">{order.itemsCount} items</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Total</span>
                  <p className="font-semibold text-gray-900">${order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Subtotal: ${order.subtotal.toLocaleString()}</span>
                <span>Desc: -${order.discounts.toLocaleString()}</span>
                <span>Imp: ${order.taxes.toLocaleString()}</span>
              </div>
              <Link
                href={`/proveedor/clientes/${clientId}/pedidos/${order.id}`}
                className="flex items-center space-x-1 px-3 py-1 bg-provender-primary/10 text-provender-primary rounded-lg text-sm hover:bg-provender-primary/20"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Detalle</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron pedidos</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}
