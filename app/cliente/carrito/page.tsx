"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"

interface CartItem {
  id: string
  nombre: string
  precio: number
  cantidad: number
  imagen: string
  categoria: string
}

export default function CarritoPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      nombre: "Coca Cola 2.25L",
      precio: 850,
      cantidad: 2,
      imagen: "/placeholder.svg?height=80&width=80",
      categoria: "Bebidas",
    },
    {
      id: "2",
      nombre: "Pan Lactal Bimbo",
      precio: 420,
      cantidad: 1,
      imagen: "/placeholder.svg?height=80&width=80",
      categoria: "Panadería",
    },
    {
      id: "3",
      nombre: "Leche La Serenísima 1L",
      precio: 380,
      cantidad: 3,
      imagen: "/placeholder.svg?height=80&width=80",
      categoria: "Lácteos",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, cantidad: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Mi Carrito</h1>
        <Badge variant="secondary">{totalItems} productos</Badge>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-600 mb-4">Agrega productos desde el catálogo</p>
            <Button>Ver Catálogo</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imagen || "/placeholder.svg"}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.nombre}</h3>
                      <p className="text-sm text-gray-600">{item.categoria}</p>
                      <p className="text-lg font-bold text-[#0492C2]">${item.precio.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.cantidad - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.cantidad}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.cantidad + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} productos)</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#0492C2]">${total.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90">Proceder al Pago</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Continuar Comprando
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
