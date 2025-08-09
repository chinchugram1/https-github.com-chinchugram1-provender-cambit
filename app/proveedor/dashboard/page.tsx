"use client"

import { TrendingUp, Package, Users, ShoppingBag, AlertTriangle, DollarSign, BarChart3, Gift } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Ventas del Mes",
    value: "$45,230",
    change: "+12%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    name: "Pedidos Activos",
    value: "23",
    change: "+3",
    changeType: "positive",
    icon: ShoppingBag,
  },
  {
    name: "Productos en Stock",
    value: "156",
    change: "-8",
    changeType: "negative",
    icon: Package,
  },
  {
    name: "Clientes Activos",
    value: "42",
    change: "+5",
    changeType: "positive",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "PED-001",
    client: "Kiosco San Martín",
    total: 1250,
    status: "pendiente",
    time: "10:30",
  },
  {
    id: "PED-002",
    client: "Almacén Central",
    total: 890,
    status: "confirmado",
    time: "09:15",
  },
  {
    id: "PED-003",
    client: "Super Barrio",
    total: 1580,
    status: "en_preparacion",
    time: "08:45",
  },
]

const topProducts = [
  { name: "Coca Cola 500ml", sales: 45, trend: "up" },
  { name: "Alfajor Havanna", sales: 32, trend: "up" },
  { name: "Agua Mineral 1.5L", sales: 28, trend: "down" },
  { name: "Papas Fritas Lays", sales: 24, trend: "up" },
]

const alerts = [
  {
    type: "warning",
    message: "5 productos con stock bajo",
    action: "Ver productos",
  },
  {
    type: "info",
    message: "3 promociones vencen hoy",
    action: "Gestionar",
  },
]

export default function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "confirmado":
        return "bg-blue-100 text-blue-800"
      case "en_preparacion":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente"
      case "confirmado":
        return "Confirmado"
      case "en_preparacion":
        return "En Preparación"
      default:
        return status
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu negocio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-provender-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-provender-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Alertas</h2>
          {alerts.map((alert, index) => (
            <div key={index} className="card border-l-4 border-l-yellow-400 bg-yellow-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-900">{alert.message}</span>
                </div>
                <button className="text-provender-primary font-medium text-sm">{alert.action}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pedidos Recientes</h2>
          <button className="text-provender-primary font-medium text-sm">Ver todos</button>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{order.client}</h3>
                <p className="text-sm text-gray-600">
                  {order.id} • {order.time}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${order.total}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-provender-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-provender-primary">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{product.sales}</span>
                <TrendingUp className={`w-4 h-4 ${product.trend === "up" ? "text-green-500" : "text-red-500"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/proveedor/productos/nuevo" className="card text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Agregar Producto</h3>
              <p className="text-sm text-gray-600">Nuevo producto al catálogo</p>
            </div>
          </div>
        </Link>

        <Link href="/proveedor/promociones" className="card text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-provender-warm rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nueva Promoción</h3>
              <p className="text-sm text-gray-600">Crear oferta especial</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
