"use client"

import { useState } from "react"
import { Gift, Percent, Package, Plus } from "lucide-react"

interface Promotion {
  id: string
  title: string
  description: string
  type: "descuento" | "combo" | "cantidad"
  discount: number
  validUntil: string
  products: string[]
  image: string
  canAddDirectly: boolean
  specificProducts?: Array<{
    id: string
    name: string
    quantity: number
  }>
}

const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "2x1 en Coca Cola 500ml",
    description: "Llevá 2 Coca Cola 500ml y pagá solo 1. Oferta específica.",
    type: "combo",
    discount: 50,
    validUntil: "2024-01-31",
    products: ["Coca Cola 500ml"],
    image: "/placeholder.svg?height=120&width=120",
    canAddDirectly: true,
    specificProducts: [{ id: "1", name: "Coca Cola 500ml", quantity: 2 }],
  },
  {
    id: "2",
    title: "15% OFF Golosinas",
    description: "Descuento del 15% en toda la línea de golosinas y chocolates.",
    type: "descuento",
    discount: 15,
    validUntil: "2024-01-25",
    products: ["Alfajores", "Chocolates", "Caramelos"],
    image: "/placeholder.svg?height=120&width=120",
    canAddDirectly: false,
  },
  {
    id: "3",
    title: "2x1 en Gaseosas",
    description: "Llevá 2 gaseosas y pagá solo 1. Válido para todas las marcas.",
    type: "combo",
    discount: 50,
    validUntil: "2024-02-15",
    products: ["Coca Cola", "Pepsi", "Sprite"],
    image: "/placeholder.svg?height=120&width=120",
    canAddDirectly: false,
  },
  {
    id: "4",
    title: "3x2 Alfajores Havanna",
    description: "Comprá 3 alfajores Havanna y llevate el tercero gratis.",
    type: "combo",
    discount: 33,
    validUntil: "2024-02-10",
    products: ["Alfajores Havanna"],
    image: "/placeholder.svg?height=120&width=120",
    canAddDirectly: true,
    specificProducts: [{ id: "15", name: "Alfajor Havanna Chocolate", quantity: 3 }],
  },
]

export default function PromocionesPage() {
  const [cart, setCart] = useState<any[]>([])

  const addPromotionToCart = (promotion: Promotion) => {
    if (!promotion.canAddDirectly || !promotion.specificProducts) return

    // Obtener carrito actual
    const currentCart = JSON.parse(localStorage.getItem("clienteCart") || "[]")

    // Agregar productos de la promoción
    promotion.specificProducts.forEach((promoProduct) => {
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === promoProduct.id)

      if (existingItemIndex >= 0) {
        // Si ya existe, aumentar cantidad
        currentCart[existingItemIndex].quantity += promoProduct.quantity
      } else {
        // Si no existe, agregarlo
        const newItem = {
          id: promoProduct.id,
          name: promoProduct.name,
          price: promoProduct.id === "1" ? 120 : 85, // Precios mock
          quantity: promoProduct.quantity,
          unit: "unidad",
          brand: promoProduct.name.includes("Coca Cola") ? "Coca Cola" : "Havanna",
          promoText: promotion.title,
        }
        currentCart.push(newItem)
      }
    })

    // Guardar en localStorage
    localStorage.setItem("clienteCart", JSON.stringify(currentCart))

    // Disparar evento para actualizar el header
    window.dispatchEvent(new Event("cartUpdated"))

    // Mostrar feedback visual (opcional)
    alert(`¡${promotion.title} agregada al carrito!`)
  }

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case "descuento":
        return <Percent className="w-6 h-6" />
      case "combo":
        return <Gift className="w-6 h-6" />
      case "cantidad":
        return <Package className="w-6 h-6" />
      default:
        return <Gift className="w-6 h-6" />
    }
  }

  const getPromotionColor = (type: string) => {
    switch (type) {
      case "descuento":
        return "bg-provender-accent"
      case "combo":
        return "bg-provender-primary"
      case "cantidad":
        return "bg-provender-warm"
      default:
        return "bg-provender-primary"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Promociones Activas</h1>
        <p className="text-gray-600">Aprovechá las mejores ofertas disponibles</p>
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {mockPromotions.map((promotion) => (
          <div key={promotion.id} className="card">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={promotion.image || "/placeholder.svg"}
                    alt={promotion.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{promotion.title}</h3>
                  <div className={`${getPromotionColor(promotion.type)} text-white p-2 rounded-lg`}>
                    {getPromotionIcon(promotion.type)}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">{promotion.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {promotion.products.slice(0, 2).map((product, index) => (
                      <span
                        key={index}
                        className="bg-provender-light/20 text-provender-primary text-xs px-2 py-1 rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                    {promotion.products.length > 2 && (
                      <span className="text-xs text-gray-500">+{promotion.products.length - 2} más</span>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-provender-primary">-{promotion.discount}%</div>
                    <div className="text-xs text-gray-500">
                      Hasta {new Date(promotion.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              {promotion.canAddDirectly ? (
                <button
                  onClick={() => addPromotionToCart(promotion)}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Promoción
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Esta promoción se aplica automáticamente al realizar tu pedido
                  </p>
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                    Se aplicará automáticamente
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
