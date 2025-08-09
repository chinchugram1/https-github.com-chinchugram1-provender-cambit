"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Users,
  Package,
  DollarSign,
  Download,
} from "lucide-react"

// Datos mockeados para el reporte de ventas
const ventasPorPeriodo = [
  { periodo: "Enero 2024", ventas: 2450000, pedidos: 247, crecimiento: 15 },
  { periodo: "Diciembre 2023", ventas: 2130000, pedidos: 215, crecimiento: 8 },
  { periodo: "Noviembre 2023", ventas: 1970000, pedidos: 198, crecimiento: -3 },
  { periodo: "Octubre 2023", ventas: 2030000, pedidos: 203, crecimiento: 12 },
]

const ventasPorRubro = [
  { rubro: "Bebidas", ventas: 890000, porcentaje: 36.3, pedidos: 156 },
  { rubro: "Snacks", ventas: 650000, porcentaje: 26.5, pedidos: 134 },
  { rubro: "Lácteos", ventas: 420000, porcentaje: 17.1, pedidos: 89 },
  { rubro: "Panadería", ventas: 290000, porcentaje: 11.8, pedidos: 67 },
  { rubro: "Limpieza", ventas: 200000, porcentaje: 8.2, pedidos: 45 },
]

const ventasPorZona = [
  { zona: "Centro", ventas: 780000, clientes: 23, promedio: 33913 },
  { zona: "Norte", ventas: 650000, clientes: 19, promedio: 34211 },
  { zona: "Sur", ventas: 520000, clientes: 18, promedio: 28889 },
  { zona: "Oeste", ventas: 340000, clientes: 15, promedio: 22667 },
  { zona: "Este", ventas: 160000, clientes: 8, promedio: 20000 },
]

const topClientes = [
  { cliente: "Supermercado La Esquina", ventas: 245000, pedidos: 32, zona: "Sur" },
  { cliente: "Almacén Don Pedro", ventas: 189500, pedidos: 28, zona: "Norte" },
  { cliente: "Kiosco El Rápido", ventas: 156000, pedidos: 24, zona: "Centro" },
  { cliente: "Distribuidora Central", ventas: 134000, pedidos: 19, zona: "Centro" },
  { cliente: "Almacén Familiar", ventas: 98000, pedidos: 15, zona: "Oeste" },
]

export default function ReporteVentasPage() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mes")
  const [zonaSeleccionada, setZonaSeleccionada] = useState("todas")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const totalVentas = ventasPorRubro.reduce((sum, item) => sum + item.ventas, 0)
  const totalPedidos = ventasPorRubro.reduce((sum, item) => sum + item.pedidos, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporte de Ventas</h1>
          <p className="text-gray-600">Análisis detallado de ventas por período, rubro, cliente y zona</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="trimestre">Este trimestre</SelectItem>
                <SelectItem value="año">Este año</SelectItem>
              </SelectContent>
            </Select>

            <Select value={zonaSeleccionada} onValueChange={setZonaSeleccionada}>
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

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalVentas)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+15% vs mes anterior</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-provender-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{totalPedidos}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8% vs mes anterior</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalVentas / totalPedidos)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+6% vs mes anterior</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-sm text-red-600">-2% vs mes anterior</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ventas por Período */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Evolución de Ventas por Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ventasPorPeriodo.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.periodo}</h4>
                  <p className="text-sm text-gray-600">{item.pedidos} pedidos procesados</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(item.ventas)}</p>
                  <div className="flex items-center justify-end">
                    {item.crecimiento > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${item.crecimiento > 0 ? "text-green-600" : "text-red-600"}`}>
                      {item.crecimiento > 0 ? "+" : ""}
                      {item.crecimiento}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ventas por Rubro y Zona */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por Rubro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Ventas por Rubro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ventasPorRubro.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{item.rubro}</span>
                    <span className="text-sm text-gray-600">{item.porcentaje}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-provender-primary h-2 rounded-full"
                      style={{ width: `${item.porcentaje}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatCurrency(item.ventas)}</span>
                    <span>{item.pedidos} pedidos</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ventas por Zona */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ventas por Zona
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ventasPorZona.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.zona}</h4>
                    <p className="text-sm text-gray-600">{item.clientes} clientes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(item.ventas)}</p>
                    <p className="text-sm text-gray-600">Prom: {formatCurrency(item.promedio)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Clientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top Clientes por Ventas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClientes.map((cliente, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-provender-primary text-white rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cliente.cliente}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {cliente.zona}
                      </span>
                      <span>{cliente.pedidos} pedidos</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-provender-primary">{formatCurrency(cliente.ventas)}</p>
                  <p className="text-sm text-gray-600">Prom: {formatCurrency(cliente.ventas / cliente.pedidos)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
