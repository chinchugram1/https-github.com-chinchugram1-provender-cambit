"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Calendar, Star, Zap, Plus, Eye, Edit, Gift, Sun, Snowflake, Flower, Leaf } from "lucide-react"

const fechasEspeciales = [
  {
    id: 1,
    nombre: "Día del Niño",
    fecha: "2024-08-18",
    categoria: "Infantil",
    productos: ["Golosinas", "Juguetes", "Bebidas"],
    promocionSugerida: "2x1 en golosinas + regalo sorpresa",
    impactoEstimado: "alto",
    estado: "programada",
    temporada: "invierno",
  },
  {
    id: 2,
    nombre: "Semana Santa",
    fecha: "2024-03-29",
    categoria: "Religiosa",
    productos: ["Huevos de Pascua", "Chocolate", "Dulces"],
    promocionSugerida: "15% OFF en chocolates y huevos de pascua",
    impactoEstimado: "alto",
    estado: "activa",
    temporada: "otoño",
  },
  {
    id: 3,
    nombre: "Día de la Madre",
    fecha: "2024-10-20",
    categoria: "Familiar",
    productos: ["Chocolates Premium", "Flores", "Regalos"],
    promocionSugerida: "Combo especial: chocolate + tarjeta",
    impactoEstimado: "medio",
    estado: "planificada",
    temporada: "primavera",
  },
  {
    id: 4,
    nombre: "Inicio de Verano",
    fecha: "2024-12-21",
    categoria: "Estacional",
    productos: ["Bebidas Frías", "Helados", "Protector Solar"],
    promocionSugerida: "Pack verano: bebida + helado con descuento",
    impactoEstimado: "alto",
    estado: "sugerida",
    temporada: "verano",
  },
]

const promocionesEstacionales = [
  {
    temporada: "Verano",
    icono: Sun,
    color: "bg-yellow-100 text-yellow-800",
    productos: ["Bebidas Frías", "Helados", "Agua", "Gaseosas"],
    estrategia: "Aumentar stock de bebidas y helados. Promociones de hidratación.",
    crecimientoEsperado: "+35%",
    meses: ["Diciembre", "Enero", "Febrero"],
  },
  {
    temporada: "Otoño",
    icono: Leaf,
    color: "bg-orange-100 text-orange-800",
    productos: ["Snacks", "Golosinas", "Bebidas Calientes"],
    estrategia: "Promociones de vuelta a clases. Combos escolares.",
    crecimientoEsperado: "+15%",
    meses: ["Marzo", "Abril", "Mayo"],
  },
  {
    temporada: "Invierno",
    icono: Snowflake,
    color: "bg-blue-100 text-blue-800",
    productos: ["Bebidas Calientes", "Chocolates", "Sopas"],
    estrategia: "Productos de abrigo y confort. Promociones de invierno.",
    crecimientoEsperado: "+8%",
    meses: ["Junio", "Julio", "Agosto"],
  },
  {
    temporada: "Primavera",
    icono: Flower,
    color: "bg-green-100 text-green-800",
    productos: ["Productos Frescos", "Bebidas Naturales", "Snacks Ligeros"],
    estrategia: "Renovación y productos frescos. Promociones de primavera.",
    crecimientoEsperado: "+22%",
    meses: ["Septiembre", "Octubre", "Noviembre"],
  },
]

const calendarioMensual = [
  { mes: "Enero", eventos: 2, promociones: 3, ventas: 125000 },
  { mes: "Febrero", eventos: 1, promociones: 2, ventas: 98000 },
  { mes: "Marzo", eventos: 3, promociones: 4, ventas: 145000 },
  { mes: "Abril", eventos: 2, promociones: 3, ventas: 112000 },
  { mes: "Mayo", eventos: 2, promociones: 2, ventas: 108000 },
  { mes: "Junio", eventos: 1, promociones: 2, ventas: 95000 },
]

export default function CalendarioPromocionesPage() {
  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState("todas")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "bg-green-100 text-green-800"
      case "programada":
        return "bg-blue-100 text-blue-800"
      case "planificada":
        return "bg-yellow-100 text-yellow-800"
      case "sugerida":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "alto":
        return "text-green-600"
      case "medio":
        return "text-yellow-600"
      case "bajo":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getTemporadaIcon = (temporada: string) => {
    switch (temporada) {
      case "verano":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "otoño":
        return <Leaf className="h-4 w-4 text-orange-500" />
      case "invierno":
        return <Snowflake className="h-4 w-4 text-blue-500" />
      case "primavera":
        return <Flower className="h-4 w-4 text-green-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
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
                    Calendario de Promociones
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Planificación automática de promociones por fechas especiales y estacionalidad
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => setMostrarFormulario(true)} className="bg-[#0492C2] hover:bg-[#0492C2]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Promoción
                </Button>
                <Calendar className="h-12 w-12 text-[#0492C2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análisis Estacional */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Estrategias Estacionales
          </CardTitle>
          <CardDescription>Recomendaciones automáticas por temporada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promocionesEstacionales.map((temporada) => (
              <Card key={temporada.temporada} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <temporada.icono className="h-6 w-6" />
                      <h4 className="font-semibold text-gray-900">{temporada.temporada}</h4>
                    </div>
                    <Badge className={temporada.color}>{temporada.crecimientoEsperado}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Productos Clave:</p>
                    <div className="flex flex-wrap gap-1">
                      {temporada.productos.map((producto, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {producto}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Estrategia:</p>
                    <p className="text-xs text-gray-600">{temporada.estrategia}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Meses:</p>
                    <p className="text-xs text-gray-600">{temporada.meses.join(", ")}</p>
                  </div>

                  <Button size="sm" className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90">
                    <Zap className="h-4 w-4 mr-1" />
                    Activar en 1 Click
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fechas Especiales */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Fechas Especiales y Eventos
              </CardTitle>
              <CardDescription>Promociones programadas para fechas importantes</CardDescription>
            </div>
            <div>
              <select
                className="p-2 border border-gray-300 rounded-lg"
                value={temporadaSeleccionada}
                onChange={(e) => setTemporadaSeleccionada(e.target.value)}
              >
                <option value="todas">Todas las temporadas</option>
                <option value="verano">Verano</option>
                <option value="otoño">Otoño</option>
                <option value="invierno">Invierno</option>
                <option value="primavera">Primavera</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fechasEspeciales
              .filter((fecha) => temporadaSeleccionada === "todas" || fecha.temporada === temporadaSeleccionada)
              .map((fecha) => (
                <div key={fecha.id} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getTemporadaIcon(fecha.temporada)}
                        <h4 className="text-lg font-semibold text-gray-900">{fecha.nombre}</h4>
                        <Badge className={getEstadoColor(fecha.estado)}>
                          {fecha.estado === "activa"
                            ? "Activa"
                            : fecha.estado === "programada"
                              ? "Programada"
                              : fecha.estado === "planificada"
                                ? "Planificada"
                                : "Sugerida"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(fecha.fecha).toLocaleDateString()}
                        </span>
                        <span>{fecha.categoria}</span>
                        <span className={`font-medium ${getImpactoColor(fecha.impactoEstimado)}`}>
                          Impacto {fecha.impactoEstimado}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Promoción sugerida:</strong> {fecha.promocionSugerida}
                      </p>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Productos recomendados:</p>
                        <div className="flex flex-wrap gap-1">
                          {fecha.productos.map((producto, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {producto}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      {fecha.estado === "sugerida" && (
                        <Button size="sm" className="bg-[#0492C2] hover:bg-[#0492C2]/90">
                          <Zap className="h-4 w-4 mr-1" />
                          Activar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendario Mensual */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Vista Mensual
          </CardTitle>
          <CardDescription>Resumen de eventos y promociones por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendarioMensual.map((mes, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{mes.mes}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Eventos:</span>
                    <span className="font-medium">{mes.eventos}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Promociones:</span>
                    <span className="font-medium">{mes.promociones}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ventas Est.:</span>
                    <span className="font-medium text-green-600">${mes.ventas.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Beneficios Premium */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ventajas del Calendario Inteligente</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nunca más te pierdas una oportunidad de venta. Planifica automáticamente promociones para fechas
              especiales y temporadas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Planificación Automática</h4>
                <p className="text-sm text-gray-600">Promociones sugeridas para cada fecha especial</p>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Activación en 1 Click</h4>
                <p className="text-sm text-gray-600">Campañas estacionales listas para usar</p>
              </div>
              <div className="text-center">
                <Gift className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Máximo Impacto</h4>
                <p className="text-sm text-gray-600">Aprovecha cada oportunidad de venta estacional</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
