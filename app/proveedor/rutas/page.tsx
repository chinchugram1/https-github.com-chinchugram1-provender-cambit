"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Eye, MapPin, User, X, Package, Calendar, GripVertical, UserCheck, Route, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data para pedidos en preparación
const mockPedidosEnPreparacion = [
  {
    id: "PED-001",
    cliente: "Kiosco El Rápido",
    direccion: "Av. Corrientes 1234",
    zona: "Centro",
    fecha: "2024-01-16",
    productos: 15,
    total: 125000,
    transportista: "Carlos Mendez",
    orden: 1,
    telefono: "+54 11 1234-5678",
    observaciones: "Tocar timbre 2 veces",
  },
  {
    id: "PED-002",
    cliente: "Almacén Don Pedro",
    direccion: "San Martín 567",
    zona: "Centro",
    fecha: "2024-01-16",
    productos: 8,
    total: 89500,
    transportista: "Carlos Mendez",
    orden: 2,
    telefono: "+54 11 2345-6789",
    observaciones: "",
  },
  {
    id: "PED-003",
    cliente: "Supermercado La Esquina",
    direccion: "Av. Rivadavia 890",
    zona: "Sur",
    fecha: "2024-01-16",
    productos: 32,
    total: 245000,
    transportista: "Miguel Torres",
    orden: 1,
    telefono: "+54 11 3456-7890",
    observaciones: "Entrada por el costado",
  },
  {
    id: "PED-004",
    cliente: "Kiosco Central",
    direccion: "Av. 9 de Julio 456",
    zona: "Norte",
    fecha: "2024-01-16",
    productos: 22,
    total: 68900,
    transportista: "Ana Rodriguez",
    orden: 1,
    telefono: "+54 11 4567-8901",
    observaciones: "Llamar antes de llegar",
  },
  {
    id: "PED-005",
    cliente: "Minimarket Los Pinos",
    direccion: "Belgrano 123",
    zona: "Norte",
    fecha: "2024-01-16",
    productos: 18,
    total: 98000,
    transportista: "Ana Rodriguez",
    orden: 2,
    telefono: "+54 11 5678-9012",
    observaciones: "",
  },
  {
    id: "PED-006",
    cliente: "Almacén Familiar",
    direccion: "Av. Libertador 678",
    zona: "Oeste",
    fecha: "2024-01-17",
    productos: 24,
    total: 156000,
    transportista: "Luis Gomez",
    orden: 1,
    telefono: "+54 11 6789-0123",
    observaciones: "Horario: 14:00-16:00",
  },
]

// Mock data para transportistas
const mockTransportistas = [
  { id: "T001", nombre: "Carlos Mendez", zona: "Centro", vehiculo: "CAM-001" },
  { id: "T002", nombre: "Ana Rodriguez", zona: "Norte", vehiculo: "CAM-002" },
  { id: "T003", nombre: "Miguel Torres", zona: "Sur", vehiculo: "CAM-003" },
  { id: "T004", nombre: "Luis Gomez", zona: "Oeste", vehiculo: "CAM-004" },
  { id: "T005", nombre: "Sofia Martinez", zona: "Este", vehiculo: "CAM-005" },
]

export default function RutasPage() {
  const [pedidos, setPedidos] = useState(mockPedidosEnPreparacion)
  const [transportistas] = useState(mockTransportistas)
  const [selectedDate, setSelectedDate] = useState("2024-01-16")
  const [selectedZone, setSelectedZone] = useState("todas")
  const [editingTransportista, setEditingTransportista] = useState<string | null>(null)

  // Agrupar pedidos por fecha y zona
  const pedidosAgrupados = pedidos.reduce(
    (acc, pedido) => {
      if (!acc[pedido.fecha]) {
        acc[pedido.fecha] = {}
      }
      if (!acc[pedido.fecha][pedido.zona]) {
        acc[pedido.fecha][pedido.zona] = []
      }
      acc[pedido.fecha][pedido.zona].push(pedido)
      return acc
    },
    {} as Record<string, Record<string, typeof pedidos>>,
  )

  // Ordenar pedidos por orden dentro de cada zona
  Object.keys(pedidosAgrupados).forEach((fecha) => {
    Object.keys(pedidosAgrupados[fecha]).forEach((zona) => {
      pedidosAgrupados[fecha][zona].sort((a, b) => a.orden - b.orden)
    })
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoy"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana"
    } else {
      return date.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // Verificar que tenemos los datos necesarios
    if (!source?.droppableId || !destination?.droppableId) return

    const [sourceZone, sourceDate] = source.droppableId.split("-")
    const [destZone, destDate] = destination.droppableId.split("-")

    // Solo permitir reordenar dentro de la misma zona y fecha
    if (sourceZone !== destZone || sourceDate !== destDate) return
    if (source.index === destination.index) return

    // Crear una copia del array de pedidos
    const newPedidos = [...pedidos]

    // Obtener los pedidos de la zona específica ordenados
    const zonePedidos = newPedidos
      .filter((p) => p.zona === sourceZone && p.fecha === sourceDate)
      .sort((a, b) => a.orden - b.orden)

    // Verificar que tenemos pedidos en la zona
    if (zonePedidos.length === 0) return

    // Reordenar los pedidos
    const [movedPedido] = zonePedidos.splice(source.index, 1)
    if (!movedPedido) return

    zonePedidos.splice(destination.index, 0, movedPedido)

    // Actualizar los órdenes en el array original
    zonePedidos.forEach((pedido, index) => {
      const pedidoIndex = newPedidos.findIndex((p) => p.id === pedido.id)
      if (pedidoIndex !== -1) {
        newPedidos[pedidoIndex] = { ...newPedidos[pedidoIndex], orden: index + 1 }
      }
    })

    // Forzar re-render
    setPedidos([...newPedidos])
  }

  const changeTransportista = (pedidoId: string, transportistaId: string) => {
    const transportista = transportistas.find((t) => t.id === transportistaId)
    if (transportista) {
      setPedidos((prev) => prev.map((p) => (p.id === pedidoId ? { ...p, transportista: transportista.nombre } : p)))
    }
    setEditingTransportista(null)
  }

  const createRoute = (zona: string, fecha: string) => {
    const zonePedidos = pedidosAgrupados[fecha]?.[zona] || []
    const transportista = zonePedidos[0]?.transportista || "Sin asignar"

    if (zonePedidos.length === 0) {
      alert("No hay pedidos en esta zona para crear una ruta")
      return
    }

    // Aquí se crearía la ruta y se cambiarían los pedidos a estado "en_calle"
    alert(
      `Ruta creada para ${zona} - ${formatDate(fecha)}\nTransportista: ${transportista}\nPedidos: ${zonePedidos.length}`,
    )
  }

  // Filtrar fechas disponibles
  const fechasDisponibles = Object.keys(pedidosAgrupados).sort()

  // Filtrar por fecha seleccionada
  const pedidosFiltrados =
    selectedDate === "todas" ? pedidosAgrupados : { [selectedDate]: pedidosAgrupados[selectedDate] || {} }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Armado de Rutas</h1>
        <p className="text-gray-600">Organiza los pedidos en preparación por zona y transportista</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las fechas</SelectItem>
                  {fechasDisponibles.map((fecha) => (
                    <SelectItem key={fecha} value={fecha}>
                      {formatDate(fecha)} ({fecha})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las zonas</SelectItem>
                  <SelectItem value="Centro">Centro</SelectItem>
                  <SelectItem value="Norte">Norte</SelectItem>
                  <SelectItem value="Sur">Sur</SelectItem>
                  <SelectItem value="Este">Este</SelectItem>
                  <SelectItem value="Oeste">Oeste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pedidos Agrupados */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          {Object.entries(pedidosFiltrados).map(([fecha, zonas]) => (
            <div key={fecha}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-provender-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {formatDate(fecha)} - {fecha}
                </h2>
              </div>

              <div className="grid gap-4">
                {Object.entries(zonas)
                  .filter(([zona]) => selectedZone === "todas" || zona === selectedZone)
                  .map(([zona, pedidosZona]) => {
                    const totalPedidos = pedidosZona.length
                    const totalMonto = pedidosZona.reduce((sum, p) => sum + p.total, 0)
                    const transportista = pedidosZona[0]?.transportista || "Sin asignar"

                    return (
                      <Card key={`${fecha}-${zona}`} className="border-l-4 border-l-provender-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-provender-primary" />
                              <CardTitle className="text-lg">Zona {zona}</CardTitle>
                              <Badge variant="outline">
                                {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right text-sm">
                                <p className="font-semibold text-provender-primary">{formatCurrency(totalMonto)}</p>
                                <p className="text-gray-600">Total zona</p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => createRoute(zona, fecha)}
                              >
                                <Route className="w-4 h-4 mr-1" />
                                Confirmar Ruta
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>
                              Transportista: <strong>{transportista}</strong>
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <Droppable droppableId={`${zona}-${fecha}`}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`space-y-2 min-h-[100px] p-2 rounded-lg transition-colors ${
                                  snapshot.isDraggingOver ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                                }`}
                              >
                                {pedidosZona.map((pedido, index) => (
                                  <Draggable key={pedido.id} draggableId={pedido.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`bg-white rounded-lg border p-4 transition-shadow ${
                                          snapshot.isDragging ? "shadow-lg" : "shadow-sm hover:shadow-md"
                                        }`}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div
                                            {...provided.dragHandleProps}
                                            className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab"
                                          >
                                            <GripVertical className="w-5 h-5" />
                                          </div>

                                          <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <h4 className="font-semibold text-gray-900">
                                                  {pedido.orden}. {pedido.cliente}
                                                </h4>
                                                <p className="text-sm text-gray-600">{pedido.id}</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-semibold text-provender-primary">
                                                  {formatCurrency(pedido.total)}
                                                </p>
                                                <p className="text-sm text-gray-600">{pedido.productos} productos</p>
                                              </div>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600">
                                              <MapPin className="w-4 h-4 mr-1" />
                                              {pedido.direccion}
                                            </div>

                                            {pedido.observaciones && (
                                              <div className="text-sm bg-yellow-50 text-yellow-800 p-2 rounded">
                                                <strong>Obs:</strong> {pedido.observaciones}
                                              </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                {editingTransportista === pedido.id ? (
                                                  <div className="flex items-center gap-2">
                                                    <Select
                                                      onValueChange={(value) => changeTransportista(pedido.id, value)}
                                                    >
                                                      <SelectTrigger className="w-48">
                                                        <SelectValue placeholder="Seleccionar transportista" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                        {transportistas.map((t) => (
                                                          <SelectItem key={t.id} value={t.id}>
                                                            {t.nombre} - {t.zona}
                                                          </SelectItem>
                                                        ))}
                                                      </SelectContent>
                                                    </Select>
                                                    <Button
                                                      size="sm"
                                                      variant="outline"
                                                      onClick={() => setEditingTransportista(null)}
                                                    >
                                                      <X className="w-4 h-4" />
                                                    </Button>
                                                  </div>
                                                ) : (
                                                  <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                      {pedido.transportista}
                                                    </span>
                                                    <Button
                                                      size="sm"
                                                      variant="ghost"
                                                      onClick={() => setEditingTransportista(pedido.id)}
                                                    >
                                                      <UserCheck className="w-4 h-4" />
                                                    </Button>
                                                  </div>
                                                )}
                                              </div>

                                              <div className="flex gap-2">
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => {
                                                    alert(
                                                      `Detalles del pedido ${pedido.id}:\n\nCliente: ${pedido.cliente}\nDirección: ${pedido.direccion}\nTotal: ${formatCurrency(pedido.total)}\nProductos: ${pedido.productos}\nObservaciones: ${pedido.observaciones || "Ninguna"}`,
                                                    )
                                                  }}
                                                >
                                                  <Eye className="w-4 h-4 mr-1" />
                                                  Ver
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => window.open(`tel:${pedido.telefono}`, "_self")}
                                                >
                                                  <Phone className="w-4 h-4 mr-1" />
                                                  Llamar
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      {Object.keys(pedidosFiltrados).length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos en preparación</h3>
            <p className="text-gray-600">
              No se encontraron pedidos listos para armar rutas en las fechas seleccionadas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
