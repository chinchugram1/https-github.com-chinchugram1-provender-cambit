"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Plus, Minus, AlertTriangle, Save, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface ProductoPedido {
  id: string
  nombre: string
  cantidad: number
  precio: number
  stock: number
  categoria: string
}

interface Pedido {
  id: string
  cliente: string
  fecha: string
  estado: string
  productos: ProductoPedido[]
}

interface ProductoDisponible {
  id: string
  nombre: string
  precio: number
  stock: number
  categoria: string
}

const mockPedido: Pedido = {
  id: "PED-001",
  cliente: "Kiosco El Rápido",
  fecha: "2024-01-16",
  estado: "enviado",
  productos: [
    { id: "P001", nombre: "Coca Cola 500ml", cantidad: 24, precio: 1200, stock: 50, categoria: "Bebidas" },
    { id: "P002", nombre: "Papas Fritas", cantidad: 12, precio: 800, stock: 30, categoria: "Snacks" },
    { id: "P003", nombre: "Galletas Dulces", cantidad: 6, precio: 1500, stock: 15, categoria: "Dulces" },
  ],
}

const mockProductosDisponibles: ProductoDisponible[] = [
  { id: "P004", nombre: "Pepsi 500ml", precio: 1150, stock: 40, categoria: "Bebidas" },
  { id: "P005", nombre: "Doritos", precio: 900, stock: 25, categoria: "Snacks" },
  { id: "P006", nombre: "Oreo", precio: 1300, stock: 20, categoria: "Dulces" },
  { id: "P007", nombre: "Agua Mineral", precio: 600, stock: 100, categoria: "Bebidas" },
  { id: "P008", nombre: "Chicles", precio: 400, stock: 0, categoria: "Dulces" },
]

export default function EditarPedidoPage({ params }: { params: { pedidoId: string } }) {
  const router = useRouter()
  const [pedido, setPedido] = useState<Pedido>(mockPedido)
  const [productosDisponibles] = useState<ProductoDisponible[]>(mockProductosDisponibles)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddProducts, setShowAddProducts] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStockStatus = (stock: number, cantidad = 0) => {
    if (stock === 0) return { status: "sin_stock", color: "bg-red-100 text-red-800", text: "Sin Stock" }
    if (stock < cantidad)
      return { status: "insuficiente", color: "bg-red-100 text-red-800", text: "Stock Insuficiente" }
    if (stock <= 10) return { status: "limitado", color: "bg-yellow-100 text-yellow-800", text: "Stock Limitado" }
    return { status: "ok", color: "bg-green-100 text-green-800", text: "Stock OK" }
  }

  const updateCantidad = (productId: string, newCantidad: number) => {
    if (newCantidad < 0) return

    setPedido((prev) => ({
      ...prev,
      productos: prev.productos.map((p) => (p.id === productId ? { ...p, cantidad: newCantidad } : p)),
    }))
  }

  const removeProducto = (productId: string) => {
    setPedido((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.id !== productId),
    }))
  }

  const addProducto = (producto: ProductoDisponible) => {
    const existingProduct = pedido.productos.find((p) => p.id === producto.id)

    if (existingProduct) {
      updateCantidad(producto.id, existingProduct.cantidad + 1)
    } else {
      setPedido((prev) => ({
        ...prev,
        productos: [
          ...prev.productos,
          {
            id: producto.id,
            nombre: producto.nombre,
            cantidad: 1,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.categoria,
          },
        ],
      }))
    }
    setShowAddProducts(false)
  }

  const calculateTotal = () => {
    return pedido.productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0)
  }

  const hasStockIssues = () => {
    return pedido.productos.some((p) => p.stock < p.cantidad || p.stock === 0)
  }

  const handleSubmit = async () => {
    if (hasStockIssues()) {
      alert("No se puede guardar el pedido. Hay productos con problemas de stock.")
      return
    }

    if (pedido.productos.length === 0) {
      alert("El pedido debe tener al menos un producto.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Guardando pedido editado:", pedido)
      alert("Pedido actualizado correctamente.")
      router.push("/proveedor/pedidos")
    } catch (error) {
      alert("Error al actualizar el pedido. Intente nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProducts = productosDisponibles.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pedido.productos.some((p) => p.id === producto.id),
  )

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Pedido</h1>
          <p className="text-gray-600">Modifica los productos y cantidades del pedido</p>
        </div>
      </div>

      {/* Información del Pedido */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-provender-primary" />
              Pedido {pedido.id}
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">{pedido.estado}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold">{pedido.cliente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="font-semibold">{new Date(pedido.fecha).toLocaleDateString("es-AR")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-provender-primary">{formatCurrency(calculateTotal())}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos del Pedido */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Productos del Pedido</CardTitle>
            <Button
              onClick={() => setShowAddProducts(!showAddProducts)}
              className="bg-provender-primary hover:bg-provender-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pedido.productos.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay productos en el pedido</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pedido.productos.map((producto) => {
                const stockStatus = getStockStatus(producto.stock, producto.cantidad)
                return (
                  <div key={producto.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{producto.nombre}</h4>
                        <p className="text-sm text-gray-600">{producto.categoria}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={stockStatus.color}>{stockStatus.text}</Badge>
                        <p className="font-semibold">{formatCurrency(producto.precio)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCantidad(producto.id, producto.cantidad - 1)}
                            disabled={producto.cantidad <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={producto.cantidad}
                            onChange={(e) => updateCantidad(producto.id, Number.parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                            max={producto.stock}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCantidad(producto.id, producto.cantidad + 1)}
                            disabled={producto.cantidad >= producto.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Stock: {producto.stock}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-provender-primary">
                          {formatCurrency(producto.cantidad * producto.precio)}
                        </p>
                        <Button size="sm" variant="destructive" onClick={() => removeProducto(producto.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </div>

                    {stockStatus.status === "insuficiente" && (
                      <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>
                          Cantidad solicitada ({producto.cantidad}) supera el stock disponible ({producto.stock})
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Agregar Productos */}
          {showAddProducts && (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Agregar Productos</h4>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredProducts.map((producto) => {
                  const stockStatus = getStockStatus(producto.stock)
                  return (
                    <div key={producto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{producto.nombre}</h5>
                        <p className="text-sm text-gray-600">{producto.categoria}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={stockStatus.color}>{stockStatus.text}</Badge>
                        <p className="font-semibold">{formatCurrency(producto.precio)}</p>
                        <Button
                          size="sm"
                          onClick={() => addProducto(producto)}
                          disabled={producto.stock === 0}
                          className="bg-provender-primary hover:bg-provender-primary/90"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {filteredProducts.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    {searchTerm ? "No se encontraron productos" : "Todos los productos ya están en el pedido"}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Productos:</span>
              <span>{pedido.productos.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Cantidad total:</span>
              <span>{pedido.productos.reduce((sum, p) => sum + p.cantidad, 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span className="text-provender-primary">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      {hasStockIssues() && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Problemas de Stock</h4>
                <p className="text-sm text-red-700">
                  Algunos productos tienen problemas de stock. Revisa las cantidades antes de guardar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={() => router.back()} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={hasStockIssues() || pedido.productos.length === 0 || isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
