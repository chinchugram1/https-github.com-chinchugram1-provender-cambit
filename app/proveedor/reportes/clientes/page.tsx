"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Crown,
  Download,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  AlertTriangle,
  Star,
} from "lucide-react"

const clientesData = [
  {
    id: 1,
    nombre: "Kiosco El Sol",
    zona: "Centro",
    tipo: "Kiosco",
    facturacionMes: 45600,
    pedidosMes: 12,
    ultimoPedido: "2024-01-18",
    diasSinPedido: 2,
    promedioCompra: 3800,
    clasificacion: "Premium",
    tendencia: "up",
    crecimiento: 15.2,
  },
  {
    id: 2,
    nombre: "Almacén Central",
    zona: "Norte",
    tipo: "Almacén",
    facturacionMes: 38900,
    pedidosMes: 8,
    ultimoPedido: "2024-01-19",
    diasSinPedido: 1,
    promedioCompra: 4862,
    clasificacion: "Premium",
    tendencia: "up",
    crecimiento: 8.7,
  },
  {
    id: 3,
    nombre: "Super Barrio",
    zona: "Sur",
    tipo: "Supermercado",
    facturacionMes: 28400,
    pedidosMes: 6,
    ultimoPedido: "2024-01-15",
    diasSinPedido: 5,
    promedioCompra: 4733,
    clasificacion: "Regular",
    tendencia: "down",
    crecimiento: -3.2,
  },
  {
    id: 4,
    nombre: "Kiosco San Martín",
    zona: "Este",
    tipo: "Kiosco",
    facturacionMes: 22100,
    pedidosMes: 9,
    ultimoPedido: "2024-01-17",
    diasSinPedido: 3,
    promedioCompra: 2456,
    clasificacion: "Regular",
    tendencia: "up",
    crecimiento: 5.8,
  },
  {
    id: 5,
    nombre: "Despensa Familiar",
    zona: "Oeste",
    tipo: "Almacén",
    facturacionMes: 15800,
    pedidosMes: 4,
    ultimoPedido: "2024-01-05",
    diasSinPedido: 15,
    promedioCompra: 3950,
    clasificacion: "En Riesgo",
    tendencia: "down",
    crecimiento: -12.5,
  },
]

const zonaAnalisis = [
  { zona: "Centro", clientes: 15, facturacion: 125600, promedio: 8373 },
  { zona: "Norte", clientes: 12, facturacion: 98400, promedio: 8200 },
  { zona: "Sur", clientes: 18, facturacion: 89200, promedio: 4956 },
  { zona: "Este", clientes: 10, facturacion: 67800, promedio: 6780 },
  { zona: "Oeste", clientes: 8, facturacion: 45200, promedio: 5650 },
]

const comportamientoData = [
  {
    comportamiento: "Compras Frecuentes",
    descripcion: "Clientes que realizan pedidos semanalmente",
    cantidad: 23,
    porcentaje: 36.5,
  },
  {
    comportamiento: "Compras Grandes",
    descripcion: "Pedidos promedio superiores a $4,000",
    cantidad: 18,
    porcentaje: 28.6,
  },
  {
    comportamiento: "Clientes Estacionales",
    descripcion: "Aumentan compras en fechas especiales",
    cantidad: 15,
    porcentaje: 23.8,
  },
  {
    comportamiento: "En Riesgo",
    descripcion: "Sin pedidos en los últimos 15 días",
    cantidad: 7,
    porcentaje: 11.1,
  },
]

export default function ClientesReportePage() {
  const [filtroZona, setFiltroZona] = useState("todas")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroClasificacion, setFiltroClasificacion] = useState("todas")

  const clientesFiltrados = clientesData.filter((cliente) => {
    const cumpleZona = filtroZona === "todas" || cliente.zona === filtroZona
    const cumpleTipo = filtroTipo === "todos" || cliente.tipo === filtroTipo
    const cumpleClasificacion = filtroClasificacion === "todas" || cliente.clasificacion === filtroClasificacion
    return cumpleZona && cumpleTipo && cumpleClasificacion
  })

  const getClasificacionColor = (clasificacion: string) => {
    switch (clasificacion) {
      case "Premium":
        return "bg-green-100 text-green-800"
      case "Regular":
        return "bg-yellow-100 text-yellow-800"
      case "En Riesgo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTendenciaIcon = (tendencia: string) => {
    return tendencia === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const totalFacturacion = clientesFiltrados.reduce((sum, c) => sum + c.facturacionMes, 0)
  const promedioFacturacion = totalFacturacion / clientesFiltrados.length || 0

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-[#0492C2]" />
            Comparativo de Clientes
            <Crown className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-2">Análisis de comportamiento y rendimiento por cliente</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-gray-900">{clientesFiltrados.length}</p>
                <p className="text-sm text-green-600">Este mes</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Facturación Total</p>
                <p className="text-2xl font-bold text-gray-900">${totalFacturacion.toLocaleString()}</p>
                <p className="text-sm text-green-600">Clientes filtrados</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio por Cliente</p>
                <p className="text-2xl font-bold text-gray-900">${promedioFacturacion.toLocaleString()}</p>
                <p className="text-sm text-blue-600">Facturación mensual</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Premium</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clientesFiltrados.filter((c) => c.clasificacion === "Premium").length}
                </p>
                <p className="text-sm text-green-600">Alta facturación</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroZona}
                onChange={(e) => setFiltroZona(e.target.value)}
              >
                <option value="todas">Todas las zonas</option>
                <option value="Centro">Centro</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
                <option value="Este">Este</option>
                <option value="Oeste">Oeste</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cliente</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="todos">Todos los tipos</option>
                <option value="Kiosco">Kiosco</option>
                <option value="Almacén">Almacén</option>
                <option value="Supermercado">Supermercado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clasificación</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroClasificacion}
                onChange={(e) => setFiltroClasificacion(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="Premium">Premium</option>
                <option value="Regular">Regular</option>
                <option value="En Riesgo">En Riesgo</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análisis de Comportamiento */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Análisis de Comportamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comportamientoData.map((comportamiento, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{comportamiento.comportamiento}</h4>
                <p className="text-sm text-gray-600 mb-3">{comportamiento.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0492C2]">{comportamiento.cantidad}</span>
                  <Badge variant="secondary">{comportamiento.porcentaje}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Clientes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Análisis Detallado por Cliente
          </CardTitle>
          <CardDescription>Facturación, frecuencia y tendencias de cada cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientesFiltrados.map((cliente) => (
              <div key={cliente.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{cliente.nombre}</h3>
                      <Badge className={getClasificacionColor(cliente.clasificacion)}>{cliente.clasificacion}</Badge>
                      {cliente.clasificacion === "Premium" && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {cliente.zona}
                      </span>
                      <span>{cliente.tipo}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Último pedido: {new Date(cliente.ultimoPedido).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${cliente.facturacionMes.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {getTendenciaIcon(cliente.tendencia)}
                      <span className={`text-sm ${cliente.tendencia === "up" ? "text-green-600" : "text-red-600"}`}>
                        {cliente.crecimiento > 0 ? "+" : ""}
                        {cliente.crecimiento}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pedidos/Mes</p>
                    <p className="font-semibold">{cliente.pedidosMes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Promedio/Pedido</p>
                    <p className="font-semibold">${cliente.promedioCompra.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Días sin pedido</p>
                    <p className={`font-semibold ${cliente.diasSinPedido > 10 ? "text-red-600" : "text-green-600"}`}>
                      {cliente.diasSinPedido}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frecuencia</p>
                    <p className="font-semibold">
                      {cliente.pedidosMes >= 10 ? "Alta" : cliente.pedidosMes >= 5 ? "Media" : "Baja"}
                    </p>
                  </div>
                </div>

                {cliente.diasSinPedido > 10 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">
                        Cliente en riesgo - {cliente.diasSinPedido} días sin pedidos
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análisis por Zona */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Rendimiento por Zona
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zonaAnalisis.map((zona, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{zona.zona}</h4>
                  <p className="text-sm text-gray-600">{zona.clientes} clientes activos</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${zona.facturacion.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Promedio: ${zona.promedio.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
