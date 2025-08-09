"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  code: string
  name: string
  category: string
  brand: string
  subcategory: string
  price: number
  stock: number
  sales: number
  status: "activo" | "agotado" | "bajo_stock"
}

const mockProducts: Product[] = [
  {
    id: "1",
    code: "116",
    name: "Coca Cola",
    category: "Bebidas",
    brand: "Coca-Cola",
    subcategory: "500ml",
    price: 450,
    stock: 24,
    sales: 45,
    status: "activo",
  },
  {
    id: "2",
    code: "117",
    name: "Coca Cola",
    category: "Bebidas",
    brand: "Coca-Cola",
    subcategory: "1.5L",
    price: 680,
    stock: 18,
    sales: 32,
    status: "activo",
  },
  {
    id: "3",
    code: "118",
    name: "Fanta",
    category: "Bebidas",
    brand: "Coca-Cola",
    subcategory: "500ml",
    price: 420,
    stock: 3,
    sales: 28,
    status: "bajo_stock",
  },
  {
    id: "4",
    code: "119",
    name: "Sprite",
    category: "Bebidas",
    brand: "Coca-Cola",
    subcategory: "500ml",
    price: 420,
    stock: 0,
    sales: 24,
    status: "agotado",
  },
  {
    id: "5",
    code: "120",
    name: "Pepsi",
    category: "Bebidas",
    brand: "PepsiCo",
    subcategory: "500ml",
    price: 440,
    stock: 15,
    sales: 20,
    status: "activo",
  },
  {
    id: "6",
    code: "201",
    name: "Alfajor Havanna",
    category: "Golosinas",
    brand: "Havanna",
    subcategory: "Chocolate",
    price: 320,
    stock: 12,
    sales: 18,
    status: "activo",
  },
  {
    id: "7",
    code: "202",
    name: "Alfajor Jorgito",
    category: "Golosinas",
    brand: "Jorgito",
    subcategory: "Dulce de Leche",
    price: 280,
    stock: 25,
    sales: 15,
    status: "activo",
  },
  {
    id: "8",
    code: "301",
    name: "Papas Fritas Lays",
    category: "Snacks",
    brand: "Lays",
    subcategory: "Clásicas",
    price: 380,
    stock: 18,
    sales: 22,
    status: "activo",
  },
]

const categories = ["Todos", "Bebidas", "Golosinas", "Snacks", "Lácteos"]

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "bajo_stock":
        return "bg-yellow-100 text-yellow-800"
      case "agotado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "activo":
        return "Activo"
      case "bajo_stock":
        return "Stock Bajo"
      case "agotado":
        return "Agotado"
      default:
        return status
    }
  }

  const deleteProduct = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Productos</h1>
          <p className="text-gray-600">Gestiona tu catálogo de productos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/proveedor/parametrias"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Parametrías</span>
          </Link>

          <Link href="/proveedor/productos/nuevo" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nuevo Producto</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter((p) => p.status === "bajo_stock").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Agotados</p>
              <p className="text-2xl font-bold text-red-600">{products.filter((p) => p.status === "agotado").length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Más Vendido</p>
              <p className="text-lg font-bold text-gray-900">
                {products.reduce((max, p) => (p.sales > max.sales ? p : max), products[0])?.name.split(" ")[0] || "N/A"}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o marca..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-provender-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-provender-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <div className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-gray-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="bg-provender-primary text-white text-xs px-2 py-1 rounded font-mono">
                        {product.code}
                      </span>
                      <h3 className="font-semibold text-gray-900">
                        {product.name} {product.subcategory}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{product.category}</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{product.brand}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Precio</span>
                    <p className="font-semibold text-gray-900">${product.price}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Stock</span>
                    <p className="font-semibold text-gray-900">{product.stock}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Vendidos</span>
                    <p className="font-semibold text-gray-900">{product.sales}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/proveedor/productos/${product.id}/editar`}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <Link href="/proveedor/productos/nuevo" className="btn-primary">
            Agregar Primer Producto
          </Link>
        </div>
      )}
    </div>
  )
}
