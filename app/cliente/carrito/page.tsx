"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, ArrowRight, Percent, Gift } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  brand: string
  originalPrice?: number
  discount?: number
  promoText?: string
}

interface Promotion {
  id: string
  type: "descuento" | "combo" | "cantidad"
  title: string
  description: string
  discount: number
  conditions: {
    productIds?: string[]
    minQuantity?: number
    categories?: string[]
  }
  autoApply: boolean
}

const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    type: "cantidad",
    title: "Promo Coca Cola",
    description: "Comprá 4 Coca Cola 500ml y obtené 5% de descuento adicional",
    discount: 5,
    conditions: {
      productIds: ["1"],
      minQuantity: 4,
    },
    autoApply: true,
  },
  {
    id: "promo2",
    type: "descuento",
    title: "15% OFF Golosinas",
    description: "Descuento del 15% en toda la línea de golosinas",
    discount: 15,
    conditions: {
      categories: ["golosinas"],
    },
    autoApply: true,
  },
]

export default function CarritoPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [appliedPromotions, setAppliedPromotions] = useState<Promotion[]>([])

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("clienteCart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Verificar promociones automáticas
  useEffect(() => {
    checkPromotions()
  }, [cart])

  // Guardar carrito en localStorage y notificar cambios
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem("clienteCart", JSON.stringify(newCart))
    // Disparar evento para actualizar el header
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const addToCart = (productId: string) => {
    const newCart = cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    updateCart(newCart)
  }

  const removeFromCart = (productId: string) => {
    const newCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
      .filter((item) => item.quantity > 0)
    updateCart(newCart)
  }

  const removeItemCompletely = (productId: string) => {
    const newCart = cart.filter((item) => item.id !== productId)
    updateCart(newCart)
  }

  const checkPromotions = () => {
    const newAppliedPromotions: Promotion[] = []

    mockPromotions.forEach((promo) => {
      if (promo.autoApply && promo.type === "cantidad" && promo.conditions.productIds && promo.conditions.minQuantity) {
        const productQuantity = cart
          .filter((item) => promo.conditions.productIds!.includes(item.id))
          .reduce((sum, item) => sum + item.quantity, 0)

        if (productQuantity >= promo.conditions.minQuantity) {
          newAppliedPromotions.push(promo)
        }
      }
    })

    setAppliedPromotions(newAppliedPromotions)
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateDiscount = () => {
    let totalDiscount = 0

    appliedPromotions.forEach((promo) => {
      if (promo.conditions.productIds) {
        const applicableItems = cart.filter((item) => promo.conditions.productIds!.includes(item.id))
        const applicableAmount = applicableItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        totalDiscount += applicableAmount * (promo.discount / 100)
      }
    })

    return totalDiscount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getUniqueItemsCount = () => {
    return cart.length
  }

  const handleContinue = () => {
    router.push("/cliente/pedido/entrega")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agrega productos para comenzar tu pedido</p>
          <Link
            href="/cliente/pedido/nuevo"
            className="bg-provender-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-provender-accent transition-colors"
          >
            Comenzar a Comprar
          </Link>
        </div>
      </div>
    )
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
            <h1 className="text-xl font-bold text-gray-900">Mi Carrito</h1>
            <p className="text-sm text-gray-600">Paso 2: Revisa tu pedido</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Promociones Aplicadas */}
        {appliedPromotions.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Percent className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Promociones Aplicadas</h4>
            </div>
            {appliedPromotions.map((promo) => (
              <div key={promo.id} className="text-sm text-green-700">
                • {promo.title} - {promo.discount}% OFF adicional
              </div>
            ))}
          </div>
        )}

        {/* Productos en el Carrito */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Productos ({getTotalItems()} items)</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={`/placeholder.svg?height=60&width=60&text=${encodeURIComponent(item.name.split(" ")[0])}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.brand}</p>

                    <div className="flex items-center space-x-2 mt-1">
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                      <span className="text-lg font-bold text-provender-primary">${item.price}</span>
                      <span className="text-sm text-gray-500">por {item.unit}</span>
                    </div>

                    {item.promoText && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Gift className="w-3 h-3 text-orange-600" />
                        <span className="text-xs text-orange-600 font-medium">{item.promoText}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-8 h-8 rounded-full bg-provender-primary text-white flex items-center justify-center hover:bg-provender-accent transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItemCompletely(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de Precios */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({getTotalItems()} productos)</span>
              <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Descuentos aplicados</span>
                <span className="font-medium text-green-600">-${calculateDiscount().toLocaleString()}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-provender-primary">${calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuar Comprando */}
        <div className="text-center">
          <Link href="/cliente/pedido/nuevo" className="text-provender-primary font-medium hover:underline">
            ← Continuar comprando
          </Link>
        </div>
      </div>

      {/* Botón Flotante */}
      <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
        <button
          onClick={handleContinue}
          className="w-full bg-provender-primary text-white py-4 rounded-lg font-semibold hover:bg-provender-accent transition-colors flex items-center justify-center"
        >
          Continuar con Entrega y Horario
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
