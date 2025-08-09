"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  Crown,
  Download,
  Filter,
  Package,
  BarChart3,
  AlertTriangle,
  Target,
} from "lucide-react"

const productosRentabilidad = [
  {
    id: 1,
    codigo: "116",
    nombre: "Coca Cola 500ml",
    categoria: "Bebidas",
    marca: "Coca-Cola",
    precioVenta: 450,
    costoEstimado: 320,
    margen: 28.9,
    ventasMes: 145,
    facturacionMes: 65250,
    rentabilidadMes: 18825,
    clasificacion: "Alta",
  },
  {
    id: 2,
    codigo: "201",
    nombre: "Alfajor Havanna",
    categoria: "Golosinas",
    marca: "Havanna",
    precioVenta: 320,
    costoEstimado: 200,
    margen: 37.5,
    ventasMes: 89,
    facturacionMes: 28480,
    rentabilidadMes: 10680,
    clasificacion: "Alta",
  },
  {
    id: 3,
    codigo: "301",
    nombre: "Papas Lays Clásicas",
    categoria: "Snacks",
    marca: "Lays",
    precioVenta: 380,
    costoEstimado: 280,
    margen: 26.3,
    ventasMes: 67,
    facturacionMes: 25460,
    rentabilidadMes: 6700,
    clasificacion: "Media",
  },
  {
    id: 4,
    codigo: "121",
    nombre: "Agua Villavicencio 1.5L",
    categoria: "Bebidas",
    marca: "Villavicencio",
    precioVenta: 280,
    costoEstimado: 220,
    margen: 21.4,
    ventasMes: 156,
    facturacionMes: 43680,
    rentabilidadMes: 9360,
    clasificacion: "Media",
  },
  {
    id: 5,
    codigo: "204",
    nombre: "Caramelos Sugus",
    categoria: "Golosinas",
    marca: "Arcor",
    precioVenta: 180,
    costoEstimado: 150,
    margen: 16.7,
    ventasMes: 234,
    facturacionMes: 42120,
    rentabilidadMes: 7020,
    clasificacion: "Baja",
  },
]

const categoriaRentabilidad = [
  { categoria: "Golosinas", margenPromedio: 32.1, productos: 15, rentabilidadTotal: 45600 },
  { categoria: "Bebidas", margenPromedio: 25.8, productos: 22, rentabilidadTotal: 38200 },
  { categoria: "Snacks", margenPromedio: 28.4, productos: 12, rentabilidadTotal: 28900 },
  { categoria: "Lácteos", margenPromedio: 19.2, productos: 8, rentabilidadTotal: 15400 },
]

const alertas = [
  {
    tipo: "critico",
    mensaje: "5 productos con margen menor al 15%",
    productos: ["Leche La Serenísima", "Pan Lactal", "Yogur Ser", "Queso Cremoso", "Manteca"],
  },
  {
    tipo: "oportunidad",
    mensaje: "3 productos con potencial de aumento de precio",
    productos: ["Alfajor Jorgito", "Gaseosa Pepsi", "Chocolate Milka"],
  },
  {
    tipo: "info",
    mensaje: "Margen promedio general: 28.5%",
    productos: [],
  },
]

export default function RentabilidadPage() {
  const [filtroCategoria, setFiltroCategoria] = useState("todas")
  const [filtroClasificacion, setFiltroClasificacion] = useState("todas")
  const [ordenPor, setOrdenPor] = useState("margen")

  const productosFiltrados = productosRentabilidad
    .filter((producto) => {
      const cumpleCategoria = filtroCategoria === "todas" || producto.categoria === filtroCategoria
      const cumpleClasificacion = filtroClasificacion === "todas" || producto.clasificacion === filtroClasificacion
      return cumpleCategoria && cumpleClasificacion
    })
    .sort((a, b) => {
      switch (ordenPor) {
        case "margen":
          return b.margen - a.margen
        case "rentabilidad":
          return b.rentabilidadMes - a.rentabilidadMes
        case "ventas":
          return b.ventasMes - a.ventasMes
        default:
          return 0
      }
    })

  const getClasificacionColor = (clasificacion: string) => {
    switch (clasificacion) {
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

  const getMargenColor = (margen: number) => {
    if (margen >= 30) return "text-green-600"
    if (margen >= 20) return "text-yellow-600"
    return "text-red-600"
  }

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case "critico":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "oportunidad":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-blue-600" />
    }
  }

  const totalRentabilidad = productosFiltrados.reduce((sum, p) => sum + p.rentabilidadMes, 0)
  const margenPromedio = productosFiltrados.reduce((sum, p) => sum + p.margen, 0) / productosFiltrados.length

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[#0492C2]" />
            Rentabilidad por Producto
            <Crown className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-2">Análisis de márgenes y rentabilidad estimada por producto</p>
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
                <p className="text-sm font-medium text-gray-600">Rentabilidad Total</p>
                <p className="text-2xl font-bold text-gray-900">${totalRentabilidad.toLocaleString()}</p>
                <p className="text-sm text-green-600">Este mes</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Margen Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{margenPromedio.toFixed(1)}%</p>
                <p className="text-sm text-blue-600">Productos filtrados</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productos Analizados</p>
                <p className="text-2xl font-bold text-gray-900">{productosFiltrados.length}</p>
                <p className="text-sm text-purple-600">En análisis</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alta Rentabilidad</p>
                <p className="text-2xl font-bold text-gray-900">
                  {productosFiltrados.filter((p) => p.clasificacion === "Alta").length}
                </p>
                <p className="text-sm text-green-600">Productos</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {alertas.map((alerta, index) => (
          <Card
            key={index}
            className={`border-l-4 ${
              alerta.tipo === "critico"
                ? "border-red-500 bg-red-50"
                : alerta.tipo === "oportunidad"
                  ? "border-green-500 bg-green-50"
                  : "border-blue-500 bg-blue-50"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getAlertaIcon(alerta.tipo)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{alerta.mensaje}</h4>
                  {alerta.productos.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Productos afectados:</p>
                      <div className="flex flex-wrap gap-1">
                        {alerta.productos.slice(0, 3).map((producto, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {producto}
                          </Badge>
                        ))}
                        {alerta.productos.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{alerta.productos.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros y Ordenamiento */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Ordenamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clasificación</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filtroClasificacion}
                onChange={(e) => setFiltroClasificacion(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={ordenPor}
                onChange={(e) => setOrdenPor(e.target.value)}
              >
                <option value="margen">Margen (%)</option>
                <option value="rentabilidad">Rentabilidad ($)</option>
                <option value="ventas">Ventas (unidades)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Productos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Análisis Detallado por Producto
          </CardTitle>
          <CardDescription>Rentabilidad, márgenes y clasificación de productos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {producto.codigo}
                      </Badge>
                      <Badge className={getClasificacionColor(producto.clasificacion)}>{producto.clasificacion}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{producto.nombre}</h3>
                    <p className="text-sm text-gray-600">
                      {producto.marca} • {producto.categoria}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getMargenColor(producto.margen)}`}>
                      {producto.margen.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">Margen</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Precio Venta</p>
                    <p className="font-semibold">${producto.precioVenta}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Costo Estimado</p>
                    <p className="font-semibold">${producto.costoEstimado}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ventas/Mes</p>
                    <p className="font-semibold">{producto.ventasMes} unidades</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Facturación</p>
                    <p className="font-semibold">${producto.facturacionMes.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rentabilidad</p>
                    <p className="font-semibold text-green-600">${producto.rentabilidadMes.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análisis por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rentabilidad por Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoriaRentabilidad.map((categoria, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{categoria.categoria}</h4>
                  <p className="text-sm text-gray-600">{categoria.productos} productos</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getMargenColor(categoria.margenPromedio)}`}>
                    {categoria.margenPromedio.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">${categoria.rentabilidadTotal.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
