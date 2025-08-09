"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Clock, Phone, Package, Truck } from "lucide-react"
import Link from "next/link"

interface OrderInTransit {
  id: string
  orderNumber: string
  estimatedTime: string
  currentStatus: string
  driver: {
    name: string
    phone: string
    vehicle: string
    photo: string
  }
  deliveryAddress: string
  items: Array<{
    name: string
    quantity: number
  }>
  total: number
  trackingSteps: Array<{
    status: string
    time: string
    completed: boolean
    current: boolean
  }>
}

const mockOrder: OrderInTransit = {
  id: "1",
  orderNumber: "PED-2024-001",
  estimatedTime: "15-20 min",
  currentStatus: "En camino a tu sucursal",
  driver: {
    name: "Carlos Rodríguez",
    phone: "+54 11 9876-5432",
    vehicle: "Ford Transit - ABC 123",
    photo: "/placeholder.svg?height=60&width=60",
  },
  deliveryAddress: "San Martín 1234, Centro, CABA",
  items: [
    { name: "Coca Cola 2.25L", quantity: 12 },
    { name: "Galletitas Oreo", quantity: 24 },
    { name: "Aceite Natura", quantity: 6 },
    { name: "Arroz Gallo Oro", quantity: 8 },
  ],
  total: 24148.86,
  trackingSteps: [
    { status: "Pedido confirmado", time: "10:30", completed: true, current: false },
    { status: "Preparando pedido", time: "10:45", completed: true, current: false },
    { status: "Pedido listo", time: "11:15", completed: true, current: false },
    { status: "En camino", time: "11:30", completed: true, current: true },
    { status: "Entregado", time: "", completed: false, current: false },
  ],
}

export default function PedidoEnCaminoPage() {
  const [order, setOrder] = useState<OrderInTransit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [])

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

  if (!order) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pedido no encontrado</h3>
          <Link href="/cliente/historial" className="btn-primary">
            Volver al Historial
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/cliente/historial"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedido en Camino</h1>
          <p className="text-gray-600">{order.orderNumber}</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="card bg-gradient-to-r from-provender-primary to-provender-accent text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{order.currentStatus}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4" />
              <span>Tiempo estimado: {order.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Info */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Repartidor</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={order.driver.photo || "/placeholder.svg"}
              alt={order.driver.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{order.driver.name}</h4>
            <p className="text-sm text-gray-600">{order.driver.vehicle}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{order.driver.phone}</span>
            </div>
          </div>
          <a href={`tel:${order.driver.phone}`} className="btn-secondary flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Llamar</span>
          </a>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de Entrega</h3>
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-provender-primary mt-1" />
          <div>
            <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
            <p className="text-sm text-gray-600 mt-1">Sucursal Centro</p>
          </div>
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Pedido</h3>
        <div className="space-y-4">
          {order.trackingSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed
                    ? step.current
                      ? "bg-provender-primary text-white"
                      : "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.completed ? (
                  step.current ? (
                    <Truck className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>{step.status}</p>
                {step.time && <p className="text-sm text-gray-600">{step.time}</p>}
              </div>
              {step.current && (
                <div className="bg-provender-primary/10 text-provender-primary px-2 py-1 rounded-full text-xs font-medium">
                  Actual
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600">{item.quantity} unidades</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total del Pedido:</span>
            <span className="font-bold text-lg text-provender-primary">${order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicación en Tiempo Real</h3>
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Mapa de seguimiento</p>
            <p className="text-sm text-gray-500">Próximamente disponible</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <a href={`tel:${order.driver.phone}`} className="w-full btn-primary flex items-center justify-center">
          <Phone className="w-5 h-5 mr-2" />
          Contactar Repartidor
        </a>
        <Link href="/cliente/historial" className="w-full btn-secondary text-center">
          Ver Historial de Pedidos
        </Link>
      </div>
    </div>
  )
}
