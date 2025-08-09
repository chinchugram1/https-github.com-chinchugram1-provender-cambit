"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertTriangle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Pedido {
  id: string
  cliente: string
  fecha: string
  total: number
  productos: Array<{
    id: string
    nombre: string
    cantidad: number
    precio: number
  }>
  estado: string
}

const mockPedido: Pedido = {
  id: "PED-001",
  cliente: "Kiosco El Rápido",
  fecha: "2024-01-16",
  total: 125000,
  productos: [
    { id: "P001", nombre: "Coca Cola 500ml", cantidad: 24, precio: 1200 },
    { id: "P002", nombre: "Papas Fritas", cantidad: 12, precio: 800 },
    { id: "P003", nombre: "Galletas Dulces", cantidad: 6, precio: 1500 },
  ],
  estado: "pendiente",
}

const motivosRechazo = [
  "Stock insuficiente",
  "Producto descontinuado",
  "Cliente con deuda vencida",
  "Dirección de entrega incorrecta",
  "Pedido duplicado",
  "Fuera de zona de reparto",
  "Horario de entrega no disponible",
  "Otros",
]

export default function RechazarPedidoPage({ params }: { params: { pedidoId: string } }) {
  const router = useRouter()
  const [pedido] = useState<Pedido>(mockPedido)
  const [motivoSeleccionado, setMotivoSeleccionado] = useState("")
  const [comentarios, setComentarios] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = async () => {
    if (!motivoSeleccionado) {
      alert("Debe seleccionar un motivo de rechazo")
      return
    }

    if (motivoSeleccionado === "Otros" && !comentarios.trim()) {
      alert("Debe especificar el motivo en los comentarios")
      return
    }

    setIsSubmitting(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí se enviaría la información del rechazo
      console.log("Rechazando pedido:", {
        pedidoId: params.pedidoId,
        motivo: motivoSeleccionado,
        comentarios,
      })

      alert("Pedido rechazado correctamente. Se notificará al cliente.")
      router.push("/proveedor/pedidos")
    } catch (error) {
      alert("Error al rechazar el pedido. Intente nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rechazar Pedido</h1>
          <p className="text-gray-600">Especifica el motivo del rechazo</p>
        </div>
      </div>

      {/* Información del Pedido */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Pedido {pedido.id}
            </CardTitle>
            <Badge variant="destructive">Rechazando</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold">{pedido.cliente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="font-semibold">{new Date(pedido.fecha).toLocaleDateString("es-AR")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-provender-primary">{formatCurrency(pedido.total)}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Productos del Pedido</h4>
            <div className="space-y-2">
              {pedido.productos.map((producto) => (
                <div key={producto.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-600">Cantidad: {producto.cantidad}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(producto.precio * producto.cantidad)}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivo de Rechazo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <X className="w-5 h-5 text-red-500" />
            Motivo de Rechazo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona el motivo del rechazo *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {motivosRechazo.map((motivo) => (
                <label key={motivo} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="motivo"
                    value={motivo}
                    checked={motivoSeleccionado === motivo}
                    onChange={(e) => setMotivoSeleccionado(e.target.value)}
                    className="text-provender-primary focus:ring-provender-primary"
                  />
                  <span className="text-sm">{motivo}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios adicionales {motivoSeleccionado === "Otros" && "*"}
            </label>
            <Textarea
              placeholder={
                motivoSeleccionado === "Otros"
                  ? "Especifica el motivo del rechazo..."
                  : "Información adicional para el cliente (opcional)..."
              }
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {motivoSeleccionado === "Otros" && !comentarios.trim() && (
            <p className="text-sm text-red-600">Los comentarios son obligatorios cuando seleccionas "Otros"</p>
          )}
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={() => router.back()} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!motivoSeleccionado || isSubmitting || (motivoSeleccionado === "Otros" && !comentarios.trim())}
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          {isSubmitting ? "Rechazando..." : "Confirmar Rechazo"}
        </Button>
      </div>

      {/* Advertencia */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Importante</h4>
              <p className="text-sm text-yellow-700">
                Al rechazar este pedido, se enviará una notificación automática al cliente con el motivo especificado.
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
