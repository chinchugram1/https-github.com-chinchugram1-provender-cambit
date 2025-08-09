"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  TrendingUp,
  Plus,
  Search,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  BarChart3,
  Info,
} from "lucide-react"

// Datos mock para el dashboard
const estadisticas = {
  aumentosEsteAno: 24,
  promedioAumento: 12.5,
  proximosAumentos: 8,
  impactoProyectado: 2450000,
}

const aumentosProgramados = [
  {
    id: 1,
    nombre: "Aumento Lácteos Q1 2024",
    tipo: "Categoría",
    criterio: "Lácteos",
    porcentaje: 15.0,
    fechaAplicacion: "2024-02-01",
    productosAfectados: 45,
    impactoEstimado: 125000,
    estado: "programado",
    descripcion: "Aumento trimestral de productos lácteos debido a incremento en costos de materias primas",
    productos: [
      { nombre: "Leche La Serenísima 1L", precioAnterior: 420, precioNuevo: 483, diferencia: 63 },
      { nombre: "Yogurt Activia 125g", precioAnterior: 180, precioNuevo: 207, diferencia: 27 },
      { nombre: "Queso Cremoso 200g", precioAnterior: 650, precioNuevo: 748, diferencia: 98 },
    ],
  },
  {
    id: 2,
    nombre: "Ajuste Coca-Cola",
    tipo: "Marca",
    criterio: "Coca-Cola",
    porcentaje: 8.5,
    fechaAplicacion: "2024-01-15",
    productosAfectados: 12,
    impactoEstimado: 85000,
    estado: "programado",
    descripcion: "Ajuste de precios por inflación en productos Coca-Cola",
    productos: [
      { nombre: "Coca-Cola 500ML", precioAnterior: 450, precioNuevo: 488, diferencia: 38 },
      { nombre: "Coca-Cola Light 500ML", precioAnterior: 470, precioNuevo: 510, diferencia: 40 },
      { nombre: "Coca-Cola 1.5L", precioAnterior: 680, precioNuevo: 738, diferencia: 58 },
      { nombre: "Coca-Cola 2.25L", precioAnterior: 850, precioNuevo: 922, diferencia: 72 },
    ],
  },
  {
    id: 3,
    nombre: "Productos Premium",
    tipo: "Múltiple",
    criterio: "Varios productos",
    porcentaje: 20.0,
    fechaAplicacion: "2024-01-20",
    productosAfectados: 8,
    impactoEstimado: 180000,
    estado: "pendiente",
    descripcion: "Aumento en productos premium por reposicionamiento de marca",
    productos: [
      { nombre: "Whisky Premium 750ml", precioAnterior: 8500, precioNuevo: 10200, diferencia: 1700 },
      { nombre: "Vino Reserva 750ml", precioAnterior: 3200, precioNuevo: 3840, diferencia: 640 },
    ],
  },
]

const historialAumentos = [
  {
    id: 4,
    nombre: "Aumento General Diciembre",
    tipo: "Categoría",
    criterio: "Bebidas",
    porcentaje: 12.0,
    fechaAplicacion: "2023-12-01",
    productosAfectados: 38,
    impactoReal: 145000,
    estado: "aplicado",
    descripcion: "Aumento de fin de año en categoría bebidas",
    productos: [
      { nombre: "Pepsi 600ML", precioAnterior: 420, precioNuevo: 470, diferencia: 50 },
      { nombre: "Sprite 500ML", precioAnterior: 380, precioNuevo: 426, diferencia: 46 },
    ],
  },
  {
    id: 5,
    nombre: "Ajuste Inflacionario",
    tipo: "Marca",
    criterio: "Unilever",
    porcentaje: 18.5,
    fechaAplicacion: "2023-11-15",
    productosAfectados: 22,
    impactoReal: 220000,
    estado: "aplicado",
    descripcion: "Ajuste por inflación en productos Unilever",
    productos: [
      { nombre: "Shampoo Sedal 400ml", precioAnterior: 850, precioNuevo: 1007, diferencia: 157 },
      { nombre: "Jabón Dove 90g", precioAnterior: 320, precioNuevo: 379, diferencia: 59 },
    ],
  },
]

export default function ControlPreciosPage() {
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [aumentoSeleccionado, setAumentoSeleccionado] = useState<any>(null)
  const [aumentoAEliminar, setAumentoAEliminar] = useState<any>(null)
  const [aumentos, setAumentos] = useState([...aumentosProgramados, ...historialAumentos])

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "programado":
        return <Badge className="bg-blue-100 text-blue-800">Programado</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "aplicado":
        return <Badge className="bg-green-100 text-green-800">Aplicado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const aumentosFiltrados = aumentos.filter((aumento) => {
    const matchEstado = filtroEstado === "todos" || aumento.estado === filtroEstado
    const matchBusqueda =
      busqueda === "" ||
      aumento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      aumento.criterio.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchBusqueda
  })

  const handleEliminar = (aumento: any) => {
    setAumentos((prev) => prev.filter((a) => a.id !== aumento.id))
    setAumentoAEliminar(null)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Precios</h1>
          <p className="text-gray-600">Gestiona aumentos de precios y analiza su impacto económico</p>
        </div>
        <Link href="/proveedor/control-precios/nuevo">
          <Button className="bg-provender-primary hover:bg-provender-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Aumento
          </Button>
        </Link>
      </div>

      {/* Explicación del Impacto */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">¿Qué significa "Impacto"?</p>
              <p>
                El <strong>impacto económico</strong> es el dinero adicional que generarás por los aumentos de precios.
                Se calcula multiplicando la diferencia de precio por la cantidad estimada de ventas de cada producto.
              </p>
              <p className="mt-1">
                <strong>Ejemplo:</strong> Si un producto cuesta $100 y lo aumentas a $115 (+15%), y vendes 100 unidades
                al mes, el impacto mensual será de $1,500 adicionales ($15 × 100 unidades).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aumentos Este Año</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.aumentosEsteAno}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio Aumento</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.promedioAumento}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Próximos Aumentos</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.proximosAumentos}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Adicionales Proyectados</p>
                <p className="text-2xl font-bold text-gray-900">${estadisticas.impactoProyectado.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre o criterio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="programado">Programado</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="aplicado">Aplicado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Aumentos */}
      <Card>
        <CardHeader>
          <CardTitle>Aumentos de Precios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aumentosFiltrados.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No se encontraron aumentos con los filtros aplicados</p>
              </div>
            ) : (
              aumentosFiltrados.map((aumento) => (
                <div key={aumento.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{aumento.nombre}</h3>
                        {getEstadoBadge(aumento.estado)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Tipo:</span> {aumento.tipo}
                        </div>
                        <div>
                          <span className="font-medium">Criterio:</span> {aumento.criterio}
                        </div>
                        <div>
                          <span className="font-medium">Aumento:</span> {aumento.porcentaje}%
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span>{" "}
                          {new Date(aumento.fechaAplicacion).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                        <div>
                          <span className="font-medium">Productos:</span> {aumento.productosAfectados}
                        </div>
                        <div>
                          <span className="font-medium">Ingresos Adicionales:</span> $
                          {(aumento.impactoEstimado || aumento.impactoReal).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* Botón Ver */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setAumentoSeleccionado(aumento)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Eye className="w-5 h-5" />
                              Detalle del Aumento
                            </DialogTitle>
                          </DialogHeader>
                          {aumentoSeleccionado && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Nombre</p>
                                  <p className="text-gray-900">{aumentoSeleccionado.nombre}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Estado</p>
                                  {getEstadoBadge(aumentoSeleccionado.estado)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Tipo</p>
                                  <p className="text-gray-900">{aumentoSeleccionado.tipo}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Criterio</p>
                                  <p className="text-gray-900">{aumentoSeleccionado.criterio}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Porcentaje</p>
                                  <p className="text-gray-900 font-semibold">{aumentoSeleccionado.porcentaje}%</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Fecha de Aplicación</p>
                                  <p className="text-gray-900">
                                    {new Date(aumentoSeleccionado.fechaAplicacion).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              {aumentoSeleccionado.descripcion && (
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Descripción</p>
                                  <p className="text-gray-900">{aumentoSeleccionado.descripcion}</p>
                                </div>
                              )}

                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Resumen Económico</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Productos Afectados:</span>
                                    <span className="ml-2 font-semibold">{aumentoSeleccionado.productosAfectados}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Ingresos Adicionales:</span>
                                    <span className="ml-2 font-semibold text-green-600">
                                      $
                                      {(
                                        aumentoSeleccionado.impactoEstimado || aumentoSeleccionado.impactoReal
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {aumentoSeleccionado.productos && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Productos Incluidos (muestra)</h4>
                                  <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {aumentoSeleccionado.productos.map((producto: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center text-sm bg-white p-2 rounded border"
                                      >
                                        <span className="font-medium">{producto.nombre}</span>
                                        <div className="flex gap-4 text-xs">
                                          <span className="text-gray-600">${producto.precioAnterior}</span>
                                          <span className="text-gray-400">→</span>
                                          <span className="text-green-600 font-semibold">${producto.precioNuevo}</span>
                                          <span className="text-blue-600">(+${producto.diferencia})</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {/* Botón Editar - Ahora redirige a la página de edición */}
                      {aumento.estado !== "aplicado" && (
                        <Link href={`/proveedor/control-precios/editar/${aumento.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}

                      {/* Botón Eliminar */}
                      {aumento.estado !== "aplicado" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => setAumentoAEliminar(aumento)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar aumento?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el aumento "
                                {aumento.nombre}" que afecta a {aumento.productosAfectados} productos.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleEliminar(aumento)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Aumentos Destacados */}
      {aumentosProgramados.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="w-5 h-5" />
              Próximos Aumentos Programados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aumentosProgramados.slice(0, 3).map((aumento) => (
                <div key={aumento.id} className="flex items-center justify-between text-sm">
                  <span className="text-orange-800">
                    <strong>{aumento.nombre}</strong> - {aumento.porcentaje}%
                    <span className="text-orange-600 ml-2">
                      (+${aumento.impactoEstimado.toLocaleString()} adicionales)
                    </span>
                  </span>
                  <span className="text-orange-600">{new Date(aumento.fechaAplicacion).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
