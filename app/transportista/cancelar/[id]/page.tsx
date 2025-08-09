"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertTriangle, X, MapPin, Package, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Entrega {
  id: string
  pedidoId: string
  cliente: string
  direccion: string
  telefono: string
  productos: number
  total: number
  horaEstimada: string
  observaciones?: string
  estado: string
}

const mockEntrega: Entrega = {
  id: "ENT-001",
  pedidoId: "PED-001",
  cliente: "Kiosco El Rápido",
  direccion: "Av. Corrientes 1234",
  telefono: "+54 11 1234-5678",
  productos: 15,
  total: 125000,
  horaEstimada: "14:30",
  observaciones: "Tocar timbre 2 veces",
  estado: "en_camino",
}

const motivosCancelacion = [
  "Cliente no se encuentra",
  "Dirección incorrecta o inexistente",
  "Cliente rechaza el pedido",
  "Problemas con el vehículo",
  "Condiciones climáticas adversas",
  "Zona peligrosa o inaccesible",
  "Horario fuera del acordado",
  "Otros",
]

export default function CancelarEntregaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [entrega] = useState<Entrega>(mockEntrega)
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
      alert("Debe seleccionar un motivo de cancelación")
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

      // Aquí se enviaría la información de la cancelación
      console.log("Cancelando entrega:", {
        entregaId: params.id,
        motivo: motivoSeleccionado,
        comentarios,
      })

      alert("Entrega cancelada correctamente. Se notificará al proveedor.")
      router.push("/transportista/ruta")
    } catch (error) {
      alert("Error al cancelar la entrega. Intente nuevamente.")
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
          <h1 className="text-2xl font-bold text-gray-900">Cancelar Entrega</h1>
          <p className="text-gray-600">Reporta el motivo de la cancelación</p>
        </div>
      </div>

      {/* Información de la Entrega */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-red-500" />
              Entrega {entrega.id}
            </CardTitle>
            <Badge variant="destructive">Cancelando</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold">{entrega.cliente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pedido</p>
              <p className="font-semibold">{entrega.pedidoId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hora Estimada</p>
              <p className="font-semibold">{entrega.horaEstimada}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-provender-primary">{formatCurrency(entrega.total)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold">{entrega.direccion}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <User className="w-4 h-4 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-semibold">{entrega.telefono}</p>
            </div>
          </div>

          {entrega.observaciones && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Observaciones:</strong> {entrega.observaciones}
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <strong>Productos:</strong> {entrega.productos} items
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Motivo de Cancelación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <X className="w-5 h-5 text-red-500" />
            Motivo de Cancelación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona el motivo de la cancelación *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {motivosCancelacion.map((motivo) => (
                <label key={motivo} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
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
                  ? "Especifica el motivo de la cancelación..."
                  : "Información adicional sobre la cancelación (opcional)..."
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
          Volver a Ruta
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!motivoSeleccionado || isSubmitting || (motivoSeleccionado === "Otros" && !comentarios.trim())}
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          {isSubmitting ? "Cancelando..." : "Confirmar Cancelación"}
        </Button>
      </div>

      {/* Advertencia */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800">Importante</h4>
              <p className="text-sm text-red-700">
                Al cancelar esta entrega, se notificará inmediatamente al proveedor y al cliente. El pedido volverá al
                estado de preparación para ser reprogramado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
