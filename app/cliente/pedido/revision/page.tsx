"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  ShoppingCart,
  Percent,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  brand: string
  originalPrice?: number
  discount?: number
}

interface Promotion {
  id: string
  title: string
  discount: number
}

interface OrderData {
  cart: CartItem[]
  deliveryDate: string
  deliveryTime: string
  observations: string
  appliedPromotions: Promotion[]
  subtotal: number
  discount: number
  total: number
}

export default function RevisionPedidoPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder")
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder))
    } else {
      router.push("/cliente/pedido/nuevo")
    }
  }, [router])

  if (!orderData) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)

    // Simular envío del pedido
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Limpiar datos temporales
    localStorage.removeItem("currentOrder")

    // Redirigir a confirmación
    router.push("/cliente/pedido/confirmado")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateIVA = () => {
    return orderData.total * 0.21 // 21% IVA
  }

  const calculateTotalWithTax = () => {
    return orderData.total + calculateIVA()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
        <div className="flex items-center space-x-3 mb-2">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Revisar Pedido</h1>
            <p className="text-sm text-gray-600">Verifica los detalles antes de confirmar</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Información de Entrega */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-provender-primary" />
            Información de Entrega
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Fecha de Entrega</p>
                <p className="text-sm text-gray-600 capitalize">{formatDate(orderData.deliveryDate)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Horario</p>
                <p className="text-sm text-gray-600">{orderData.deliveryTime}</p>
              </div>
            </div>

            {orderData.observations && (
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Observaciones</p>
                  <p className="text-sm text-gray-600">{orderData.observations}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Productos del Pedido */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-provender-primary" />
            Productos ({orderData.cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h3>

          <div className="space-y-3">
            {orderData.cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.brand}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                    <span className="text-sm font-medium text-provender-primary">${item.price}</span>
                    <span className="text-xs text-gray-500">
                      x {item.quantity} {item.unit}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                  {item.discount && <p className="text-xs text-green-600">-{item.discount}% aplicado</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promociones Aplicadas */}
        {orderData.appliedPromotions.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
              <Percent className="w-5 h-5 mr-2" />
              Promociones Aplicadas
            </h3>
            <div className="space-y-2">
              {orderData.appliedPromotions.map((promo) => (
                <div key={promo.id} className="flex items-center justify-between">
                  <span className="text-sm text-green-700">{promo.title}</span>
                  <span className="text-sm font-medium text-green-700">-{promo.discount}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumen de Facturación */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-provender-primary" />
            Resumen de Facturación
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${orderData.subtotal.toLocaleString()}</span>
            </div>

            {orderData.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Descuentos aplicados</span>
                <span className="font-medium text-green-600">-${orderData.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal con descuentos</span>
              <span className="font-medium">${orderData.total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">IVA (21%)</span>
              <span className="font-medium">${calculateIVA().toLocaleString()}</span>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Final</span>
                <span className="text-xl font-bold text-provender-primary">
                  ${calculateTotalWithTax().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Información Importante</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• El pedido será procesado una vez confirmado</li>
                <li>• Recibirás una notificación cuando esté en camino</li>
                <li>• El tiempo de entrega puede variar según la zona</li>
                <li>• Los precios incluyen IVA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="space-y-3 pb-6">
          <button
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full bg-provender-primary text-white py-4 rounded-lg font-semibold hover:bg-provender-accent transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Procesando Pedido...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirmar Pedido
              </>
            )}
          </button>

          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Volver a Editar
          </button>
        </div>
      </div>
    </div>
  )
}
