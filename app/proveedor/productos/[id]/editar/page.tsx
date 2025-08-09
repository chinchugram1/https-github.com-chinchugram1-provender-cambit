"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

interface ProductForm {
  nombre: string
  descripcion: string
  categoria: string
  subcategoria: string
  marca: string
  sku: string
  ean: string
  unidadMedida: string
  precio: string
  stock: string
  stockMinimo: string
  activo: boolean
}

const mockProduct: ProductForm = {
  nombre: "Coca Cola 500ml",
  descripcion: "Bebida gaseosa sabor cola en botella de 500ml",
  categoria: "1",
  subcategoria: "",
  marca: "1",
  sku: "CC-500-001",
  ean: "1234567890123",
  unidadMedida: "1",
  precio: "450",
  stock: "24",
  stockMinimo: "5",
  activo: true,
}

const mockCategorias = [
  { id: "1", nombre: "Bebidas" },
  { id: "2", nombre: "Golosinas" },
  { id: "3", nombre: "Snacks" },
  { id: "4", nombre: "Lácteos" },
]

const mockMarcas = [
  { id: "1", nombre: "Coca Cola" },
  { id: "2", nombre: "Sprite" },
  { id: "3", nombre: "Havanna" },
  { id: "4", nombre: "Milka" },
]

const mockUnidadesMedida = [
  { id: "1", nombre: "Unidades", abreviacion: "un" },
  { id: "2", nombre: "Pack", abreviacion: "pk" },
  { id: "3", nombre: "Cajón", abreviacion: "cj" },
  { id: "4", nombre: "Litros", abreviacion: "lt" },
  { id: "5", nombre: "Kilogramos", abreviacion: "kg" },
]

export default function EditarProductoPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const [formData, setFormData] = useState<ProductForm>(mockProduct)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Aquí cargarías los datos del producto específico
    // Por ahora usamos datos mock
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      alert("Producto actualizado correctamente")
      router.push("/proveedor/productos")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convertir a mayúsculas y permitir solo letras, números y guiones
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
    setFormData((prev) => ({
      ...prev,
      sku: value,
    }))
  }

  const handleEanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir solo números y limitar a 13 dígitos
    const value = e.target.value.replace(/\D/g, "").slice(0, 13)
    setFormData((prev) => ({
      ...prev,
      ean: value,
    }))
  }

  const selectedUnidad = mockUnidadesMedida.find((u) => u.id === formData.unidadMedida)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/productos"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
          <p className="text-gray-600">Modifica los datos del producto</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Información Básica */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              >
                <option value="">Seleccionar categoría</option>
                {mockCategorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <select
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              >
                <option value="">Seleccionar marca</option>
                {mockMarcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Códigos y Unidades */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Códigos y Unidades</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                Código SKU *
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleSkuChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent font-mono"
                placeholder="Ej: CC-500-001"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Código interno para gestión de inventario</p>
            </div>

            <div>
              <label htmlFor="ean" className="block text-sm font-medium text-gray-700 mb-2">
                Código EAN
              </label>
              <input
                type="text"
                id="ean"
                name="ean"
                value={formData.ean}
                onChange={handleEanChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent font-mono"
                placeholder="1234567890123"
                maxLength={13}
              />
              <p className="text-sm text-gray-500 mt-1">Código de barras internacional (13 dígitos)</p>
            </div>

            <div>
              <label htmlFor="unidadMedida" className="block text-sm font-medium text-gray-700 mb-2">
                Unidad de Medida *
              </label>
              <select
                id="unidadMedida"
                name="unidadMedida"
                value={formData.unidadMedida}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              >
                <option value="">Seleccionar unidad</option>
                {mockUnidadesMedida.map((unidad) => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.nombre} ({unidad.abreviacion})
                  </option>
                ))}
              </select>
              {selectedUnidad && (
                <p className="text-sm text-gray-500 mt-1">Se mostrará como: "por {selectedUnidad.abreviacion}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Precios y Stock */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Precios y Stock</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                Precio de Venta *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Actual *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Mínimo
              </label>
              <input
                type="number"
                id="stockMinimo"
                name="stockMinimo"
                value={formData.stockMinimo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Imagen del Producto</h3>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className="text-sm text-gray-500">PNG, JPG hasta 5MB</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>

        {/* Estado */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Producto</h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
            />
            <label htmlFor="activo" className="ml-2 text-sm font-medium text-gray-700">
              Producto activo
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">Los productos inactivos no aparecerán en el catálogo</p>
        </div>

        {/* Vista Previa */}
        {formData.nombre && formData.precio && selectedUnidad && (
          <div className="card bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-sm">
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{formData.nombre}</h4>
              <p className="text-xs text-gray-600 mb-2">
                {mockMarcas.find((m) => m.id === formData.marca)?.nombre || "Marca"}
              </p>
              <div className="mb-3">
                <span className="text-lg font-bold text-provender-primary">${formData.precio}</span>
                <p className="text-xs text-gray-500">por {selectedUnidad.abreviacion}</p>
              </div>
              {formData.sku && <p className="text-xs text-gray-500">SKU: {formData.sku}</p>}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex space-x-4">
          <Link
            href="/proveedor/productos"
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
          >
            Cancelar
          </Link>
          <button type="submit" disabled={loading} className="flex-1 btn-primary flex items-center justify-center">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
