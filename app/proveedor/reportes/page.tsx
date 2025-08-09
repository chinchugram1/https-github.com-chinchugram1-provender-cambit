"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Package, DollarSign, Calendar, Crown, Sparkles, Zap, Star } from "lucide-react"
import Link from "next/link"

const reportes = [
  {
    title: "Reporte de Ventas",
    description: "Análisis detallado de ventas por período",
    href: "/proveedor/reportes/ventas",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Productos y Rotación",
    description: "Análisis de productos más vendidos y rotación de stock",
    href: "/proveedor/reportes/productos",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Evolución de Pedidos",
    description: "Tendencias y proyecciones de pedidos",
    href: "/proveedor/reportes/evolucion",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Impacto de Promociones",
    description: "ROI y efectividad de promociones",
    href: "/proveedor/reportes/promociones",
    icon: Sparkles,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Rentabilidad",
    description: "Análisis de márgenes y rentabilidad por producto",
    href: "/proveedor/reportes/rentabilidad",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Comparativo de Clientes",
    description: "Análisis de comportamiento y rendimiento de clientes",
    href: "/proveedor/reportes/clientes",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

const kpis = [
  {
    title: "Ventas del Mes",
    value: "$125,430",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Pedidos Totales",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Clientes Activos",
    value: "89",
    change: "+5.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Productos Vendidos",
    value: "3,456",
    change: "+15.3%",
    trend: "up",
    icon: BarChart3,
  },
]

export default function ReportesPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Premium Banner */}
      <div className="mb-8">
        <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Reportería Premium
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Accede a análisis avanzados y reportes detallados para optimizar tu negocio
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">Funcionalidad Premium</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-[#0492C2]" />
            Reportería
            <Crown className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-2">Dashboard de análisis y reportes para la toma de decisiones</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Última actualización: {new Date().toLocaleDateString("es-AR")}</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {kpi.change}
                  </p>
                </div>
                <div className="p-3 bg-[#0492C2]/10 rounded-full">
                  <kpi.icon className="h-6 w-6 text-[#0492C2]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reportes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportes.map((reporte, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${reporte.bgColor}`}>
                  <reporte.icon className={`h-6 w-6 ${reporte.color}`} />
                </div>
                <Crown className="h-4 w-4 text-yellow-500" />
              </div>
              <CardTitle className="text-lg">{reporte.title}</CardTitle>
              <CardDescription>{reporte.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={reporte.href}>
                <Button className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90">Ver Reporte</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Features Info */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¿Por qué elegir Reportería Premium?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Obtén insights profundos de tu negocio con análisis avanzados, proyecciones inteligentes y reportes
                personalizables que te ayudarán a tomar mejores decisiones comerciales.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Análisis Profundos</h4>
                  <p className="text-sm text-gray-600">Métricas avanzadas y KPIs detallados</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Proyecciones</h4>
                  <p className="text-sm text-gray-600">Predicciones basadas en datos históricos</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-[#0492C2] mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Tiempo Real</h4>
                  <p className="text-sm text-gray-600">Datos actualizados automáticamente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
