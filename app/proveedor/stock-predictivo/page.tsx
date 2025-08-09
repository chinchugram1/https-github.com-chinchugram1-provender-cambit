"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  AlertTriangle,
  TrendingDown,
  Star,
  Package,
  Calendar,
  BarChart3,
  Zap,
  Bell,
  Target,
  RefreshCw,
} from "lucide-react"

const prediccionesStock = [
  {
    id: 1,
    codigo: "116",
    nombre: "Coca Cola 500ml",
    categoria: "Bebidas",
    stockActual: 45,
    stockMinimo: 20,
    ventaDiaria: 8.5,
    diasRestantes: 5.3,
    prediccion: "Te quedarías sin stock en 5 días si se mantiene esta demanda",
    nivelRiesgo: "alto",
    accionSugerida: "Realizar pedido urgente de 100 unidades",
    tendencia: "aumentando",
  },
  {
    id: 2,
    nombre: "Alfajor Fulbito",
    codigo: "201",
    categoria: "Golosinas",
    stockActual: 28,
    stockMinimo: 15,
    ventaDiaria: 3.2,
    diasRestantes: 8.8,
    prediccion: "Stock suficiente por 9 días aproximadamente",
    nivelRiesgo: "medio",
    accionSugerida: "Considerar pedido en 3-4 días",
    tendencia: "estable",
  },
  {
    id: 3,
    nombre: "Papas Lays Clásicas",
    codigo: "301",
    categoria: "Snacks",
    stockActual: 67,
    stockMinimo: 25,
    ventaDiaria: 4.1,
    diasRestantes: 16.3,
    prediccion: "Stock óptimo, sin riesgo de quiebre",
    nivelRiesgo: "bajo",
    accionSugerida: "Monitorear en 10 días",
    tendencia: "disminuyendo",
  },
  {
    id: 4,
    nombre: "Agua Villavicencio 1.5L",
    codigo: "121",
    categoria: "Bebidas",
    stockActual: 12,
    stockMinimo: 30,
    ventaDiaria: 12.3,
    diasRestantes: 1.0,
    prediccion: "¡CRÍTICO! Stock se agotará mañana",
    nivelRiesgo: "critico",
    accionSugerida: "Pedido de emergencia HOY - 150 unidades",
    tendencia: "aumentando",
  },
]

const alertasInteligentes = [
  {
    id: 1,
    tipo: "quiebre_inminente",
    titulo: "Quiebre de Stock Inminente",
    descripcion: "2 productos se agotarán en las próximas 24 horas",
    productos: ["Agua Villavicencio 1.5L", "Gaseosa Pepsi 500ml"],
    prioridad: "alta",
    fecha: "2024-01-20",
  },
  {
    id: 2,
    tipo: "demanda_aumentando",
    titulo: "Demanda en Aumento",
    descripcion: "La demanda de bebidas aumentó 25% esta semana",
    productos: ["Coca Cola 500ml", "Fanta 500ml", "Sprite 500ml"],
    prioridad: "media",
    fecha: "2024-01-19",
  },
  {
    id: 3,
    tipo: "sobrestock",
    titulo: "Posible Sobrestock",
    descripcion: "Productos con baja rotación y alto stock",
    productos: ["Chocolate Milka", "Caramelos Sugus", "Chicles Beldent"],
    prioridad: "baja",
    fecha: "2024-01-18",
  },
]

const configuracionAlertas = [
  { tipo: "Quiebre Crítico", dias: 1, activa: true },
  { tipo: "Stock Bajo", dias: 3, activa: true },
  { tipo: "Reposición Sugerida", dias: 7, activa: false },
  { tipo: "Sobrestock", rotacion: 30, activa: true },
]

export default function StockPredictivoPage() {
  const [filtroRiesgo, setFiltroRiesgo] = useState("todos")
  const [filtroCategoria, setFiltroCategoria] = useState("todas")

  const prediccionesFiltradas = prediccionesStock.filter((producto) => {
    const cumpleRiesgo = filtroRiesgo === "todos" || producto.nivelRiesgo === filtroRiesgo
    const cumpleCategoria = filtroCategoria === "todas" || producto.categoria === filtroCategoria
    return cumpleRiesgo && cumpleCategoria
  })

  const getRiesgoColor = (nivel: string) => {
    switch (nivel) {
      case "critico":
        return "bg-red-100 text-red-800 border-red-200"
      case "alto":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "bajo":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case "aumentando":
        return <TrendingDown className="h-4 w-4 text-red-600 rotate-180" />
      case "disminuyendo":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-blue-600" />
    }
  }

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
                    Panel Predictivo de Stock
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Predicciones inteligentes de quiebre de stock y alertas automáticas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
                <Package className="h-12 w-12 text-[#0492C2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs de Stock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Crítico</p>
                <p className="text-2xl font-bold text-red-600">
                  {prediccionesFiltradas.filter((p) => p.nivelRiesgo === "critico").length}
                </p>
                <p className="text-sm text-red-600">Productos</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riesgo Alto</p>
                <p className="text-2xl font-bold text-orange-600">
                  {prediccionesFiltradas.filter((p) => p.nivelRiesgo === "alto").length}
                </p>
                <p className="text-sm text-orange-600">Productos</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monitorear</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {prediccionesFiltradas.filter((p) => p.nivelRiesgo === "medio").length}
                </p>
                <p className="text-sm text-yellow-600">Productos</p>
              </div>
              <Bell className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Óptimo</p>
                <p className="text-2xl font-bold text-green-600">
                  {prediccionesFiltradas.filter((p) => p.nivelRiesgo === "bajo").length}
                </p>
                <p className="text-sm text-green-600">Productos</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Inteligentes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas Inteligentes
          </CardTitle>
          <CardDescription>Notificaciones automáticas basadas en patrones de demanda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertasInteligentes.map((alerta) => (
              <div key={alerta.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#0492C2]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{alerta.titulo}</h4>
                      <Badge className={getPrioridadColor(alerta.prioridad)}>
                        {alerta.prioridad === "alta" ? "Alta" : alerta.prioridad === "media" ? "Media" : "Baja"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alerta.descripcion}</p>
                    <div className="flex flex-wrap gap-1">
                      {alerta.productos.map((producto, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {producto}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(alerta.fecha).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Filtros de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Riesgo</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroRiesgo}
                onChange={(e) => setFiltroRiesgo(e.target.value)}
              >
                <option value="todos">Todos los niveles</option>
                <option value="critico">Crítico</option>
                <option value="alto">Alto</option>
                <option value="medio">Medio</option>
                <option value="bajo">Bajo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="todas">Todas las categorías</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Golosinas">Golosinas</option>
                <option value="Snacks">Snacks</option>
                <option value="Lácteos">Lácteos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predicciones de Stock */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Predicciones Inteligentes
          </CardTitle>
          <CardDescription>Proyecciones de quiebre de stock basadas en demanda histórica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prediccionesFiltradas.map((producto) => (
              <div key={producto.id} className={`p-6 rounded-lg border-2 ${getRiesgoColor(producto.nivelRiesgo)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {producto.codigo}
                      </Badge>
                      <h4 className="text-lg font-semibold text-gray-900">{producto.nombre}</h4>
                      <Badge variant="outline">{producto.categoria}</Badge>
                      {getTendenciaIcon(producto.tendencia)}
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{producto.prediccion}</p>
                    <p className="text-sm text-blue-700 font-medium">💡 {producto.accionSugerida}</p>
                  </div>
                  <Badge className={getRiesgoColor(producto.nivelRiesgo)} variant="outline">
                    {producto.nivelRiesgo === "critico"
                      ? "CRÍTICO"
                      : producto.nivelRiesgo === "alto"
                        ? "ALTO"
                        : producto.nivelRiesgo === "medio"
                          ? "MEDIO"
                          : "BAJO"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Stock Actual</p>
                    <p className="text-lg font-bold text-gray-900">{producto.stockActual}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stock Mínimo</p>
                    <p className="text-lg font-bold text-gray-900">{producto.stockMinimo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Venta Diaria</p>
                    <p className="text-lg font-bold text-gray-900">{producto.ventaDiaria}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Días Restantes</p>
                    <p
                      className={`text-lg font-bold ${
                        producto.diasRestantes <= 1
                          ? "text-red-600"
                          : producto.diasRestantes <= 3
                            ? "text-orange-600"
                            : producto.diasRestantes <= 7
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    >
                      {producto.diasRestantes.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      className={`w-full ${
                        producto.nivelRiesgo === "critico"
                          ? "bg-red-600 hover:bg-red-700"
                          : producto.nivelRiesgo === "alto"
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-[#0492C2] hover:bg-[#0492C2]/90"
                      }`}
                    >
                      {producto.nivelRiesgo === "critico" ? "Pedido Urgente" : "Realizar Pedido"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Alertas
          </CardTitle>
          <CardDescription>Personaliza cuándo recibir notificaciones automáticas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {configuracionAlertas.map((config, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{config.tipo}</h4>
                  <p className="text-sm text-gray-600">
                    {config.dias
                      ? `Alertar ${config.dias} días antes`
                      : `Productos sin rotación en ${config.rotacion} días`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{config.activa ? "Activa" : "Inactiva"}</span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      config.activa ? "bg-[#0492C2]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        config.activa ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
