"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Building,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Package,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface SucursalDetail {
  id: string
  nombre: string
  direccion: string
  telefono: string
  horario: string
  zona: string
  activa: boolean
  fechaCreacion: string
  responsable: string
  email: string
  // KPIs
  pedidosMes: number
  pedidosAnterior: number
  totalGastado: number
  gastoAnterior: number
  ultimoPedido: string
  promedioMensual: number
  productosPreferidos: Array<{
    nombre: string
    cantidad: number
    porcentaje: number
  }>
  ventasPorMes: Array<{
    mes: string
    ventas: number
  }>
}

const mockSucursalDetail: SucursalDetail = {
  id: "SUC-001",
  nombre: "Sucursal Centro",
  direccion: "Av. Corrientes 1234, CABA",
  telefono: "+54 11 4567-8901",
  horario: "8:00 - 20:00",
  zona: "Centro",
  activa: true,
  fechaCreacion: "2023-03-15",
  responsable: "María González",
  email: "centro@empresa.com",
  pedidosMes: 12,
  pedidosAnterior: 8,
  totalGastado: 15420,
  gastoAnterior: 12300,
  ultimoPedido: "2024-01-18",
  promedioMensual: 13850,
  productosPreferidos: [
    { nombre: "Coca Cola 2.25L", cantidad: 48, porcentaje: 25 },
    { nombre: "Galletitas Oreo", cantidad: 36, porcentaje: 18 },
    { nombre: "Aceite Natura", cantidad: 24, porcentaje: 15 },
    { nombre: "Arroz Gallo Oro", cantidad: 18, porcentaje: 12 },
  ],
  ventasPorMes: [
    { mes: "Sep", ventas: 11200 },
    { mes: "Oct", ventas: 13400 },
    { mes: "Nov", ventas: 12800 },
    { mes: "Dic", ventas: 16500 },
    { mes: "Ene", ventas: 15420 },
  ],
}

export default function SucursalDetailPage() {
  const params = useParams()
  const sucursalId = params.id as string
  const [sucursal, setSucursal] = useState<SucursalDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setSucursal(mockSucursalDetail)
      setLoading(false)
    }, 500)
  }, [sucursalId])

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
        <div className="card">
          <div className="w-full h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!sucursal) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sucursal no encontrada</h3>
          <Link href="/cliente/sucursales" className="btn-primary">
            Volver a Sucursales
          </Link>
        </div>
      </div>
    )
  }

  const crecimientoPedidos = ((sucursal.pedidosMes - sucursal.pedidosAnterior) / sucursal.pedidosAnterior) * 100
  const crecimientoGastos = ((sucursal.totalGastado - sucursal.gastoAnterior) / sucursal.gastoAnterior) * 100

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/cliente/sucursales"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{sucursal.nombre}</h1>
          <p className="text-gray-600">Información detallada y métricas</p>
        </div>
      </div>

      {/* Información Básica */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                sucursal.activa ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <Building className={`w-6 h-6 ${sucursal.activa ? "text-green-600" : "text-gray-400"}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{sucursal.nombre}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sucursal.activa ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {sucursal.activa ? "Activa" : "Inactiva"}
              </span>
            </div>
          </div>
          <Link href={`/cliente/sucursales/${sucursal.id}/editar`} className="btn-secondary">
            Editar Sucursal
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{sucursal.direccion}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{sucursal.telefono}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{sucursal.horario}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">Responsable: {sucursal.responsable}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Creada: {new Date(sucursal.fechaCreacion).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Building className="w-4 h-4" />
              <span className="text-sm">Zona: {sucursal.zona}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{sucursal.pedidosMes}</p>
          <p className="text-sm text-gray-600">Pedidos este mes</p>
          <div className={`text-xs mt-1 ${crecimientoPedidos >= 0 ? "text-green-600" : "text-red-600"}`}>
            {crecimientoPedidos >= 0 ? "+" : ""}
            {crecimientoPedidos.toFixed(1)}% vs mes anterior
          </div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${sucursal.totalGastado.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total gastado</p>
          <div className={`text-xs mt-1 ${crecimientoGastos >= 0 ? "text-green-600" : "text-red-600"}`}>
            {crecimientoGastos >= 0 ? "+" : ""}
            {crecimientoGastos.toFixed(1)}% vs mes anterior
          </div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${sucursal.promedioMensual.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Promedio mensual</p>
          <div className="text-xs mt-1 text-gray-500">Últimos 6 meses</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.floor((Date.now() - new Date(sucursal.ultimoPedido).getTime()) / (1000 * 60 * 60 * 24))}
          </p>
          <p className="text-sm text-gray-600">Días desde último pedido</p>
          <div className="text-xs mt-1 text-gray-500">{new Date(sucursal.ultimoPedido).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Productos Más Pedidos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Más Pedidos</h3>
        <div className="space-y-3">
          {sucursal.productosPreferidos.map((producto, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-provender-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-provender-primary">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{producto.nombre}</p>
                  <p className="text-sm text-gray-600">{producto.cantidad} unidades</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{producto.porcentaje}%</div>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-provender-primary rounded-full"
                    style={{ width: `${producto.porcentaje * 4}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolución de Ventas */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolución de Compras (Últimos 5 meses)</h3>
        <div className="flex items-end justify-between h-32 space-x-2">
          {sucursal.ventasPorMes.map((mes, index) => {
            const maxVenta = Math.max(...sucursal.ventasPorMes.map((m) => m.ventas))
            const altura = (mes.ventas / maxVenta) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-1">${(mes.ventas / 1000).toFixed(0)}k</div>
                <div className="w-full bg-provender-primary rounded-t" style={{ height: `${altura}%` }}></div>
                <div className="text-xs text-gray-500 mt-2">{mes.mes}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/cliente/pedido/nuevo" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Nuevo Pedido</h4>
              <p className="text-sm text-gray-600">Realizar pedido para esta sucursal</p>
            </div>
          </div>
        </Link>

        <Link href="/cliente/historial" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Ver Historial</h4>
              <p className="text-sm text-gray-600">Pedidos anteriores de esta sucursal</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
