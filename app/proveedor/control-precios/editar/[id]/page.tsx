"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, AlertTriangle, Info, TrendingUp, Package, Plus, Trash2, Edit } from "lucide-react"

// Datos mock con jerarquía correcta
const marcas = [
  { id: 1, nombre: "Coca-Cola" },
  { id: 2, nombre: "Pepsi" },
  { id: 3, nombre: "Unilever" },
  { id: 4, nombre: "P&G" },
  { id: 5, nombre: "Nestlé" },
  { id: 6, nombre: "La Serenísima" },
]

const categorias = [
  { id: 1, nombre: "Lácteos", marcaId: 6 },
  { id: 2, nombre: "Bebidas", marcaId: 1 },
  { id: 3, nombre: "Bebidas", marcaId: 2 },
  { id: 4, nombre: "Snacks", marcaId: 5 },
  { id: 5, nombre: "Limpieza", marcaId: 3 },
  { id: 6, nombre: "Perfumería", marcaId: 4 },
]

const subcategorias = [
  { id: 1, nombre: "500ML", categoriaId: 2, marcaId: 1 },
  { id: 2, nombre: "1.5L", categoriaId: 2, marcaId: 1 },
  { id: 3, nombre: "2.25L", categoriaId: 2, marcaId: 1 },
  { id: 4, nombre: "600ML", categoriaId: 3, marcaId: 2 },
  { id: 5, nombre: "2L", categoriaId: 3, marcaId: 2 },
  { id: 6, nombre: "1L", categoriaId: 1, marcaId: 6 },
  { id: 7, nombre: "Sachet", categoriaId: 1, marcaId: 6 },
]

const productos = [
  { id: 1, nombre: "Coca-Cola 500ML", sku: "CC-500", precio: 450, marcaId: 1, categoriaId: 2, subcategoriaId: 1 },
  {
    id: 2,
    nombre: "Coca-Cola Light 500ML",
    sku: "CCL-500",
    precio: 470,
    marcaId: 1,
    categoriaId: 2,
    subcategoriaId: 1,
  },
  { id: 3, nombre: "Coca-Cola 1.5L", sku: "CC-1500", precio: 680, marcaId: 1, categoriaId: 2, subcategoriaId: 2 },
  { id: 4, nombre: "Coca-Cola 2.25L", sku: "CC-2250", precio: 850, marcaId: 1, categoriaId: 2, subcategoriaId: 3 },
  { id: 5, nombre: "Pepsi 600ML", sku: "PP-600", precio: 420, marcaId: 2, categoriaId: 3, subcategoriaId: 4 },
  { id: 6, nombre: "Pepsi 2L", sku: "PP-2000", precio: 780, marcaId: 2, categoriaId: 3, subcategoriaId: 5 },
  {
    id: 7,
    nombre: "Leche La Serenísima 1L",
    sku: "LS-1000",
    precio: 420,
    marcaId: 6,
    categoriaId: 1,
    subcategoriaId: 6,
  },
  {
    id: 8,
    nombre: "Leche La Serenísima Sachet",
    sku: "LS-SACH",
    precio: 380,
    marcaId: 6,
    categoriaId: 1,
    subcategoriaId: 7,
  },
]

// Datos mock de aumentos existentes
const aumentosExistentes = [
  {
    id: 1,
    nombre: "Aumento Lácteos Q1 2024",
    descripcion: "Aumento trimestral de productos lácteos debido a incremento en costos de materias primas",
    fechaAplicacion: "2024-02-01",
    aplicarInmediatamente: false,
    productos: [
      {
        id: "1-7",
        tipo: "producto",
        marcaId: 6,
        categoriaId: 1,
        subcategoriaId: 6,
        productoId: 7,
        descripcion: "Leche La Serenísima 1L (LS-1000) - $420",
        porcentaje: 15,
        producto: productos[6],
      },
      {
        id: "1-8",
        tipo: "producto",
        marcaId: 6,
        categoriaId: 1,
        subcategoriaId: 7,
        productoId: 8,
        descripcion: "Leche La Serenísima Sachet (LS-SACH) - $380",
        porcentaje: 15,
        producto: productos[7],
      },
    ],
  },
  {
    id: 2,
    nombre: "Ajuste Coca-Cola",
    descripcion: "Ajuste de precios por inflación en productos Coca-Cola",
    fechaAplicacion: "2024-01-15",
    aplicarInmediatamente: false,
    productos: [
      {
        id: "2-1",
        tipo: "producto",
        marcaId: 1,
        categoriaId: 2,
        subcategoriaId: 1,
        productoId: 1,
        descripcion: "Coca-Cola 500ML (CC-500) - $450",
        porcentaje: 8.5,
        producto: productos[0],
      },
      {
        id: "2-2",
        tipo: "producto",
        marcaId: 1,
        categoriaId: 2,
        subcategoriaId: 1,
        productoId: 2,
        descripcion: "Coca-Cola Light 500ML (CCL-500) - $470",
        porcentaje: 8.5,
        producto: productos[1],
      },
      {
        id: "2-3",
        tipo: "producto",
        marcaId: 1,
        categoriaId: 2,
        subcategoriaId: 2,
        productoId: 3,
        descripcion: "Coca-Cola 1.5L (CC-1500) - $680",
        porcentaje: 8.5,
        producto: productos[2],
      },
      {
        id: "2-4",
        tipo: "producto",
        marcaId: 1,
        categoriaId: 2,
        subcategoriaId: 3,
        productoId: 4,
        descripcion: "Coca-Cola 2.25L (CC-2250) - $850",
        porcentaje: 8.5,
        producto: productos[3],
      },
    ],
  },
]

interface ProductoAumento {
  id: string
  tipo: "marca" | "categoria" | "subcategoria" | "producto"
  marcaId?: number
  categoriaId?: number
  subcategoriaId?: number
  productoId?: number
  descripcion: string
  porcentaje: number
  producto: any
}

export default function EditarAumentoPage() {
  const router = useRouter()
  const params = useParams()
  const aumentoId = Number.parseInt(params.id as string)

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaAplicacion: "",
    aplicarInmediatamente: false,
  })

  // Estados para la selección jerárquica
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("")
  const [productoSeleccionado, setProductoSeleccionado] = useState("")
  const [porcentajeTemp, setPorcentajeTemp] = useState("")

  // Lista de productos/criterios a aumentar
  const [productosAumento, setProductosAumento] = useState<ProductoAumento[]>([])

  const [proyeccion, setProyeccion] = useState({
    productosAfectados: 0,
    impactoEstimado: 0,
    precioPromedioAnterior: 0,
    precioPromedioNuevo: 0,
  })

  // Cargar datos del aumento existente
  useEffect(() => {
    const aumentoExistente = aumentosExistentes.find((a) => a.id === aumentoId)
    if (aumentoExistente) {
      setFormData({
        nombre: aumentoExistente.nombre,
        descripcion: aumentoExistente.descripcion,
        fechaAplicacion: aumentoExistente.fechaAplicacion,
        aplicarInmediatamente: aumentoExistente.aplicarInmediatamente,
      })
      setProductosAumento(aumentoExistente.productos)
      calcularProyeccionTotal(aumentoExistente.productos)
    }

    // Simular carga desde localStorage para demo
    const aumentosGuardados = JSON.parse(localStorage.getItem("aumentos") || "[]")
    const aumentoGuardado = aumentosGuardados.find((a: any) => a.id === aumentoId)
    if (aumentoGuardado) {
      setFormData({
        nombre: aumentoGuardado.nombre,
        descripcion: aumentoGuardado.descripcion,
        fechaAplicacion: aumentoGuardado.fechaAplicacion,
        aplicarInmediatamente: aumentoGuardado.aplicarInmediatamente,
      })
      setProductosAumento(aumentoGuardado.productos)
      setProyeccion(aumentoGuardado.proyeccion)
    }
  }, [aumentoId])

  // Obtener categorías filtradas por marca
  const categoriasFiltradas = marcaSeleccionada
    ? categorias.filter((cat) => cat.marcaId === Number.parseInt(marcaSeleccionada))
    : []

  // Obtener subcategorías filtradas por marca y categoría
  const subcategoriasFiltradas =
    marcaSeleccionada && categoriaSeleccionada
      ? subcategorias.filter(
          (sub) =>
            sub.marcaId === Number.parseInt(marcaSeleccionada) &&
            sub.categoriaId === Number.parseInt(categoriaSeleccionada),
        )
      : []

  // Obtener productos filtrados
  const productosFiltrados = marcaSeleccionada
    ? productos.filter((prod) => {
        if (subcategoriaSeleccionada) {
          return prod.subcategoriaId === Number.parseInt(subcategoriaSeleccionada)
        }
        if (categoriaSeleccionada) {
          return prod.categoriaId === Number.parseInt(categoriaSeleccionada)
        }
        return prod.marcaId === Number.parseInt(marcaSeleccionada)
      })
    : []

  const agregarCriterio = () => {
    if (!marcaSeleccionada) return

    const marca = marcas.find((m) => m.id === Number.parseInt(marcaSeleccionada))
    const categoria = categorias.find((c) => c.id === Number.parseInt(categoriaSeleccionada))
    const subcategoria = subcategorias.find((s) => s.id === Number.parseInt(subcategoriaSeleccionada))
    const producto = productos.find((p) => p.id === Number.parseInt(productoSeleccionado))

    let productosAfectados: any[] = []

    if (productoSeleccionado && producto) {
      // Producto específico
      productosAfectados = [producto]
    } else if (subcategoriaSeleccionada && subcategoria) {
      // Subcategoría
      productosAfectados = productos.filter((p) => p.subcategoriaId === Number.parseInt(subcategoriaSeleccionada))
    } else if (categoriaSeleccionada && categoria) {
      // Categoría
      productosAfectados = productos.filter((p) => p.categoriaId === Number.parseInt(categoriaSeleccionada))
    } else {
      // Solo marca
      productosAfectados = productos.filter((p) => p.marcaId === Number.parseInt(marcaSeleccionada))
    }

    // Crear una fila por cada producto afectado
    const nuevosItems: ProductoAumento[] = productosAfectados.map((prod) => ({
      id: `${Date.now()}-${prod.id}`,
      tipo: "producto",
      marcaId: prod.marcaId,
      categoriaId: prod.categoriaId,
      subcategoriaId: prod.subcategoriaId,
      productoId: prod.id,
      descripcion: `${prod.nombre} (${prod.sku}) - $${prod.precio}`,
      porcentaje: porcentajeTemp ? Number.parseFloat(porcentajeTemp) : 0,
      producto: prod,
    }))

    setProductosAumento((prev) => [...prev, ...nuevosItems])

    // Limpiar selección
    setMarcaSeleccionada("")
    setCategoriaSeleccionada("")
    setSubcategoriaSeleccionada("")
    setProductoSeleccionado("")
    setPorcentajeTemp("")

    calcularProyeccionTotal([...productosAumento, ...nuevosItems])
  }

  const eliminarCriterio = (id: string) => {
    const nuevaLista = productosAumento.filter((item) => item.id !== id)
    setProductosAumento(nuevaLista)
    calcularProyeccionTotal(nuevaLista)
  }

  const actualizarPorcentaje = (id: string, porcentaje: number) => {
    const nuevaLista = productosAumento.map((item) => (item.id === id ? { ...item, porcentaje } : item))
    setProductosAumento(nuevaLista)
    calcularProyeccionTotal(nuevaLista)
  }

  const calcularProyeccionTotal = (lista: ProductoAumento[]) => {
    const totalProductos = lista.length
    let impactoTotal = 0
    let precioTotalAnterior = 0
    let precioTotalNuevo = 0

    lista.forEach((item) => {
      const precioAnterior = item.producto.precio
      const precioNuevo = precioAnterior * (1 + item.porcentaje / 100)

      precioTotalAnterior += precioAnterior
      precioTotalNuevo += precioNuevo
      impactoTotal += precioNuevo - precioAnterior
    })

    setProyeccion({
      productosAfectados: totalProductos,
      impactoEstimado: Math.round(impactoTotal),
      precioPromedioAnterior: totalProductos > 0 ? Math.round(precioTotalAnterior / totalProductos) : 0,
      precioPromedioNuevo: totalProductos > 0 ? Math.round(precioTotalNuevo / totalProductos) : 0,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.fechaAplicacion || productosAumento.length === 0) {
      alert("Por favor completa todos los campos obligatorios y agrega al menos un producto")
      return
    }

    const aumentoActualizado = {
      id: aumentoId,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      fechaAplicacion: formData.fechaAplicacion,
      aplicarInmediatamente: formData.aplicarInmediatamente,
      productos: productosAumento,
      proyeccion: proyeccion,
    }

    // Simular actualización en localStorage para demo
    const aumentosExistentes = JSON.parse(localStorage.getItem("aumentos") || "[]")
    const index = aumentosExistentes.findIndex((a: any) => a.id === aumentoId)
    if (index !== -1) {
      aumentosExistentes[index] = aumentoActualizado
      localStorage.setItem("aumentos", JSON.stringify(aumentosExistentes))
    }

    alert("Aumento actualizado correctamente")
    router.push("/proveedor/control-precios")
  }

  const puedeAgregar = marcaSeleccionada

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Aumento de Precios</h1>
          <p className="text-gray-600">Modifica la configuración del aumento existente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre del Aumento *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Aumento Lácteos Q1 2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Descripción opcional del aumento..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fechaAplicacion">Fecha de Aplicación *</Label>
                    <Input
                      id="fechaAplicacion"
                      type="date"
                      value={formData.fechaAplicacion}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fechaAplicacion: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox
                      id="aplicarInmediatamente"
                      checked={formData.aplicarInmediatamente}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, aplicarInmediatamente: checked as boolean }))
                      }
                    />
                    <Label htmlFor="aplicarInmediatamente" className="text-sm">
                      Aplicar inmediatamente
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selección de Productos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Agregar Más Productos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label>Marca *</Label>
                    <Select
                      value={marcaSeleccionada}
                      onValueChange={(value) => {
                        setMarcaSeleccionada(value)
                        setCategoriaSeleccionada("")
                        setSubcategoriaSeleccionada("")
                        setProductoSeleccionado("")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {marcas.map((marca) => (
                          <SelectItem key={marca.id} value={marca.id.toString()}>
                            {marca.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Categoría</Label>
                    <Select
                      value={categoriaSeleccionada}
                      onValueChange={(value) => {
                        setCategoriaSeleccionada(value)
                        setSubcategoriaSeleccionada("")
                        setProductoSeleccionado("")
                      }}
                      disabled={!marcaSeleccionada}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasFiltradas.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id.toString()}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Subcategoría</Label>
                    <Select
                      value={subcategoriaSeleccionada}
                      onValueChange={(value) => {
                        setSubcategoriaSeleccionada(value)
                        setProductoSeleccionado("")
                      }}
                      disabled={!categoriaSeleccionada}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar subcategoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategoriasFiltradas.map((subcategoria) => (
                          <SelectItem key={subcategoria.id} value={subcategoria.id.toString()}>
                            {subcategoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Producto Específico</Label>
                    <Select
                      value={productoSeleccionado}
                      onValueChange={setProductoSeleccionado}
                      disabled={!marcaSeleccionada}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {productosFiltrados.map((producto) => (
                          <SelectItem key={producto.id} value={producto.id.toString()}>
                            {producto.nombre} - ${producto.precio}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="porcentajeTemp">Porcentaje de Aumento</Label>
                    <div className="relative">
                      <Input
                        id="porcentajeTemp"
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={porcentajeTemp}
                        onChange={(e) => setPorcentajeTemp(e.target.value)}
                        placeholder="15.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Dejar vacío para configurar individualmente</p>
                  </div>

                  <div className="md:col-span-2">
                    <Button type="button" onClick={agregarCriterio} disabled={!puedeAgregar} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Productos
                    </Button>
                  </div>
                </div>

                {marcaSeleccionada && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-xs text-blue-800">
                        <p className="font-medium">Vista Previa</p>
                        <p>
                          Se agregarán {productosFiltrados.length} productos como filas individuales
                          {porcentajeTemp ? ` con ${porcentajeTemp}% de aumento` : " para configurar individualmente"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lista de Productos a Aumentar */}
            {productosAumento.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Productos a Aumentar ({productosAumento.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {productosAumento.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <Package className="w-4 h-4 text-gray-600" />
                            <span className="font-medium text-sm">{item.descripcion}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.porcentaje === 0 ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  placeholder="0"
                                  className="w-20 h-8"
                                  onChange={(e) => {
                                    const valor = Number.parseFloat(e.target.value) || 0
                                    actualizarPorcentaje(item.id, valor)
                                  }}
                                />
                                <span className="text-gray-500 text-sm">%</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  {item.porcentaje}%
                                </Badge>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const nuevoPorcentaje = prompt("Nuevo porcentaje:", item.porcentaje.toString())
                                    if (nuevoPorcentaje) {
                                      actualizarPorcentaje(item.id, Number.parseFloat(nuevoPorcentaje))
                                    }
                                  }}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            )}

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => eliminarCriterio(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Panel de Proyección */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Proyección de Impacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proyeccion.productosAfectados > 0 ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Productos Afectados:</span>
                        <span className="font-semibold">{proyeccion.productosAfectados}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Precio Promedio Actual:</span>
                        <span className="font-semibold">${proyeccion.precioPromedioAnterior}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Precio Promedio Nuevo:</span>
                        <span className="font-semibold text-green-600">${proyeccion.precioPromedioNuevo}</span>
                      </div>

                      <hr />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Impacto Estimado:</span>
                        <span className="font-bold text-lg text-provender-primary">
                          ${proyeccion.impactoEstimado.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-800">
                          <p className="font-medium">Proyección Estimada</p>
                          <p>Los valores se actualizan automáticamente al modificar porcentajes.</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Agrega productos para ver la proyección de impacto</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {productosAumento.some((item) => item.porcentaje > 20) && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="text-sm text-orange-800">
                      <p className="font-medium">Aumento Alto Detectado</p>
                      <p>Algunos productos tienen aumentos superiores al 20%. Considera revisar la estrategia.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-provender-primary hover:bg-provender-primary/90"
            disabled={!formData.nombre || productosAumento.length === 0}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
