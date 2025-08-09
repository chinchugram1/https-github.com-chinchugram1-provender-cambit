"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  XCircle,
  AlertTriangle,
  Edit,
} from "lucide-react"

// Datos mockeados con nuevos estados
const mockPedidos = [
  {
    id: "PED-001",
    cliente: "Kiosco El Rápido",
    zona: "Centro",
    fecha: "2024-01-15",
    estado: "enviado",
    total: 125000,
    items: 15,
    direccion: "Av. San Martín 1234",
    telefono: "+54 11 1234-5678",
  },
  {
    id: "PED-002",
    cliente: "Almacén Don Pedro",
    zona: "Norte",
    fecha: "2024-01-15",
    estado: "en_preparacion",
    total: 89500,
    items: 8,
    direccion: "Calle Belgrano 567",
    telefono: "+54 11 2345-6789",
  },
  {
    id: "PED-003",
    cliente: "Supermercado La Esquina",
    zona: "Sur",
    fecha: "2024-01-14",
    estado: "en_calle",
    total: 245000,
    items: 32,
    direccion: "Av. Rivadavia 890",
    telefono: "+54 11 3456-7890",
  },
  {
    id: "PED-004",
    cliente: "Kiosco Central",
    zona: "Centro",
    fecha: "2024-01-14",
    estado: "entregado",
    total: 67800,
    items: 12,
    direccion: "Calle Mitre 345",
    telefono: "+54 11 4567-8901",
  },
  {
    id: "PED-005",
    cliente: "Almacén Familiar",
    zona: "Oeste",
    fecha: "2024-01-13",
    estado: "rechazado",
    total: 156000,
    items: 24,
    direccion: "Av. Libertador 678",
    telefono: "+54 11 5678-9012",
    motivoRechazo: "Productos sin stock",
  },
  {
    id: "PED-006",
    cliente: "Minimarket Los Pinos",
    zona: "Este",
    fecha: "2024-01-13",
    estado: "cancelado",
    total: 98000,
    items: 18,
    direccion: "Av. Corrientes 123",
    telefono: "+54 11 6789-0123",
    motivoCancelacion: "Negocio cerrado",
  },
]

const estadoConfig = {
  enviado: {
    label: "Enviado",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
    description: "Pedido enviado por el cliente",
  },
  en_preparacion: {
    label: "En Preparación",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    description: "Pedido confirmado y en preparación",
  },
  en_calle: {
    label: "En Calle",
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
    description: "Pedido en camino al cliente",
  },
  entregado: {
    label: "Entregado",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    description: "Pedido entregado exitosamente",
  },
  rechazado: {
    label: "Rechazado",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
    description: "Pedido rechazado por el proveedor",
  },
  cancelado: {
    label: "Cancelado",
    color: "bg-gray-100 text-gray-800",
    icon: AlertTriangle,
    description: "Pedido cancelado durante entrega",
  },
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState(mockPedidos)
  const [filteredPedidos, setFilteredPedidos] = useState(mockPedidos)
  const [searchTerm, setSearchTerm] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [zonaFilter, setZonaFilter] = useState("todas")

  // Filtrar pedidos
  useEffect(() => {
    let filtered = pedidos

    if (searchTerm) {
      filtered = filtered.filter(
        (pedido) =>
          pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pedido.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (estadoFilter !== "todos") {
      filtered = filtered.filter((pedido) => pedido.estado === estadoFilter)
    }

    if (zonaFilter !== "todas") {
      filtered = filtered.filter((pedido) => pedido.zona === zonaFilter)
    }

    setFilteredPedidos(filtered)
  }, [searchTerm, estadoFilter, zonaFilter, pedidos])

  // Estadísticas
  const stats = {
    total: pedidos.length,
    enviados: pedidos.filter((p) => p.estado === "enviado").length,
    enPreparacion: pedidos.filter((p) => p.estado === "en_preparacion").length,
    enCalle: pedidos.filter((p) => p.estado === "en_calle").length,
    entregados: pedidos.filter((p) => p.estado === "entregado").length,
    rechazados: pedidos.filter((p) => p.estado === "rechazado").length,
    totalVentas: pedidos.filter((p) => p.estado === "entregado").reduce((sum, p) => sum + p.total, 0),
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
          <p className="text-gray-600">Administra todos los pedidos de tus clientes</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-provender-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enviados</p>
                <p className="text-2xl font-bold text-blue-600">{stats.enviados}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Prep.</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.enPreparacion}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Calle</p>
                <p className="text-2xl font-bold text-purple-600">{stats.enCalle}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entregados</p>
                <p className="text-2xl font-bold text-green-600">{stats.entregados}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rechazados</p>
                <p className="text-2xl font-bold text-red-600">{stats.rechazados}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ventas</p>
                <p className="text-lg font-bold text-provender-primary">{formatCurrency(stats.totalVentas)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-provender-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente o número de pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="en_preparacion">En Preparación</SelectItem>
                <SelectItem value="en_calle">En Calle</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="rechazado">Rechazado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={zonaFilter} onValueChange={setZonaFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por zona" />
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
        </CardContent>
      </Card>

      {/* Lista de Pedidos */}
      <div className="grid gap-4">
        {filteredPedidos.map((pedido) => {
          const EstadoIcon = estadoConfig[pedido.estado as keyof typeof estadoConfig].icon
          const estadoInfo = estadoConfig[pedido.estado as keyof typeof estadoConfig]

          return (
            <Card key={pedido.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900">{pedido.id}</h3>
                      <Badge className={estadoInfo.color}>
                        <EstadoIcon className="w-3 h-3 mr-1" />
                        {estadoInfo.label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <strong>Cliente:</strong> {pedido.cliente}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <strong>Zona:</strong> {pedido.zona}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString("es-AR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <strong>Items:</strong> {pedido.items}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Dirección:</strong> {pedido.direccion}
                    </div>

                    {/* Mostrar motivo de rechazo o cancelación */}
                    {(pedido.motivoRechazo || pedido.motivoCancelacion) && (
                      <div className="text-sm bg-red-50 text-red-700 p-2 rounded">
                        <strong>Motivo:</strong> {pedido.motivoRechazo || pedido.motivoCancelacion}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-provender-primary">{formatCurrency(pedido.total)}</p>
                      <p className="text-sm text-gray-600">{pedido.items} productos</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/proveedor/pedidos/${pedido.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Link>
                      </Button>

                      {pedido.estado === "enviado" && (
                        <>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/proveedor/pedidos/${pedido.id}/editar`}>
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Link>
                          </Button>
                          <Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
                            <Link href={`/proveedor/pedidos/${pedido.id}/confirmar`}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmar
                            </Link>
                          </Button>
                          <Button size="sm" variant="destructive" asChild>
                            <Link href={`/proveedor/pedidos/${pedido.id}/rechazar`}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Rechazar
                            </Link>
                          </Button>
                        </>
                      )}

                      {pedido.estado === "en_preparacion" && (
                        <Button size="sm" asChild className="bg-purple-600 hover:bg-purple-700">
                          <Link href={`/proveedor/pedidos/${pedido.id}/enviar`}>
                            <Truck className="w-4 h-4 mr-1" />
                            Enviar
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredPedidos.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pedidos</h3>
            <p className="text-gray-600">
              {searchTerm || estadoFilter !== "todos" || zonaFilter !== "todas"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Aún no hay pedidos registrados"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
