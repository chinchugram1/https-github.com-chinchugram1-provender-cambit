"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Tag, Package, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

interface Brand {
  id: string
  name: string
  description: string
  categories: string[]
  productCount: number
  totalSales: number
  averagePrice: number
  topCategory: string
  isActive: boolean
  createdAt: string
}

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Coca-Cola",
    description: "Marca líder en bebidas gaseosas y refrescos",
    categories: ["Bebidas"],
    productCount: 18,
    totalSales: 85000,
    averagePrice: 450,
    topCategory: "Bebidas",
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "PepsiCo",
    description: "Bebidas y snacks de calidad internacional",
    categories: ["Bebidas", "Snacks"],
    productCount: 15,
    totalSales: 67000,
    averagePrice: 420,
    topCategory: "Bebidas",
    isActive: true,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    name: "Havanna",
    description: "Alfajores y dulces premium argentinos",
    categories: ["Golosinas"],
    productCount: 8,
    totalSales: 45000,
    averagePrice: 320,
    topCategory: "Golosinas",
    isActive: true,
    createdAt: "2023-02-01",
  },
  {
    id: "4",
    name: "Lays",
    description: "Papas fritas y snacks crujientes",
    categories: ["Snacks"],
    productCount: 12,
    totalSales: 38000,
    averagePrice: 380,
    topCategory: "Snacks",
    isActive: true,
    createdAt: "2023-02-05",
  },
  {
    id: "5",
    name: "La Serenísima",
    description: "Productos lácteos de calidad argentina",
    categories: ["Lácteos"],
    productCount: 10,
    totalSales: 32000,
    averagePrice: 350,
    topCategory: "Lácteos",
    isActive: true,
    createdAt: "2023-02-10",
  },
]

const availableCategories = ["Bebidas", "Golosinas", "Snacks", "Lácteos"]

export default function MarcasPage() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)

  const totalProducts = brands.reduce((sum, brand) => sum + brand.productCount, 0)
  const totalSales = brands.reduce((sum, brand) => sum + brand.totalSales, 0)
  const averageProductsPerBrand = Math.round(totalProducts / brands.length)
  const topBrand = brands.reduce((max, brand) => (brand.totalSales > max.totalSales ? brand : max), brands[0])

  const deleteBrand = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar esta marca?")) {
      setBrands(brands.filter((b) => b.id !== id))
    }
  }

  const openModal = (brand?: Brand) => {
    if (brand) {
      setEditingBrand(brand)
    } else {
      setEditingBrand(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingBrand(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = formData.get("nombre") as string
    const descripcion = formData.get("descripcion") as string
    const categorias = Array.from(formData.getAll("categorias")) as string[]

    if (!nombre.trim()) {
      alert("El nombre es obligatorio")
      return
    }

    if (editingBrand) {
      // Actualizar marca existente
      setBrands(
        brands.map((brand) =>
          brand.id === editingBrand.id
            ? { ...brand, name: nombre, description: descripcion, categories: categorias }
            : brand,
        ),
      )
      alert("Marca actualizada correctamente")
    } else {
      // Crear nueva marca
      const newBrand: Brand = {
        id: `BRAND-${Date.now()}`,
        name: nombre,
        description: descripcion,
        categories: categorias,
        productCount: 0,
        totalSales: 0,
        averagePrice: 0,
        topCategory: categorias[0] || "Sin categoría",
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setBrands([...brands, newBrand])
      alert("Marca creada correctamente")
    }

    closeModal()
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/parametrias/productos"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
          <p className="text-gray-600">Administra las marcas disponibles en tu catálogo</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nueva Marca</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Marcas</p>
              <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
            </div>
            <Tag className="w-8 h-8 text-provender-warm" />
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
              <p className="text-sm text-gray-600">Marca Top</p>
              <p className="text-lg font-bold text-gray-900">{topBrand?.name}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
      </div>

      {/* Top Performing Brands */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Marcas con Mejor Performance</h2>
        <div className="space-y-3">
          {brands
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 3)
            .map((brand, index) => (
              <div key={brand.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-provender-warm/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-provender-warm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-600">{brand.productCount} productos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${brand.totalSales.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">en ventas</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Brands List */}
      <div className="space-y-4">
        {brands.map((brand) => (
          <div key={brand.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{brand.name}</h3>
                <p className="text-gray-600 text-sm">{brand.description}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Activa</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {brand.categories.map((category) => (
                <span
                  key={category}
                  className="bg-provender-light/20 text-provender-primary text-xs px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Productos</span>
                <p className="font-semibold text-gray-900">{brand.productCount}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Ventas</span>
                <p className="font-semibold text-gray-900">${brand.totalSales.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Precio Promedio</span>
                <p className="font-semibold text-gray-900">${brand.averagePrice}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Categoría Principal</span>
                <p className="font-semibold text-gray-900">{brand.topCategory}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Creada el {new Date(brand.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(brand)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteBrand(brand.id)}
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editingBrand ? "Editar Marca" : "Nueva Marca"}</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="input-field"
                    placeholder="Ej: Coca-Cola"
                    defaultValue={editingBrand?.name || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Describe la marca y sus productos..."
                    defaultValue={editingBrand?.description || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categorías</label>
                  <div className="space-y-2">
                    {availableCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="categorias"
                          value={category}
                          id={category}
                          className="rounded border-gray-300"
                          defaultChecked={editingBrand?.categories.includes(category)}
                        />
                        <label htmlFor={category} className="text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
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
                    {editingBrand ? "Actualizar" : "Crear"}
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
