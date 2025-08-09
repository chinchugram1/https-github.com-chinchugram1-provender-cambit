"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, Package, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Pedido {
  id: string
  cliente: string
  direccion: string
  telefono: string
  zona: string
  fecha: string
  total: number
  productos: Array<{
    id: string
    nombre: string
    cantidad: number
    precio: number
  }>
  estado: string
  observaciones?: string
}

interface Transportista {
  id: string
  nombre: string
  zona: string
  vehiculo: string
  telefono: string
  estado: "disponible" | "ocupado" | "fuera_servicio"
}

const mockPedido: Pedido = {
  id: "PED-001",
  cliente: "Kiosco El Rápido",
  direccion: "Av. Corrientes 1234",
  telefono: "+54 11 1234-5678",
  zona: "Centro",
  fecha: "2024-01-16",
  total: 125000,
  productos: [
    { id: "P001", nombre: "Coca Cola 500ml", cantidad: 24, precio: 1200 },
    { id: "P002", nombre: "Papas Fritas", cantidad: 12, precio: 800 },
    { id: "P003", nombre: "Galletas Dulces", cantidad: 6, precio: 1500 },
  ],
  estado: "confirmado",
  observaciones: "Tocar timbre 2 veces",
}

const mockTransportistas: Transportista[] = [
  {
    id: "T001",
    nombre: "Carlos Mendez",
    zona: "Centro",
    vehiculo: "CAM-001",
    telefono: "+54 11 9876-5432",
    estado: "disponible",
  },
  {
    id: "T002",
    nombre: "Ana Rodriguez",
    zona: "Norte",
    vehiculo: "CAM-002",
    telefono: "+54 11 8765-4321",
    estado: "disponible",
  },
  {
    id: "T003",
    nombre: "Miguel Torres",
    zona: "Sur",
    vehiculo: "CAM-003",
    telefono: "+54 11 7654-3210",
    estado: "ocupado",
  },
  {
    id: "T004",
    nombre: "Luis Gomez",
    zona: "Centro",
    vehiculo: "CAM-004",
    telefono: "+54 11 6543-2109",
    estado: "disponible",
  },
]

export default function EnviarPedidoPage({ params }: { params: { pedidoId: string } }) {
  const router = useRouter()
  const [pedido] = useState<Pedido>(mockPedido)
  const [transportistas] = useState<Transportista[]>(mockTransportistas)
  const [transportistaSeleccionado, setTransportistaSeleccionado] = useState("")
  const [instrucciones, setInstrucciones] = useState("")
  const [horaEstimada, setHoraEstimada] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filtrar transportistas disponibles y sugerir por zona
  const transportistasDisponibles = transportistas.filter((t) => t.estado === "disponible")
  const transportistasZona = transportistasDisponibles.filter((t) => t.zona === pedido.zona)
  const otrosTransportistas = transportistasDisponibles.filter((t) => t.zona !== pedido.zona)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "bg-green-100 text-green-800"
      case "ocupado":
        return "bg-yellow-100 text-yellow-800"
      case "fuera_servicio":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmit = async () => {
    if (!transportistaSeleccionado) {
      alert("Debe seleccionar un transportista")
      return
    }

    if (!horaEstimada) {
      alert("Debe especificar una hora estimada de entrega")
      return
    }

    setIsSubmitting(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const transportista = transportistas.find((t) => t.id === transportistaSeleccionado)

      // Aquí se enviaría la información del envío
      console.log("Enviando pedido:", {
        pedidoId: params.pedidoId,
        transportistaId: transportistaSeleccionado,
        instrucciones,
        horaEstimada,
      })

      alert(`Pedido enviado correctamente.\nTransportista: ${transportista?.nombre}\nHora estimada: ${horaEstimada}`)
      router.push("/proveedor/pedidos")
    } catch (error) {
      alert("Error al enviar el pedido. Intente nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const transportistaInfo = transportistas.find((t) => t.id === transportistaSeleccionado)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enviar Pedido</h1>
          <p className="text-gray-600">Asigna transportista y programa la entrega</p>
        </div>
      </div>

      {/* Información del Pedido */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-provender-primary" />
              Pedido {pedido.id}
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Listo para envío</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold">{pedido.cliente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Zona</p>
              <p className="font-semibold">{pedido.zona}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold">{pedido.direccion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-provender-primary">{formatCurrency(pedido.total)}</p>
            </div>
          </div>

          {pedido.observaciones && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Observaciones:</strong> {pedido.observaciones}
              </p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Resumen de Productos</h4>
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

      {/* Selección de Transportista */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-provender-primary" />
            Asignar Transportista
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona el transportista *</label>
            <Select value={transportistaSeleccionado} onValueChange={setTransportistaSeleccionado}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar transportista" />
              </SelectTrigger>
              <SelectContent>
                {transportistasZona.length > 0 && (
                  <>
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                      Recomendados para {pedido.zona}
                    </div>
                    {transportistasZona.map((transportista) => (
                      <SelectItem key={transportista.id} value={transportista.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>
                            {transportista.nombre} - {transportista.vehiculo}
                          </span>
                          <Badge className={`ml-2 ${getEstadoColor(transportista.estado)}`}>
                            {transportista.estado}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </>
                )}

                {otrosTransportistas.length > 0 && (
                  <>
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Otros transportistas</div>
                    {otrosTransportistas.map((transportista) => (
                      <SelectItem key={transportista.id} value={transportista.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>
                            {transportista.nombre} - {transportista.vehiculo} ({transportista.zona})
                          </span>
                          <Badge className={`ml-2 ${getEstadoColor(transportista.estado)}`}>
                            {transportista.estado}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {transportistaInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Información del Transportista</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-blue-700">Nombre</p>
                  <p className="font-semibold text-blue-900">{transportistaInfo.nombre}</p>
                </div>
                <div>
                  <p className="text-blue-700">Vehículo</p>
                  <p className="font-semibold text-blue-900">{transportistaInfo.vehiculo}</p>
                </div>
                <div>
                  <p className="text-blue-700">Teléfono</p>
                  <p className="font-semibold text-blue-900">{transportistaInfo.telefono}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detalles de Entrega */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-provender-primary" />
            Detalles de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora estimada de entrega *</label>
            <input
              type="time"
              value={horaEstimada}
              onChange={(e) => setHoraEstimada(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrucciones especiales para el transportista
            </label>
            <Textarea
              placeholder="Ej: Tocar timbre 2 veces, entrada por el costado, llamar antes de llegar..."
              value={instrucciones}
              onChange={(e) => setInstrucciones(e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={() => router.back()} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!transportistaSeleccionado || !horaEstimada || isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Enviando..." : "Confirmar Envío"}
        </Button>
      </div>

      {/* Información */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Información</h4>
              <p className="text-sm text-blue-700">
                Al confirmar el envío, el pedido cambiará a estado "En Calle" y se notificará tanto al transportista
                como al cliente con los detalles de la entrega.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
