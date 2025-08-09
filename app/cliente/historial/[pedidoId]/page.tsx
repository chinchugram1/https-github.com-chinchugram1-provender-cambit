"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, PrinterIcon as Print, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface OrderItem {
  id: string
  productName: string
  brand: string
  category: string
  sku: string
  quantity: number
  unitPrice: number
  discount: number
  subtotal: number
  total: number
}

interface OrderDetail {
  id: string
  orderNumber: string
  date: string
  status: "pendiente" | "confirmado" | "preparando" | "enviado" | "entregado" | "cancelado"
  client: {
    fantasyName: string
    businessName: string
    cuitCuil: string
  }
  branch: {
    name: string
    address: string
    phone: string
  }
  items: OrderItem[]
  subtotal: number
  totalDiscounts: number
  taxes: number
  total: number
  notes?: string
}

// Mock data
const mockOrderDetail: OrderDetail = {
  id: "1",
  orderNumber: "PED-2024-001",
  date: "2024-01-20T10:30:00",
  status: "entregado",
  client: {
    fantasyName: "Super San Martín",
    businessName: "Supermercados San Martín S.A.",
    cuitCuil: "30-12345678-9",
  },
  branch: {
    name: "Sucursal Centro",
    address: "San Martín 1234, Centro",
    phone: "+54 11 1234-5678",
  },
  items: [
    {
      id: "1",
      productName: "Coca Cola 2.25L",
      brand: "Coca Cola",
      category: "Bebidas",
      sku: "CC-225-001",
      quantity: 12,
      unitPrice: 450,
      discount: 54,
      subtotal: 5400,
      total: 5346,
    },
    {
      id: "2",
      productName: "Galletitas Oreo 118g",
      brand: "Mondelez",
      category: "Galletitas",
      sku: "OR-118-001",
      quantity: 24,
      unitPrice: 280,
      discount: 672,
      subtotal: 6720,
      total: 6048,
    },
    {
      id: "3",
      productName: "Aceite Natura 900ml",
      brand: "Natura",
      category: "Aceites",
      sku: "NT-900-001",
      quantity: 6,
      unitPrice: 520,
      discount: 156,
      subtotal: 3120,
      total: 2964,
    },
    {
      id: "4",
      productName: "Arroz Gallo Oro 1kg",
      brand: "Gallo Oro",
      category: "Almacén",
      sku: "GO-1KG-001",
      quantity: 8,
      unitPrice: 180,
      discount: 144,
      subtotal: 1440,
      total: 1296,
    },
    {
      id: "5",
      productName: "Detergente Ala 750ml",
      brand: "Ala",
      category: "Limpieza",
      sku: "AL-750-001",
      quantity: 15,
      unitPrice: 320,
      discount: 480,
      subtotal: 4800,
      total: 4320,
    },
  ],
  subtotal: 21480,
  totalDiscounts: 1506,
  taxes: 4174.86,
  total: 24148.86,
  notes: "Entrega preferentemente por la mañana. Contactar con Juan Carlos antes de la entrega.",
}

export default function PedidoDetallePage() {
  const params = useParams()
  const pedidoId = params.pedidoId as string
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setOrder(mockOrderDetail)
      setLoading(false)
    }, 500)
  }, [pedidoId])

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
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-gray-600">Detalle completo del pedido</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-provender-primary hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-provender-primary hover:bg-gray-100 rounded-lg transition-colors">
            <Print className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order Info */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Información del Pedido</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Fecha:</span> {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Cliente:</span> {order.client.fantasyName}
              </p>
              <p>
                <span className="font-medium">CUIT/CUIL:</span> {order.client.cuitCuil}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Sucursal de Entrega</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-medium">{order.branch.name}</p>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{order.branch.address}</span>
              </div>
              <p>{order.branch.phone}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Resumen Financiero</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Descuentos:</span>
                <span className="font-medium text-green-600">-${order.totalDiscounts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-medium">${order.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-lg text-provender-primary">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Notas del Pedido</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{order.notes}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos ({order.items.length} artículos)</h3>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={item.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Marca: {item.brand}</span>
                    <span>SKU: {item.sku}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{item.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${item.total.toLocaleString()}</div>
                  {item.discount > 0 && (
                    <div className="text-sm text-green-600">Ahorro: ${item.discount.toLocaleString()}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Cantidad:</span>
                  <div className="font-medium">{item.quantity} unidades</div>
                </div>
                <div>
                  <span className="text-gray-600">Precio Unitario:</span>
                  <div className="font-medium">${item.unitPrice.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Subtotal:</span>
                  <div className="font-medium">${item.subtotal.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <div className="font-bold text-provender-primary">${item.total.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{order.items.length}</div>
                <div className="text-sm text-gray-600">Productos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="text-sm text-gray-600">Unidades</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${order.totalDiscounts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Ahorrado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-provender-primary">${order.total.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Final</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <Link href="/cliente/pedido/nuevo" className="flex-1 btn-primary text-center">
          Repetir Pedido
        </Link>
        <button className="flex-1 btn-secondary">Descargar Factura</button>
      </div>
    </div>
  )
}
