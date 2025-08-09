"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, DollarSign, Crown, Download, Filter, Target, Users, Package, BarChart3, Zap } from "lucide-react"

const promocionesData = [
  {
    id: 1,
    nombre: "2x1 Coca Cola 500ml",
    tipo: "Combo",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-01-31",
    usos: 145,
    facturacionGenerada: 32500,
    roi: 285,
    productosTraccionados: ["Coca Cola 500ml", "Papas Lays", "Alfajor Havanna"],
    efectividad: "Alta",
  },
  {
    id: 2,
    nombre: "15% OFF Línea Coca-Cola",
    tipo: "Descuento",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-01-25",
    usos: 89,
    facturacionGenerada: 18750,
    roi: 156,
    productosTraccionados: ["Coca Cola 1.5L", "Fanta 500ml", "Sprite 500ml"],
    efectividad: "Media",
  },
  {
    id: 3,
    nombre: "Combo Kiosco Completo",
    tipo: "Combo a Elección",
    fechaInicio: "2024-01-10",
    fechaFin: "2024-02-15",
    usos: 67,
    facturacionGenerada: 25400,
    roi: 198,
    productosTraccionados: ["Golosinas Variadas", "Bebidas 500ml", "Snacks"],
    efectividad: "Alta",
  },
]

const categoriaAnalisis = [
  { categoria: "Bebidas", promociones: 8, roi: 245, facturacion: 125000 },
  { categoria: "Golosinas", promociones: 5, roi: 189, facturacion: 78500 },
  { categoria: "Snacks", promociones: 3, roi: 167, facturacion: 45200 },
  { categoria: "Lácteos", promociones: 2, roi: 134, facturacion: 28900 },
]

const metricas = [
  {
    titulo: "ROI Promedio",
    valor: "198%",
    descripcion: "Retorno de inversión promedio",
    icono: DollarSign,
    color: "text-green-600",
  },
  {
    titulo: "Promociones Activas",
    valor: "18",
    descripcion: "Promociones vigentes",
    icono: Tag,
    color: "text-blue-600",
  },
  {
    titulo: "Facturación Generada",
    valor: "$248,650",
    descripcion: "Por promociones este mes",
    icono: BarChart3,
    color: "text-purple-600",
  },
  {
    titulo: "Productos Traccionados",
    valor: "156",
    descripcion: "Productos vendidos por promos",
    icono: Package,
    color: "text-orange-600",
  },
]

export default function PromocionesReportePage() {
  const [filtroTipo, setFiltroTipo] = useState("todas")
  const [filtroEfectividad, setFiltroEfectividad] = useState("todas")

  const promocionesFiltradas = promocionesData.filter((promo) => {
    const cumpleTipo = filtroTipo === "todas" || promo.tipo.toLowerCase().includes(filtroTipo.toLowerCase())
    const cumpleEfectividad = filtroEfectividad === "todas" || promo.efectividad === filtroEfectividad
    return cumpleTipo && cumpleEfectividad
  })

  const getEfectividadColor = (efectividad: string) => {
    switch (efectividad) {
      case "Alta":
        return "bg-green-100 text-green-800"
      case "Media":
        return "bg-yellow-100 text-yellow-800"
      case "Baja":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoiColor = (roi: number) => {
    if (roi >= 200) return "text-green-600"
    if (roi >= 150) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Tag className="h-8 w-8 text-[#0492C2]" />
            Impacto de Promociones
            <Crown className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-2">Análisis de ROI y efectividad de promociones activas</p>
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

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map((metrica, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metrica.titulo}</p>
                  <p className="text-2xl font-bold text-gray-900">{metrica.valor}</p>
                  <p className="text-sm text-gray-500">{metrica.descripcion}</p>
                </div>
                <metrica.icono className={`h-8 w-8 ${metrica.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Promoción</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="combo">Combo</option>
                <option value="descuento">Descuento</option>
                <option value="combo a elección">Combo a Elección</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Efectividad</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroEfectividad}
                onChange={(e) => setFiltroEfectividad(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Promociones */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Análisis Detallado de Promociones
          </CardTitle>
          <CardDescription>ROI, facturación y productos traccionados por cada promoción</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promocionesFiltradas.map((promo) => (
              <div key={promo.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{promo.nombre}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{promo.tipo}</Badge>
                      <Badge className={getEfectividadColor(promo.efectividad)}>{promo.efectividad}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getRoiColor(promo.roi)}`}>{promo.roi}%</p>
                    <p className="text-sm text-gray-600">ROI</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Usos</p>
                      <p className="font-semibold">{promo.usos}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Facturación</p>
                      <p className="font-semibold">${promo.facturacionGenerada.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Período</p>
                      <p className="font-semibold text-sm">
                        {new Date(promo.fechaInicio).toLocaleDateString()} -{" "}
                        {new Date(promo.fechaFin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Productos Traccionados:</p>
                  <div className="flex flex-wrap gap-2">
                    {promo.productosTraccionados.map((producto, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {producto}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análisis por Categoría */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Rendimiento por Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoriaAnalisis.map((categoria, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{categoria.categoria}</h4>
                  <p className="text-sm text-gray-600">{categoria.promociones} promociones activas</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getRoiColor(categoria.roi)}`}>{categoria.roi}%</p>
                  <p className="text-sm text-gray-600">${categoria.facturacion.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recomendaciones Inteligentes
          </CardTitle>
          <CardDescription>Sugerencias para optimizar el impacto de las promociones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900">Promoción Exitosa</h4>
              <p className="text-sm text-green-700 mt-1">
                El "2x1 Coca Cola" tiene el mejor ROI (285%). Considera extender su duración.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900">Oportunidad de Mejora</h4>
              <p className="text-sm text-blue-700 mt-1">
                Las promociones en lácteos tienen menor ROI. Evalúa ajustar descuentos o productos.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900">Expansión Estratégica</h4>
              <p className="text-sm text-purple-700 mt-1">
                Los combos generan más tracción. Considera crear más promociones de este tipo.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900">Timing Óptimo</h4>
              <p className="text-sm text-orange-700 mt-1">
                Las promociones de 15 días tienen mejor efectividad que las de 30 días.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
