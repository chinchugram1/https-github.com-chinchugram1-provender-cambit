"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Grid3X3, Package, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  description: string
  productCount: number
  totalSales: number
  averagePrice: number
  topBrand: string
  isActive: boolean
  createdAt: string
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Bebidas",
    description: "Gaseosas, aguas, jugos y bebidas en general",
    productCount: 45,
    totalSales: 125000,
    averagePrice: 420,
    topBrand: "Coca-Cola",
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Golosinas",
    description: "Alfajores, chocolates, caramelos y dulces",
    productCount: 32,
    totalSales: 89000,
    averagePrice: 280,
    topBrand: "Havanna",
    isActive: true,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    name: "Snacks",
    description: "Papas fritas, palitos, nachos y aperitivos",
    productCount: 28,
    totalSales: 67000,
    averagePrice: 350,
    topBrand: "Lays",
    isActive: true,
    createdAt: "2023-02-01",
  },
  {
    id: "4",
    name: "Lácteos",
    description: "Leche, yogurt, quesos y productos lácteos",
    productCount: 18,
    totalSales: 45000,
    averagePrice: 380,
    topBrand: "La Serenísima",
    isActive: true,
    createdAt: "2023-02-10",
  },
]

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0)
  const totalSales = categories.reduce((sum, cat) => sum + cat.totalSales, 0)
  const averageProductsPerCategory = Math.round(totalProducts / categories.length)

  const deleteCategory = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar esta categoría?")) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
    } else {
      setEditingCategory(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingCategory(null)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/parametrias"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-600">Gestiona las categorías de productos de tu catálogo</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categorías</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <Grid3X3 className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Totales</p>
              <p className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Promedio por Categoría</p>
              <p className="text-2xl font-bold text-gray-900">{averageProductsPerCategory}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-provender-warm" />
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Activa</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Productos</span>
                <p className="font-semibold text-gray-900">{category.productCount}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Ventas</span>
                <p className="font-semibold text-gray-900">${category.totalSales.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Precio Promedio</span>
                <p className="font-semibold text-gray-900">${category.averagePrice}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Marca Principal</span>
                <p className="font-semibold text-gray-900">{category.topBrand}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Creada el {new Date(category.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(category)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej: Bebidas"
                    defaultValue={editingCategory?.name || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Describe el tipo de productos de esta categoría..."
                    defaultValue={editingCategory?.description || ""}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingCategory ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
