"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Crown,
  MapPin,
  Route,
  Star,
  DollarSign,
  Users,
  Zap,
  Save,
  Settings,
  TrendingUp,
  Eye,
  User,
  X,
  Package,
  Calendar,
  GripVertical,
  UserCheck,
  Phone,
  Sparkles,
} from "lucide-react"

// Mock data para pedidos en preparación
const mockPedidosEnPreparacion = [
  {
    id: "PED-001",
    cliente: "Supermercado Central",
    direccion: "Av. San Martín 1234",
    zona: "Centro",
    fecha: "2024-01-16",
    productos: 15,
    total: 125000,
    transportista: "Carlos Mendez",
    orden: 1,
    telefono: "+54 11 1234-5678",
    observaciones: "Tocar timbre 2 veces",
    pedidoPromedio: 4500,
    frecuencia: "Alta",
    tipo: "Premium",
    distancia: 2.5,
    tiempoEstimado: 15,
    prioridad: 1,
  },
  {
    id: "PED-002",
    cliente: "Kiosco El Sol",
    direccion: "Belgrano 567",
    zona: "Centro",
    fecha: "2024-01-16",
    productos: 8,
    total: 89500,
    transportista: "Carlos Mendez",
    orden: 2,
    telefono: "+54 11 2345-6789",
    observaciones: "",
    pedidoPromedio: 2800,
    frecuencia: "Alta",
    tipo: "Frecuente",
    distancia: 1.8,
    tiempoEstimado: 12,
    prioridad: 2,
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
    pedidoPromedio: 3200,
    frecuencia: "Media",
    tipo: "Regular",
    distancia: 4.2,
    tiempoEstimado: 20,
    prioridad: 3,
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
    pedidoPromedio: 1800,
    frecuencia: "Baja",
    tipo: "Regular",
    distancia: 3.1,
    tiempoEstimado: 18,
    prioridad: 4,
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
    pedidoPromedio: 2200,
    frecuencia: "Media",
    tipo: "Frecuente",
    distancia: 2.8,
    tiempoEstimado: 16,
    prioridad: 3,
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
    pedidoPromedio: 3800,
    frecuencia: "Alta",
    tipo: "Premium",
    distancia: 5.2,
    tiempoEstimado: 25,
    prioridad: 2,
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

export default function RutasInteligentesPage() {
  const [pedidos, setPedidos] = useState(mockPedidosEnPreparacion)
  const [transportistas] = useState(mockTransportistas)
  const [criterioSeleccionado, setCriterioSeleccionado] = useState("facturacion")
  const [diaSeleccionado, setDiaSeleccionado] = useState("lunes")
  const [selectedDate, setSelectedDate] = useState("2024-01-16")
  const [selectedZone, setSelectedZone] = useState("todas")
  const [editingTransportista, setEditingTransportista] = useState<string | null>(null)
  const [optimizacionActiva, setOptimizacionActiva] = useState(false)

  const criterios = [
    { value: "facturacion", label: "Mayor Facturación", icon: DollarSign },
    { value: "frecuencia", label: "Clientes Frecuentes", icon: Users },
    { value: "distancia", label: "Menor Distancia", icon: MapPin },
    { value: "mixto", label: "Optimización Mixta", icon: Zap },
  ]

  const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]

  // Función para optimizar automáticamente los pedidos
  const optimizarPedidos = () => {
    setOptimizacionActiva(true)

    const pedidosOptimizados = [...pedidos].map((pedido) => {
      let nuevaPrioridad = pedido.prioridad

      switch (criterioSeleccionado) {
        case "facturacion":
          // Priorizar por monto total
          if (pedido.total > 200000) nuevaPrioridad = 1
          else if (pedido.total > 100000) nuevaPrioridad = 2
          else if (pedido.total > 50000) nuevaPrioridad = 3
          else nuevaPrioridad = 4
          break

        case "frecuencia":
          // Priorizar por tipo de cliente y frecuencia
          if (pedido.tipo === "Premium") nuevaPrioridad = 1
          else if (pedido.tipo === "Frecuente") nuevaPrioridad = 2
          else nuevaPrioridad = 3
          break

        case "distancia":
          // Priorizar por menor distancia
          if (pedido.distancia < 2) nuevaPrioridad = 1
          else if (pedido.distancia < 4) nuevaPrioridad = 2
          else if (pedido.distancia < 6) nuevaPrioridad = 3
          else nuevaPrioridad = 4
          break

        case "mixto":
          // Combinación de factores
          let score = 0
          if (pedido.tipo === "Premium") score += 3
          else if (pedido.tipo === "Frecuente") score += 2
          else score += 1

          if (pedido.total > 150000) score += 3
          else if (pedido.total > 75000) score += 2
          else score += 1

          if (pedido.distancia < 3) score += 2
          else score += 1

          if (score >= 7) nuevaPrioridad = 1
          else if (score >= 5) nuevaPrioridad = 2
          else if (score >= 3) nuevaPrioridad = 3
          else nuevaPrioridad = 4
          break
      }

      return { ...pedido, prioridad: nuevaPrioridad }
    })

    // Reordenar por zona y prioridad
    const pedidosReordenados = pedidosOptimizados.map((pedido) => {
      const pedidosEnZona = pedidosOptimizados
        .filter((p) => p.zona === pedido.zona && p.fecha === pedido.fecha)
        .sort((a, b) => a.prioridad - b.prioridad)

      const nuevoOrden = pedidosEnZona.findIndex((p) => p.id === pedido.id) + 1
      return { ...pedido, orden: nuevoOrden }
    })

    setPedidos(pedidosReordenados)

    setTimeout(() => {
      setOptimizacionActiva(false)
    }, 2000)
  }

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

    // Obtener los pedidos de la zona específica
    const zonePedidos = newPedidos
      .filter((p) => p.zona === sourceZone && p.fecha === sourceDate)
      .sort((a, b) => a.orden - b.orden)

    // Verificar que tenemos pedidos en la zona
    if (zonePedidos.length === 0) return

    // Reordenar los pedidos
    const [movedPedido] = zonePedidos.splice(source.index, 1)
    if (!movedPedido) return

    zonePedidos.splice(destination.index, 0, movedPedido)

    // Actualizar los órdenes
    zonePedidos.forEach((pedido, index) => {
      const pedidoIndex = newPedidos.findIndex((p) => p.id === pedido.id)
      if (pedidoIndex !== -1) {
        newPedidos[pedidoIndex] = { ...newPedidos[pedidoIndex], orden: index + 1 }
      }
    })

    setPedidos(newPedidos)
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
      `Ruta Inteligente creada para ${zona} - ${formatDate(fecha)}\nTransportista: ${transportista}\nPedidos: ${zonePedidos.length}\nOptimizada por: ${criterios.find((c) => c.value === criterioSeleccionado)?.label}`,
    )
  }

  const getTipoClienteColor = (tipo: string) => {
    switch (tipo) {
      case "Premium":
        return "bg-yellow-100 text-yellow-800"
      case "Frecuente":
        return "bg-green-100 text-green-800"
      case "Regular":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadColor = (prioridad: number) => {
    switch (prioridad) {
      case 1:
        return "bg-red-100 text-red-800 border-red-200"
      case 2:
        return "bg-orange-100 text-orange-800 border-orange-200"
      case 3:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  // Filtrar fechas disponibles
  const fechasDisponibles = Object.keys(pedidosAgrupados).sort()

  // Filtrar por fecha seleccionada
  const pedidosFiltrados =
    selectedDate === "todas" ? pedidosAgrupados : { [selectedDate]: pedidosAgrupados[selectedDate] || {} }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="mb-8">
        <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Rutas Inteligentes
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Optimización automática de rutas priorizando clientes premium y frecuentes
                  </p>
                </div>
              </div>
              <Route className="h-12 w-12 text-[#0492C2]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuración de Criterios */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Criterios de Optimización Inteligente
          </CardTitle>
          <CardDescription>Selecciona cómo quieres priorizar automáticamente tus rutas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {criterios.map((criterio) => (
              <div
                key={criterio.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  criterioSeleccionado === criterio.value
                    ? "border-[#0492C2] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setCriterioSeleccionado(criterio.value)}
              >
                <div className="flex items-center gap-3">
                  <criterio.icon
                    className={`h-6 w-6 ${
                      criterioSeleccionado === criterio.value ? "text-[#0492C2]" : "text-gray-600"
                    }`}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{criterio.label}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-48">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-48">
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
            <div className="flex gap-2 mt-6">
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                onClick={optimizarPedidos}
                disabled={optimizacionActiva}
              >
                {optimizacionActiva ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Optimizando...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Optimizar Rutas
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pedidos Agrupados con Optimización Inteligente */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          {Object.entries(pedidosFiltrados).map(([fecha, zonas]) => (
            <div key={fecha}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#0492C2]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {formatDate(fecha)} - {fecha}
                </h2>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Optimización Inteligente
                </Badge>
              </div>

              <div className="grid gap-4">
                {Object.entries(zonas)
                  .filter(([zona]) => selectedZone === "todas" || zona === selectedZone)
                  .map(([zona, pedidosZona]) => {
                    const totalPedidos = pedidosZona.length
                    const totalMonto = pedidosZona.reduce((sum, p) => sum + p.total, 0)
                    const transportista = pedidosZona[0]?.transportista || "Sin asignar"
                    const eficiencia = Math.round(
                      (pedidosZona.filter((p) => p.prioridad <= 2).length / totalPedidos) * 100,
                    )

                    return (
                      <Card
                        key={`${fecha}-${zona}`}
                        className="border-l-4 border-l-gradient-to-b from-yellow-400 to-orange-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-[#0492C2]" />
                              <CardTitle className="text-lg">Zona {zona}</CardTitle>
                              <Badge variant="outline">
                                {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""}
                              </Badge>
                              <Badge className="bg-green-100 text-green-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {eficiencia}% optimizada
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right text-sm">
                                <p className="font-semibold text-[#0492C2]">{formatCurrency(totalMonto)}</p>
                                <p className="text-gray-600">Total zona</p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                onClick={() => createRoute(zona, fecha)}
                              >
                                <Route className="w-4 h-4 mr-1" />
                                Crear Ruta Inteligente
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>
                                Transportista: <strong>{transportista}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                              <span>
                                Optimizado por:{" "}
                                <strong>{criterios.find((c) => c.value === criterioSeleccionado)?.label}</strong>
                              </span>
                            </div>
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
                                        } ${optimizacionActiva ? "animate-pulse" : ""}`}
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
                                                <div className="flex items-center gap-2 mb-1">
                                                  <h4 className="font-semibold text-gray-900">
                                                    {pedido.orden}. {pedido.cliente}
                                                  </h4>
                                                  <Badge className={getTipoClienteColor(pedido.tipo)}>
                                                    {pedido.tipo}
                                                  </Badge>
                                                  <Badge className={`text-xs ${getPrioridadColor(pedido.prioridad)}`}>
                                                    Prioridad {pedido.prioridad}
                                                  </Badge>
                                                  {pedido.tipo === "Premium" && (
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                  )}
                                                </div>
                                                <p className="text-sm text-gray-600">{pedido.id}</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-semibold text-[#0492C2]">
                                                  {formatCurrency(pedido.total)}
                                                </p>
                                                <p className="text-sm text-gray-600">{pedido.productos} productos</p>
                                              </div>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600">
                                              <MapPin className="w-4 h-4 mr-1" />
                                              {pedido.direccion}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                                              <div>
                                                <span className="font-medium">Distancia:</span> {pedido.distancia} km
                                              </div>
                                              <div>
                                                <span className="font-medium">Tiempo:</span> {pedido.tiempoEstimado} min
                                              </div>
                                              <div>
                                                <span className="font-medium">Frecuencia:</span> {pedido.frecuencia}
                                              </div>
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
                                                <Button size="sm" variant="outline">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos para optimizar</h3>
            <p className="text-gray-600">
              No se encontraron pedidos listos para optimización inteligente en las fechas seleccionadas
            </p>
          </CardContent>
        </Card>
      )}

      {/* Beneficios Premium */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ventajas de las Rutas Inteligentes</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Optimización automática que prioriza clientes premium y frecuentes para maximizar tu rentabilidad
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Mayor Rentabilidad</h4>
                <p className="text-sm text-gray-600">Prioriza automáticamente clientes con pedidos más grandes</p>
              </div>
              <div className="text-center">
                <Sparkles className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Optimización Automática</h4>
                <p className="text-sm text-gray-600">Reordena rutas inteligentemente según criterios seleccionados</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Clientes Satisfechos</h4>
                <p className="text-sm text-gray-600">Atención prioritaria a clientes premium y frecuentes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
