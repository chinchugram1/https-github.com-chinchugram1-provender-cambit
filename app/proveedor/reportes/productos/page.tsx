"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, TrendingUp, TrendingDown, AlertTriangle, Star, BarChart3, Download } from "lucide-react"

// Datos mockeados para productos
const productosMasVendidos = [
  {
    id: 1,
    nombre: "Coca Cola 500ml",
    categoria: "Bebidas",
    vendidos: 1250,
    ingresos: 312500,
    stock: 45,
    rotacion: "Alta",
    margen: 35,
  },
  {
    id: 2,
    nombre: "Papas Lays Original",
    categoria: "Snacks",
    vendidos: 890,
    ingresos: 178000,
    stock: 23,
    rotacion: "Alta",
    margen: 42,
  },
  {
    id: 3,
    nombre: "Pan Lactal Bimbo",
    categoria: "Panadería",
    vendidos: 567,
    ingresos: 85050,
    stock: 12,
    rotacion: "Media",
    margen: 28,
  },
  {
    id: 4,
    nombre: "Leche La Serenísima 1L",
    categoria: "Lácteos",
    vendidos: 445,
    ingresos: 133500,
    stock: 67,
    rotacion: "Media",
    margen: 25,
  },
  {
    id: 5,
    nombre: "Agua Villavicencio 500ml",
    categoria: "Bebidas",
    vendidos: 423,
    ingresos: 63450,
    stock: 89,
    rotacion: "Alta",
    margen: 45,
  },
]

const productosMenorRotacion = [
  {
    id: 6,
    nombre: "Detergente Ariel 500ml",
    categoria: "Limpieza",
    vendidos: 12,
    ingresos: 4800,
    stock: 156,
    rotacion: "Baja",
    margen: 38,
    diasSinVenta: 45,
  },
  {
    id: 7,
    nombre: "Shampoo Sedal 400ml",
    categoria: "Cuidado Personal",
    vendidos: 8,
    ingresos: 3200,
    stock: 89,
    rotacion: "Baja",
    margen: 32,
    diasSinVenta: 38,
  },
  {
    id: 8,
    nombre: "Aceite Natura 900ml",
    categoria: "Almacén",
    vendidos: 15,
    ingresos: 7500,
    stock: 234,
    rotacion: "Baja",
    margen: 22,
    diasSinVenta: 32,
  },
  {
    id: 9,
    nombre: "Galletas Oreo",
    categoria: "Snacks",
    vendidos: 23,
    ingresos: 9200,
    stock: 145,
    rotacion: "Baja",
    margen: 35,
    diasSinVenta: 28,
  },
  {
    id: 10,
    nombre: "Yogur Danone Frutilla",
    categoria: "Lácteos",
    vendidos: 18,
    ingresos: 5400,
    stock: 67,
    rotacion: "Baja",
    margen: 30,
    diasSinVenta: 25,
  },
]

const stockCritico = [
  { nombre: "Coca Cola 500ml", stock: 5, minimo: 20, categoria: "Bebidas" },
  { nombre: "Pan Lactal Bimbo", stock: 3, minimo: 15, categoria: "Panadería" },
  { nombre: "Papas Lays Original", stock: 8, minimo: 25, categoria: "Snacks" },
  { nombre: "Leche La Serenísima 1L", stock: 12, minimo: 30, categoria: "Lácteos" },
]

const rentabilidadProductos = [
  { nombre: "Agua Villavicencio 500ml", precioVenta: 150, costo: 82, margen: 45.3, rentabilidad: "Excelente" },
  { nombre: "Papas Lays Original", precioVenta: 200, costo: 116, margen: 42.0, rentabilidad: "Muy Buena" },
  { nombre: "Detergente Ariel 500ml", precioVenta: 400, costo: 248, margen: 38.0, rentabilidad: "Buena" },
  { nombre: "Coca Cola 500ml", precioVenta: 250, costo: 162, margen: 35.2, rentabilidad: "Buena" },
  { nombre: "Galletas Oreo", precioVenta: 400, costo: 260, margen: 35.0, rentabilidad: "Buena" },
]

export default function ReporteProductosPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")
  const [tipoReporte, setTipoReporte] = useState("mas-vendidos")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const getRotacionColor = (rotacion: string) => {
    switch (rotacion) {
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

  const getRentabilidadColor = (rentabilidad: string) => {
    switch (rentabilidad) {
      case "Excelente":
        return "bg-green-100 text-green-800"
      case "Muy Buena":
        return "bg-blue-100 text-blue-800"
      case "Buena":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos y Rotación</h1>
          <p className="text-gray-600">Análisis de productos más vendidos, rotación y rentabilidad</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={tipoReporte} onValueChange={setTipoReporte}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mas-vendidos">Más Vendidos</SelectItem>
                <SelectItem value="menor-rotacion">Menor Rotación</SelectItem>
                <SelectItem value="stock-critico">Stock Crítico</SelectItem>
                <SelectItem value="rentabilidad">Rentabilidad</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="Bebidas">Bebidas</SelectItem>
                <SelectItem value="Snacks">Snacks</SelectItem>
                <SelectItem value="Lácteos">Lácteos</SelectItem>
                <SelectItem value="Panadería">Panadería</SelectItem>
                <SelectItem value="Limpieza">Limpieza</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productos Activos</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-gray-500">+12 este mes</p>
              </div>
              <Package className="h-8 w-8 text-provender-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alta Rotación</p>
                <p className="text-2xl font-bold text-green-600">45</p>
                <p className="text-xs text-gray-500">28.8% del total</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Baja Rotación</p>
                <p className="text-2xl font-bold text-red-600">23</p>
                <p className="text-xs text-gray-500">14.7% del total</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Crítico</p>
                <p className="text-2xl font-bold text-orange-600">4</p>
                <p className="text-xs text-gray-500">Requieren reposición</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido Principal según el tipo de reporte */}
      {tipoReporte === "mas-vendidos" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productosMasVendidos.map((producto, index) => (
                <div key={producto.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-provender-primary text-white rounded-full font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <Badge variant="secondary">{producto.categoria}</Badge>
                        <Badge className={getRotacionColor(producto.rotacion)}>{producto.rotacion} Rotación</Badge>
                        <span>Stock: {producto.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-provender-primary">{formatCurrency(producto.ingresos)}</p>
                    <p className="text-sm text-gray-600">{producto.vendidos} unidades vendidas</p>
                    <p className="text-xs text-green-600">Margen: {producto.margen}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tipoReporte === "menor-rotacion" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Productos con Menor Rotación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productosMenorRotacion.map((producto, index) => (
                <div key={producto.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <Badge variant="secondary">{producto.categoria}</Badge>
                        <Badge className={getRotacionColor(producto.rotacion)}>{producto.rotacion} Rotación</Badge>
                        <span className="text-red-600">{producto.diasSinVenta} días sin venta</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">Stock: {producto.stock}</p>
                    <p className="text-sm text-gray-600">{producto.vendidos} vendidos este mes</p>
                    <p className="text-xs text-gray-500">{formatCurrency(producto.ingresos)} ingresos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tipoReporte === "stock-critico" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Productos con Stock Crítico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockCritico.map((producto, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                      <Badge variant="secondary">{producto.categoria}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">Stock: {producto.stock}</p>
                    <p className="text-sm text-gray-600">Mínimo: {producto.minimo}</p>
                    <Badge className="bg-orange-100 text-orange-800">
                      Reponer {producto.minimo - producto.stock} unidades
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tipoReporte === "rentabilidad" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Rentabilidad por Producto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rentabilidadProductos.map((producto, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>Precio: {formatCurrency(producto.precioVenta)}</span>
                      <span>Costo: {formatCurrency(producto.costo)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-provender-primary">{producto.margen}%</p>
                    <Badge className={getRentabilidadColor(producto.rentabilidad)}>{producto.rentabilidad}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
