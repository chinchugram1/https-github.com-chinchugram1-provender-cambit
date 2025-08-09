"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Package, Search, Filter } from "lucide-react"
import Link from "next/link"

interface Subcategory {
  id: string
  name: string
  category: string
  brand: string
  productCount: number
  isActive: boolean
  createdAt: string
}

const mockSubcategories: Subcategory[] = [
  {
    id: "1",
    name: "500ml",
    category: "Bebidas",
    brand: "Coca-Cola",
    productCount: 4,
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "1.5L",
    category: "Bebidas",
    brand: "Coca-Cola",
    productCount: 3,
    isActive: true,
    createdAt: "2023-01-16",
  },
  {
    id: "3",
    name: "2L Retornable",
    category: "Bebidas",
    brand: "Coca-Cola",
    productCount: 2,
    isActive: true,
    createdAt: "2023-01-17",
  },
  {
    id: "4",
    name: "350ml Lata",
    category: "Bebidas",
    brand: "Coca-Cola",
    productCount: 1,
    isActive: true,
    createdAt: "2023-01-18",
  },
  {
    id: "5",
    name: "500ml",
    category: "Bebidas",
    brand: "PepsiCo",
    productCount: 3,
    isActive: true,
    createdAt: "2023-01-20",
  },
  {
    id: "6",
    name: "1.5L",
    category: "Bebidas",
    brand: "PepsiCo",
    productCount: 2,
    isActive: true,
    createdAt: "2023-01-21",
  },
  {
    id: "7",
    name: "Chocolate",
    category: "Golosinas",
    brand: "Havanna",
    productCount: 2,
    isActive: true,
    createdAt: "2023-02-01",
  },
  {
    id: "8",
    name: "Dulce de Leche",
    category: "Golosinas",
    brand: "Havanna",
    productCount: 3,
    isActive: true,
    createdAt: "2023-02-02",
  },
  {
    id: "9",
    name: "Clásicas",
    category: "Snacks",
    brand: "Lays",
    productCount: 4,
    isActive: true,
    createdAt: "2023-02-05",
  },
  {
    id: "10",
    name: "Barbacoa",
    category: "Snacks",
    brand: "Lays",
    productCount: 2,
    isActive: true,
    createdAt: "2023-02-06",
  },
]

const categories = ["Todas", "Bebidas", "Golosinas", "Snacks", "Lácteos"]
const brands = ["Todas", "Coca-Cola", "PepsiCo", "Havanna", "Lays", "La Serenísima"]

export default function SubcategoriasPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>(mockSubcategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null)

  const filteredSubcategories = subcategories.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || sub.category === selectedCategory
    const matchesBrand = selectedBrand === "Todas" || sub.brand === selectedBrand
    return matchesSearch && matchesCategory && matchesBrand
  })

  const totalProducts = subcategories.reduce((sum, sub) => sum + sub.productCount, 0)

  const deleteSubcategory = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar esta subcategoría?")) {
      setSubcategories(subcategories.filter((s) => s.id !== id))
    }
  }

  const openModal = (subcategory?: Subcategory) => {
    if (subcategory) {
      setEditingSubcategory(subcategory)
    } else {
      setEditingSubcategory(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingSubcategory(null)
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
          <h1 className="text-2xl font-bold text-gray-900">Subcategorías</h1>
          <p className="text-gray-600">Define subcategorías específicas por marca y categoría</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nueva Subcategoría</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Subcategorías</p>
              <p className="text-2xl font-bold text-gray-900">{subcategories.length}</p>
            </div>
            <Package className="w-8 h-8 text-provender-accent" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Productos Asociados</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Promedio por Sub.</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalProducts / subcategories.length)}</p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar subcategorías..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
            <select className="input-field" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subcategories List */}
      <div className="space-y-4">
        {filteredSubcategories.map((subcategory) => (
          <div key={subcategory.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{subcategory.name}</h3>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{subcategory.category}</span>
                  <span className="bg-provender-light/20 text-provender-primary text-xs px-2 py-1 rounded">
                    {subcategory.brand}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{subcategory.productCount} productos</span>
                  <span>Creada el {new Date(subcategory.createdAt).toLocaleDateString("es-AR")}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Activa</span>
                <button
                  onClick={() => openModal(subcategory)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteSubcategory(subcategory.id)}
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

      {filteredSubcategories.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron subcategorías</h3>
          <p className="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button onClick={() => openModal()} className="btn-primary">
            Crear Primera Subcategoría
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingSubcategory ? "Editar Subcategoría" : "Nueva Subcategoría"}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej: 500ml"
                    defaultValue={editingSubcategory?.name || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select className="input-field" defaultValue={editingSubcategory?.category || ""}>
                    <option value="">Seleccionar categoría</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                  <select className="input-field" defaultValue={editingSubcategory?.brand || ""}>
                    <option value="">Seleccionar marca</option>
                    {brands.slice(1).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
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
                    {editingSubcategory ? "Actualizar" : "Crear"}
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
