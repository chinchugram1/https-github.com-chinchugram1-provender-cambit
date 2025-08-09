"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UnidadMedidaForm {
  nombre: string
  abreviacion: string
  descripcion: string
  activa: boolean
}

const initialForm: UnidadMedidaForm = {
  nombre: "",
  abreviacion: "",
  descripcion: "",
  activa: true,
}

export default function NuevaUnidadMedidaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<UnidadMedidaForm>(initialForm)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      alert("Unidad de medida creada correctamente")
      router.push("/proveedor/parametrias/unidades-medida")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAbreviacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convertir a minúsculas y limitar a 5 caracteres
    const value = e.target.value.toLowerCase().slice(0, 5)
    setFormData((prev) => ({
      ...prev,
      abreviacion: value,
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/parametrias/unidades-medida"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Unidad de Medida</h1>
          <p className="text-gray-600">Crea una nueva unidad de medida para tus productos</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Unidad *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                placeholder="Ej: Unidades, Pack, Cajón"
                required
              />
            </div>

            <div>
              <label htmlFor="abreviacion" className="block text-sm font-medium text-gray-700 mb-2">
                Abreviación *
              </label>
              <input
                type="text"
                id="abreviacion"
                name="abreviacion"
                value={formData.abreviacion}
                onChange={handleAbreviacionChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent font-mono"
                placeholder="Ej: un, pk, cj"
                maxLength={5}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Máximo 5 caracteres en minúsculas. Se mostrará como "por {formData.abreviacion || "xx"}"
              </p>
            </div>

            <div>
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
                placeholder="Describe cuándo usar esta unidad de medida..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="activa"
                name="activa"
                checked={formData.activa}
                onChange={handleChange}
                className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
              />
              <label htmlFor="activa" className="ml-2 text-sm font-medium text-gray-700">
                Unidad activa
              </label>
            </div>
          </div>
        </div>

        {/* Vista Previa */}
        {formData.nombre && formData.abreviacion && (
          <div className="card bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Nombre:</strong> {formData.nombre}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Se mostrará como:</strong> "por {formData.abreviacion}"
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ejemplo en producto:</strong> "$450 por {formData.abreviacion}"
              </p>
              {formData.descripcion && (
                <p className="text-sm text-gray-600">
                  <strong>Descripción:</strong> {formData.descripcion}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex space-x-4">
          <Link
            href="/proveedor/parametrias/unidades-medida"
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
                Crear Unidad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
