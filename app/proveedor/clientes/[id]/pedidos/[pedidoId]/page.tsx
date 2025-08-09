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
  const clientId = params.id as string
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
          <Link href={`/proveedor/clientes/${clientId}/pedidos`} className="btn-primary">
            Volver a Pedidos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/proveedor/clientes/${clientId}/pedidos`}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="text-gray-600">Detalle del pedido</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Print className="w-5 h-5" />
            <span>Imprimir</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-provender-primary text-white rounded-lg hover:bg-provender-secondary">
            <Download className="w-5 h-5" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Invoice */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Invoice Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">PROVENDER</h2>
              <p className="text-gray-600">Distribuidora Mayorista</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Datos del Cliente</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium text-gray-900">{order.client.fantasyName}</p>
                <p>{order.client.businessName}</p>
                <p>CUIT: {order.client.cuitCuil}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Datos de Entrega</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium text-gray-900">{order.branch.name}</p>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{order.branch.address}</span>
                </div>
                <p>Tel: {order.branch.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Número de Pedido</span>
                <p className="font-semibold text-gray-900">{order.orderNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">Fecha</span>
                <p className="font-semibold text-gray-900">{new Date(order.date).toLocaleDateString("es-AR")}</p>
              </div>
              <div>
                <span className="text-gray-500">Hora</span>
                <p className="font-semibold text-gray-900">
                  {new Date(order.date).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Total Items</span>
                <p className="font-semibold text-gray-900">{order.items.length} productos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Detalle de Productos</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Producto</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Cant.</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">P. Unit.</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Desc.</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          {item.brand} • {item.category}
                        </p>
                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center font-medium text-gray-900">{item.quantity}</td>
                    <td className="py-4 px-2 text-right text-gray-900">${item.unitPrice.toLocaleString()}</td>
                    <td className="py-4 px-2 text-right text-red-600">-${item.discount.toLocaleString()}</td>
                    <td className="py-4 px-2 text-right font-semibold text-gray-900">${item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="max-w-md ml-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-900">${order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Descuentos:</span>
              <span className="font-medium text-red-600">-${order.totalDiscounts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impuestos (21%):</span>
              <span className="font-medium text-gray-900">${order.taxes.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-provender-primary">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="p-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Observaciones</h3>
            <p className="text-gray-600 text-sm">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
