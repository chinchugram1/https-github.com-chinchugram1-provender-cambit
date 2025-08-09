"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Calendar,
  BarChart3,
  LineChart,
  Crown,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Target,
} from "lucide-react"

const evolucionData = {
  semanal: [
    { semana: "Sem 1", pedidos: 45, crecimiento: 12 },
    { semana: "Sem 2", pedidos: 52, crecimiento: 15.6 },
    { semana: "Sem 3", pedidos: 48, crecimiento: -7.7 },
    { semana: "Sem 4", pedidos: 61, crecimiento: 27.1 },
  ],
  mensual: [
    { mes: "Enero", pedidos: 180, crecimiento: 8.5 },
    { mes: "Febrero", pedidos: 195, crecimiento: 8.3 },
    { mes: "Marzo", pedidos: 210, crecimiento: 7.7 },
    { mes: "Abril", pedidos: 225, crecimiento: 7.1 },
  ],
  proyecciones: [
    { periodo: "Mayo 2024", pedidos: 240, confianza: 85 },
    { periodo: "Junio 2024", pedidos: 255, confianza: 78 },
    { periodo: "Julio 2024", pedidos: 270, confianza: 72 },
  ],
}

const tendencias = [
  {
    titulo: "Crecimiento Sostenido",
    descripcion: "Los pedidos muestran una tendencia positiva del 12% mensual",
    tipo: "positivo",
    valor: "+12%",
  },
  {
    titulo: "Picos Estacionales",
    descripcion: "Se observan aumentos en fin de mes y fechas especiales",
    tipo: "info",
    valor: "Patrón",
  },
  {
    titulo: "Días Óptimos",
    descripcion: "Martes y jueves son los días con mayor volumen de pedidos",
    tipo: "info",
    valor: "Ma-Ju",
  },
]

const analisisEstacional = [
  { temporada: "Verano", impacto: "Alto", productos: "Bebidas, Helados", crecimiento: "+25%" },
  { temporada: "Otoño", impacto: "Medio", productos: "Snacks, Golosinas", crecimiento: "+8%" },
  { temporada: "Invierno", impacto: "Bajo", productos: "Bebidas Calientes", crecimiento: "-5%" },
  { temporada: "Primavera", impacto: "Alto", productos: "Productos Frescos", crecimiento: "+18%" },
]

export default function EvolucionPage() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mensual")

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#0492C2]" />
            Evolución de Pedidos
            <Crown className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-2">Análisis de tendencias y proyecciones futuras</p>
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
                <p className="text-sm font-medium text-gray-600">Pedidos Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">225</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUp className="h-4 w-4" />
                  +7.1%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-[#0492C2]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio Semanal</p>
                <p className="text-2xl font-bold text-gray-900">56</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUp className="h-4 w-4" />
                  +15.2%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyección Mayo</p>
                <p className="text-2xl font-bold text-gray-900">240</p>
                <p className="text-sm text-blue-600 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  85% confianza
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Crecimiento Anual</p>
                <p className="text-2xl font-bold text-gray-900">+28%</p>
                <p className="text-sm text-green-600">vs año anterior</p>
              </div>
              <LineChart className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selector de Período */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={periodoSeleccionado === "semanal" ? "default" : "outline"}
          onClick={() => setPeriodoSeleccionado("semanal")}
        >
          Semanal
        </Button>
        <Button
          variant={periodoSeleccionado === "mensual" ? "default" : "outline"}
          onClick={() => setPeriodoSeleccionado("mensual")}
        >
          Mensual
        </Button>
        <Button
          variant={periodoSeleccionado === "proyecciones" ? "default" : "outline"}
          onClick={() => setPeriodoSeleccionado("proyecciones")}
        >
          Proyecciones
        </Button>
      </div>

      {/* Gráfico de Evolución */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Evolución{" "}
            {periodoSeleccionado === "semanal"
              ? "Semanal"
              : periodoSeleccionado === "mensual"
                ? "Mensual"
                : "Proyectada"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evolucionData[periodoSeleccionado as keyof typeof evolucionData].map((item: any, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0492C2] rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.semana || item.mes || item.periodo}</h3>
                    <p className="text-sm text-gray-600">{item.pedidos} pedidos</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.crecimiento !== undefined && (
                    <div
                      className={`flex items-center gap-1 ${item.crecimiento >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.crecimiento >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {Math.abs(item.crecimiento)}%
                    </div>
                  )}
                  {item.confianza && (
                    <Badge variant="secondary" className="mt-1">
                      {item.confianza}% confianza
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análisis de Tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencias Identificadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tendencias.map((tendencia, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${tendencia.tipo === "positivo" ? "bg-green-100" : "bg-blue-100"}`}>
                    {tendencia.tipo === "positivo" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{tendencia.titulo}</h4>
                    <p className="text-sm text-gray-600">{tendencia.descripcion}</p>
                  </div>
                  <Badge variant="secondary">{tendencia.valor}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Análisis Estacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analisisEstacional.map((temporada, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{temporada.temporada}</h4>
                    <p className="text-sm text-gray-600">{temporada.productos}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={
                        temporada.impacto === "Alto"
                          ? "bg-green-100 text-green-800"
                          : temporada.impacto === "Medio"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {temporada.impacto}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{temporada.crecimiento}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recomendaciones Inteligentes
          </CardTitle>
          <CardDescription>Sugerencias basadas en el análisis de tendencias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900">Optimizar Inventario</h4>
              <p className="text-sm text-blue-700 mt-1">
                Aumentar stock de bebidas para el próximo mes considerando la tendencia estacional
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900">Promociones Estratégicas</h4>
              <p className="text-sm text-green-700 mt-1">
                Lanzar promociones los martes y jueves para maximizar el volumen de pedidos
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900">Expansión de Clientes</h4>
              <p className="text-sm text-purple-700 mt-1">
                El crecimiento sostenido indica oportunidad para captar nuevos clientes
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900">Planificación Estacional</h4>
              <p className="text-sm text-orange-700 mt-1">
                Preparar estrategia para temporada alta de primavera-verano
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
