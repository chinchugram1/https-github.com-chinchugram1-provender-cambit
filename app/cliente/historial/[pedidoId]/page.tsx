"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, MapPin, Clock, User, Phone, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface PedidoDetalle {
  id: string
  fecha: string
  estado: string
  total: number
  direccion: string
  transportista: {
    nombre: string
    telefono: string
    vehiculo: string
  }
  items: Array<{
    id: string
    nombre: string
    cantidad: number
    precio: number
    imagen: string
  }>
  timeline: Array<{
    estado: string
    fecha: string
    descripcion: string
    completado: boolean
  }>
}

export default function PedidoDetallePage({ params }: { params: { pedidoId: string } }) {
  const router = useRouter()
  const [rating, setRating] = useState(0)

  // Mock data - en producción vendría de la API
  const pedido: PedidoDetalle = {
    id: params.pedidoId,
    fecha: "2024-01-15T10:30:00",
    estado: "Entregado",
    total: 2850,
    direccion: "Av. Corrientes 1234, CABA",
    transportista: {
      nombre: "Carlos Rodríguez",
      telefono: "+54 11 9876-5432",
      vehiculo: "Moto Honda CG 150",
    },
    items: [
      {
        id: "1",
        nombre: "Coca Cola 2.25L",
        cantidad: 2,
        precio: 850,
        imagen: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        nombre: "Pan Lactal Bimbo",
        cantidad: 1,
        precio: 420,
        imagen: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        nombre: "Leche La Serenísima 1L",
        cantidad: 3,
        precio: 380,
        imagen: "/placeholder.svg?height=60&width=60",
      },
    ],
    timeline: [
      {
        estado: "Pedido Realizado",
        fecha: "2024-01-15T10:30:00",
        descripcion: "Tu pedido ha sido recibido y está siendo procesado",
        completado: true,
      },
      {
        estado: "Confirmado",
        fecha: "2024-01-15T10:45:00",
        descripcion: "El proveedor ha confirmado tu pedido",
        completado: true,
      },
      {
        estado: "En Preparación",
        fecha: "2024-01-15T11:00:00",
        descripcion: "Tu pedido está siendo preparado para el envío",
        completado: true,
      },
      {
        estado: "En Camino",
        fecha: "2024-01-15T11:30:00",
        descripcion: "Tu pedido está en camino con el transportista",
        completado: true,
      },
      {
        estado: "Entregado",
        fecha: "2024-01-15T12:15:00",
        descripcion: "Tu pedido ha sido entregado exitosamente",
        completado: true,
      },
    ],
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "En Camino":
        return "bg-blue-100 text-blue-800"
      case "Confirmado":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Pedido {pedido.id}</h1>
          <p className="text-gray-600">Realizado el {new Date(pedido.fecha).toLocaleDateString()}</p>
        </div>
        <Badge className={getStatusColor(pedido.estado)}>{pedido.estado}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Estado del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pedido.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-4 h-4 rounded-full mt-1 ${item.completado ? "bg-green-500" : "bg-gray-300"}`} />
                    <div className="flex-1">
                      <p className={`font-semibold ${item.completado ? "text-green-700" : "text-gray-500"}`}>
                        {item.estado}
                      </p>
                      <p className="text-sm text-gray-600">{item.descripcion}</p>
                      <p className="text-xs text-gray-500">{new Date(item.fecha).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Items del Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pedido.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.imagen || "/placeholder.svg"}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.nombre}</h3>
                      <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.precio * item.cantidad).toLocaleString()}</p>
                      <p className="text-sm text-gray-600">${item.precio.toLocaleString()} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Resumen */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${pedido.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#0492C2]">${pedido.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Entrega */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Información de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Dirección</p>
                <p className="text-sm text-gray-600">{pedido.direccion}</p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Transportista
                </p>
                <p className="text-sm">{pedido.transportista.nombre}</p>
                <p className="text-sm text-gray-600">{pedido.transportista.vehiculo}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {pedido.transportista.telefono}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calificación */}
          {pedido.estado === "Entregado" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Calificar Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
                <Button className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90">Enviar Calificación</Button>
              </CardContent>
            </Card>
          )}

          {/* Acciones */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Repetir Pedido
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Descargar Factura
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Reportar Problema
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
