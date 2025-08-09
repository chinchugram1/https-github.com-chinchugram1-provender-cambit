"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Plus, Edit, Trash2, Package, Percent, Gift, Tag } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Promocion {
  id: string
  titulo: string
  descripcion: string
  tipo: "descuento" | "combo" | "combo_eleccion"
  descuento?: number
  tipo_descuento?: "porcentaje" | "monto_fijo"
  aplicar_a?: "categoria" | "marca" | "productos"
  categoria_id?: string
  marca_id?: string
  productos?: string[]
  productos_combo?: { producto_id: string; cantidad: number }[]
  cantidad_minima?: number
  fecha_inicio: string
  fecha_fin: string
  activa: boolean
  usos: number
}

interface Producto {
  id: string
  nombre: string
  precio: number
  categoria: string
  marca: string
}

interface Categoria {
  id: string
  nombre: string
}

interface Marca {
  id: string
  nombre: string
}

export default function PromocionesPage() {
  const [promociones, setPromociones] = useState<Promocion[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [promocionEditando, setPromocionEditando] = useState<Promocion | null>(null)
  const [error, setError] = useState("")

  // Estados del formulario
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState<"descuento" | "combo" | "combo_eleccion">("descuento")
  const [descuento, setDescuento] = useState("")
  const [tipoDescuento, setTipoDescuento] = useState<"porcentaje" | "monto_fijo">("porcentaje")
  const [aplicarA, setAplicarA] = useState<"categoria" | "marca" | "productos">("categoria")
  const [categoriaId, setCategoriaId] = useState("")
  const [marcaId, setMarcaId] = useState("")
  const [productosSeleccionados, setProductosSeleccionados] = useState<string[]>([])
  const [productosCombo, setProductosCombo] = useState<{ producto_id: string; cantidad: number }[]>([])
  const [cantidadMinima, setCantidadMinima] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = () => {
    // Datos mock
    setPromociones([
      {
        id: "1",
        titulo: "Descuento Bebidas 20%",
        descripcion: "20% de descuento en todas las bebidas",
        tipo: "descuento",
        descuento: 20,
        tipo_descuento: "porcentaje",
        aplicar_a: "categoria",
        categoria_id: "bebidas",
        fecha_inicio: "2024-01-01",
        fecha_fin: "2024-12-31",
        activa: true,
        usos: 45,
      },
      {
        id: "2",
        titulo: "Combo Desayuno",
        descripcion: "Café + Medialunas por $500",
        tipo: "combo",
        productos_combo: [
          { producto_id: "cafe", cantidad: 1 },
          { producto_id: "medialunas", cantidad: 2 },
        ],
        fecha_inicio: "2024-01-01",
        fecha_fin: "2024-12-31",
        activa: true,
        usos: 23,
      },
    ])

    setProductos([
      { id: "cafe", nombre: "Café", precio: 200, categoria: "Bebidas", marca: "La Virginia" },
      { id: "medialunas", nombre: "Medialunas", precio: 150, categoria: "Panadería", marca: "Bimbo" },
      { id: "coca-cola", nombre: "Coca Cola 500ml", precio: 300, categoria: "Bebidas", marca: "Coca Cola" },
    ])

    setCategorias([
      { id: "bebidas", nombre: "Bebidas" },
      { id: "panaderia", nombre: "Panadería" },
      { id: "lacteos", nombre: "Lácteos" },
    ])

    setMarcas([
      { id: "coca-cola", nombre: "Coca Cola" },
      { id: "la-virginia", nombre: "La Virginia" },
      { id: "bimbo", nombre: "Bimbo" },
    ])
  }

  const limpiarFormulario = () => {
    setTitulo("")
    setDescripcion("")
    setTipo("descuento")
    setDescuento("")
    setTipoDescuento("porcentaje")
    setAplicarA("categoria")
    setCategoriaId("")
    setMarcaId("")
    setProductosSeleccionados([])
    setProductosCombo([])
    setCantidadMinima("")
    setFechaInicio("")
    setFechaFin("")
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones
    if (!titulo.trim()) {
      setError("El título es obligatorio")
      return
    }

    if (!descripcion.trim()) {
      setError("La descripción es obligatoria")
      return
    }

    if (!fechaInicio || !fechaFin) {
      setError("Las fechas de inicio y fin son obligatorias")
      return
    }

    if (new Date(fechaFin) <= new Date(fechaInicio)) {
      setError("La fecha de fin debe ser posterior a la fecha de inicio")
      return
    }

    // Validaciones específicas por tipo
    if (tipo === "descuento") {
      if (!descuento || Number.parseFloat(descuento) <= 0) {
        setError("El descuento debe ser mayor a 0")
        return
      }

      if (aplicarA === "categoria" && !categoriaId) {
        setError("Debe seleccionar una categoría")
        return
      }

      if (aplicarA === "marca" && !marcaId) {
        setError("Debe seleccionar una marca")
        return
      }

      if (aplicarA === "productos" && productosSeleccionados.length === 0) {
        setError("Debe seleccionar al menos un producto")
        return
      }
    }

    if (tipo === "combo" && productosCombo.length === 0) {
      setError("Debe agregar al menos un producto al combo")
      return
    }

    if (tipo === "combo_eleccion") {
      if (!categoriaId) {
        setError("Debe seleccionar una categoría")
        return
      }
      if (!cantidadMinima || Number.parseInt(cantidadMinima) <= 0) {
        setError("La cantidad mínima debe ser mayor a 0")
        return
      }
    }

    // Crear o actualizar promoción
    const nuevaPromocion: Promocion = {
      id: promocionEditando?.id || Date.now().toString(),
      titulo,
      descripcion,
      tipo,
      descuento: tipo === "descuento" ? Number.parseFloat(descuento) : undefined,
      tipo_descuento: tipo === "descuento" ? tipoDescuento : undefined,
      aplicar_a: tipo === "descuento" ? aplicarA : undefined,
      categoria_id:
        (tipo === "descuento" && aplicarA === "categoria") || tipo === "combo_eleccion" ? categoriaId : undefined,
      marca_id: tipo === "descuento" && aplicarA === "marca" ? marcaId : undefined,
      productos: tipo === "descuento" && aplicarA === "productos" ? productosSeleccionados : undefined,
      productos_combo: tipo === "combo" ? productosCombo : undefined,
      cantidad_minima: tipo === "combo_eleccion" ? Number.parseInt(cantidadMinima) : undefined,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      activa: true,
      usos: promocionEditando?.usos || 0,
    }

    if (promocionEditando) {
      setPromociones(promociones.map((p) => (p.id === promocionEditando.id ? nuevaPromocion : p)))
    } else {
      setPromociones([...promociones, nuevaPromocion])
    }

    setMostrarFormulario(false)
    setPromocionEditando(null)
    limpiarFormulario()
  }

  const editarPromocion = (promocion: Promocion) => {
    setPromocionEditando(promocion)
    setTitulo(promocion.titulo)
    setDescripcion(promocion.descripcion)
    setTipo(promocion.tipo)
    setDescuento(promocion.descuento?.toString() || "")
    setTipoDescuento(promocion.tipo_descuento || "porcentaje")
    setAplicarA(promocion.aplicar_a || "categoria")
    setCategoriaId(promocion.categoria_id || "")
    setMarcaId(promocion.marca_id || "")
    setProductosSeleccionados(promocion.productos || [])
    setProductosCombo(promocion.productos_combo || [])
    setCantidadMinima(promocion.cantidad_minima?.toString() || "")
    setFechaInicio(promocion.fecha_inicio)
    setFechaFin(promocion.fecha_fin)
    setMostrarFormulario(true)
  }

  const eliminarPromocion = (id: string) => {
    setPromociones(promociones.filter((p) => p.id !== id))
  }

  const toggleActiva = (id: string) => {
    setPromociones(promociones.map((p) => (p.id === id ? { ...p, activa: !p.activa } : p)))
  }

  const agregarProductoCombo = () => {
    setProductosCombo([...productosCombo, { producto_id: "", cantidad: 1 }])
  }

  const actualizarProductoCombo = (index: number, campo: "producto_id" | "cantidad", valor: string | number) => {
    const nuevosProductos = [...productosCombo]
    nuevosProductos[index] = { ...nuevosProductos[index], [campo]: valor }
    setProductosCombo(nuevosProductos)
  }

  const eliminarProductoCombo = (index: number) => {
    setProductosCombo(productosCombo.filter((_, i) => i !== index))
  }

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "descuento":
        return <Percent className="h-4 w-4" />
      case "combo":
        return <Package className="h-4 w-4" />
      case "combo_eleccion":
        return <Gift className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "descuento":
        return "Descuento"
      case "combo":
        return "Combo"
      case "combo_eleccion":
        return "Combo a Elección"
      default:
        return tipo
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promociones</h1>
          <p className="text-gray-600">Gestiona las promociones y ofertas especiales</p>
        </div>
        <Button
          onClick={() => {
            setMostrarFormulario(true)
            setPromocionEditando(null)
            limpiarFormulario()
          }}
          className="bg-[#0492C2] hover:bg-[#0492C2]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Promoción
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-[#0492C2]" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Promociones</p>
                <p className="text-2xl font-bold">{promociones.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Activas</p>
                <p className="text-2xl font-bold">{promociones.filter((p) => p.activa).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Percent className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Descuentos</p>
                <p className="text-2xl font-bold">{promociones.filter((p) => p.tipo === "descuento").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Combos</p>
                <p className="text-2xl font-bold">
                  {promociones.filter((p) => p.tipo === "combo" || p.tipo === "combo_eleccion").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle>{promocionEditando ? "Editar Promoción" : "Nueva Promoción"}</CardTitle>
            <CardDescription>
              {promocionEditando
                ? "Modifica los datos de la promoción"
                : "Completa los datos para crear una nueva promoción"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Descuento 20% en bebidas"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Promoción *</Label>
                  <Select value={tipo} onValueChange={(value: any) => setTipo(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="descuento">Descuento</SelectItem>
                      <SelectItem value="combo">Combo</SelectItem>
                      <SelectItem value="combo_eleccion">Combo a Elección</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe los detalles de la promoción"
                  required
                />
              </div>

              {/* Configuración específica por tipo */}
              {tipo === "descuento" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold">Configuración de Descuento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="descuento">Descuento *</Label>
                      <Input
                        id="descuento"
                        type="number"
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                        placeholder="20"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo-descuento">Tipo de Descuento</Label>
                      <Select value={tipoDescuento} onValueChange={(value: any) => setTipoDescuento(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="porcentaje">Porcentaje (%)</SelectItem>
                          <SelectItem value="monto_fijo">Monto Fijo ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aplicar-a">Aplicar a</Label>
                    <Select value={aplicarA} onValueChange={(value: any) => setAplicarA(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="categoria">Categoría</SelectItem>
                        <SelectItem value="marca">Marca</SelectItem>
                        <SelectItem value="productos">Productos Específicos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {aplicarA === "categoria" && (
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoría *</Label>
                      <Select value={categoriaId} onValueChange={setCategoriaId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {aplicarA === "marca" && (
                    <div className="space-y-2">
                      <Label htmlFor="marca">Marca *</Label>
                      <Select value={marcaId} onValueChange={setMarcaId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una marca" />
                        </SelectTrigger>
                        <SelectContent>
                          {marcas.map((marca) => (
                            <SelectItem key={marca.id} value={marca.id}>
                              {marca.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {aplicarA === "productos" && (
                    <div className="space-y-2">
                      <Label>Productos *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                        {productos.map((producto) => (
                          <div key={producto.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={producto.id}
                              checked={productosSeleccionados.includes(producto.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProductosSeleccionados([...productosSeleccionados, producto.id])
                                } else {
                                  setProductosSeleccionados(productosSeleccionados.filter((id) => id !== producto.id))
                                }
                              }}
                            />
                            <Label htmlFor={producto.id} className="text-sm">
                              {producto.nombre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tipo === "combo" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Productos del Combo</h3>
                    <Button type="button" onClick={agregarProductoCombo} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar Producto
                    </Button>
                  </div>
                  {productosCombo.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Select
                        value={item.producto_id}
                        onValueChange={(value) => actualizarProductoCombo(index, "producto_id", value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Selecciona un producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {productos.map((producto) => (
                            <SelectItem key={producto.id} value={producto.id}>
                              {producto.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarProductoCombo(index, "cantidad", Number.parseInt(e.target.value) || 1)
                        }
                        className="w-20"
                        min="1"
                      />
                      <Button type="button" onClick={() => eliminarProductoCombo(index)} size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {tipo === "combo_eleccion" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold">Configuración de Combo a Elección</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoria-combo">Categoría *</Label>
                      <Select value={categoriaId} onValueChange={setCategoriaId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cantidad-minima">Cantidad Mínima *</Label>
                      <Input
                        id="cantidad-minima"
                        type="number"
                        value={cantidadMinima}
                        onChange={(e) => setCantidadMinima(e.target.value)}
                        placeholder="3"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha-inicio">Fecha de Inicio *</Label>
                  <Input
                    id="fecha-inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-fin">Fecha de Fin *</Label>
                  <Input
                    id="fecha-fin"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setPromocionEditando(null)
                    limpiarFormulario()
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#0492C2] hover:bg-[#0492C2]/90">
                  {promocionEditando ? "Actualizar" : "Crear"} Promoción
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de promociones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promociones.map((promocion) => (
          <Card key={promocion.id} className={`${promocion.activa ? "border-green-200" : "border-gray-200"}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  {getIconoTipo(promocion.tipo)}
                  <CardTitle className="text-lg">{promocion.titulo}</CardTitle>
                </div>
                <Badge variant={promocion.activa ? "default" : "secondary"}>
                  {promocion.activa ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <CardDescription>{promocion.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tipo:</span>
                <Badge variant="outline">{getTipoLabel(promocion.tipo)}</Badge>
              </div>

              {promocion.tipo === "descuento" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Descuento:</span>
                  <span className="font-semibold">
                    {promocion.descuento}
                    {promocion.tipo_descuento === "porcentaje" ? "%" : "$"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Período:</span>
                <span className="text-xs">
                  {new Date(promocion.fecha_inicio).toLocaleDateString()} -{" "}
                  {new Date(promocion.fecha_fin).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Usos:</span>
                <span className="font-semibold">{promocion.usos}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  onClick={() => toggleActiva(promocion.id)}
                  size="sm"
                  variant={promocion.activa ? "outline" : "default"}
                >
                  {promocion.activa ? "Desactivar" : "Activar"}
                </Button>
                <div className="flex space-x-1">
                  <Button onClick={() => editarPromocion(promocion)} size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => eliminarPromocion(promocion.id)} size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {promociones.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay promociones</h3>
            <p className="text-gray-600 mb-4">Comienza creando tu primera promoción</p>
            <Button
              onClick={() => {
                setMostrarFormulario(true)
                setPromocionEditando(null)
                limpiarFormulario()
              }}
              className="bg-[#0492C2] hover:bg-[#0492C2]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Promoción
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
