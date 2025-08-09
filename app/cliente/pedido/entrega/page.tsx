"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react"

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

export default function EntregaPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [observations, setObservations] = useState("")

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("clienteCart")
    if (savedCart) {
      const cartData = JSON.parse(savedCart)
      setCart(cartData)

      // Si no hay productos, redirigir
      if (cartData.length === 0) {
        router.push("/cliente/pedido/nuevo")
      }
    } else {
      router.push("/cliente/pedido/nuevo")
    }
  }, [router])

  // Establecer fecha mínima (mañana)
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setDeliveryDate(tomorrow.toISOString().split("T")[0])
  }, [])

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const handleContinue = () => {
    if (!deliveryDate || !deliveryTime) {
      return
    }

    // Guardar datos del pedido para la pre-factura
    const orderData = {
      cart,
      deliveryDate,
      deliveryTime,
      observations,
      subtotal: calculateTotal(),
      discount: 0,
      total: calculateTotal(),
      appliedPromotions: [],
    }

    localStorage.setItem("currentOrder", JSON.stringify(orderData))
    router.push("/cliente/pedido/revision")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-16 z-40">
        <div className="flex items-center space-x-3 mb-2">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Entrega y Horario</h1>
            <p className="text-sm text-gray-600">Paso 3: Programa tu entrega</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Resumen del Pedido */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen del Pedido</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">{getTotalItems()} productos seleccionados</p>
              <p className="text-2xl font-bold text-provender-primary">${calculateTotal().toLocaleString()}</p>
            </div>
            <button
              onClick={() => router.push("/cliente/carrito")}
              className="text-provender-primary text-sm font-medium hover:underline"
            >
              Modificar pedido
            </button>
          </div>
        </div>

        {/* Información de Entrega */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Entrega</h3>

          <div className="space-y-4">
            {/* Fecha de Entrega */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha de Entrega *
              </label>
              <input
                type="date"
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
              {deliveryDate && <p className="text-sm text-gray-600 mt-1 capitalize">{formatDate(deliveryDate)}</p>}
            </div>

            {/* Horario de Entrega */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Horario Preferido *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: "08:00-12:00", label: "Mañana", time: "8:00 - 12:00", icon: "🌅" },
                  { value: "12:00-16:00", label: "Mediodía", time: "12:00 - 16:00", icon: "☀️" },
                  { value: "16:00-20:00", label: "Tarde", time: "16:00 - 20:00", icon: "🌆" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryTime === option.value
                        ? "border-provender-primary bg-provender-primary bg-opacity-5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={option.value}
                      checked={deliveryTime === option.value}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.time}</p>
                      </div>
                    </div>
                    {deliveryTime === option.value && <CheckCircle className="w-5 h-5 text-provender-primary" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Observaciones (opcional)
              </label>
              <textarea
                placeholder="Instrucciones especiales para la entrega, referencias del domicilio, etc."
                className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent resize-none"
                rows={4}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{observations.length}/500 caracteres</p>
            </div>
          </div>
        </div>

        {/* Información Importante */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Información Importante</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• La entrega se realiza de lunes a sábado</li>
                <li>• El horario es estimado, puede variar según la zona</li>
                <li>• Te notificaremos cuando el pedido esté en camino</li>
                <li>• Asegurate de que alguien esté presente para recibir el pedido</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Flotante */}
      <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
        <button
          onClick={handleContinue}
          disabled={!deliveryDate || !deliveryTime}
          className="w-full bg-provender-primary text-white py-4 rounded-lg font-semibold hover:bg-provender-accent transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {!deliveryDate || !deliveryTime ? (
            <span className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Completa fecha y horario
            </span>
          ) : (
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Revisar Pedido Final
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
