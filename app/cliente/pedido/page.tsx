"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, Send, MapPin, Clock } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  promotion?: {
    type: string
    discount: number
  }
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Coca Cola 500ml",
    price: 450,
    quantity: 2,
    image: "/placeholder.svg?height=60&width=60",
    promotion: { type: "descuento", discount: 10 },
  },
  {
    id: "2",
    name: "Alfajor Havanna",
    price: 320,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    name: "Papas Fritas Lays",
    price: 380,
    quantity: 3,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function PedidoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("45-60 min")

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const getItemTotal = (item: CartItem) => {
    const basePrice = item.price * item.quantity
    if (item.promotion) {
      return basePrice * (1 - item.promotion.discount / 100)
    }
    return basePrice
  }

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0)
  }

  const getTotal = () => {
    return getSubtotal() // En el futuro se pueden agregar impuestos o costos de envío
  }

  const handleSendOrder = () => {
    // Aquí se enviaría el pedido al proveedor
    alert("Pedido enviado correctamente!")
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agregá productos desde el catálogo para crear tu pedido</p>
          <button className="btn-primary">Ver Catálogo</button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mi Pedido</h1>
        <p className="text-gray-600">Revisá tu pedido antes de enviarlo</p>
      </div>

      {/* Estimated Time */}
      <div className="card bg-provender-light/10 border-provender-light">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tiempo estimado de armado</h3>
            <p className="text-provender-primary font-medium">{estimatedTime}</p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Productos ({cartItems.length})</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex space-x-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {item.promotion ? (
                    <div>
                      <span className="text-provender-primary font-semibold">
                        ${(item.price * (1 - item.promotion.discount / 100)).toFixed(0)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">${item.price}</span>
                    </div>
                  ) : (
                    <span className="text-gray-900 font-semibold">${item.price}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-provender-primary text-white flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-900">${getItemTotal(item).toFixed(0)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-3">
          <MapPin className="w-5 h-5 text-provender-primary" />
          <h3 className="font-semibold text-gray-900">Dirección de entrega</h3>
        </div>
        <input
          type="text"
          placeholder="Ingresá tu dirección completa"
          className="input-field"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-3">Notas adicionales</h3>
        <textarea
          placeholder="Agregá cualquier comentario sobre tu pedido..."
          className="input-field resize-none"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Order Summary */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-4">Resumen del pedido</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${getSubtotal().toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span>${getTotal().toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Send Order Button */}
      <div className="pb-6">
        <button
          onClick={handleSendOrder}
          disabled={!deliveryAddress}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Enviar Pedido</span>
        </button>
      </div>
    </div>
  )
}
