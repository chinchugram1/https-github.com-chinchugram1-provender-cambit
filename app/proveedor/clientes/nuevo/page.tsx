"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoClientePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    fantasyName: "",
    taxCondition: "responsable_inscripto",
    cuitCuil: "",
    contactPhone: "",
    contactName: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      // Redirigir a la lista de clientes
      router.push("/proveedor/clientes")
    }, 1000)
  }

  const taxConditions = [
    { value: "responsable_inscripto", label: "Responsable Inscripto" },
    { value: "monotributo", label: "Monotributo" },
    { value: "exento", label: "Exento" },
    { value: "consumidor_final", label: "Consumidor Final" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/clientes"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Cliente</h1>
          <p className="text-gray-600">Completa los datos del cliente</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Información Básica</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Juan Carlos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Supermercados San Martín S.A."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Fantasía *</label>
                <input
                  type="text"
                  name="fantasyName"
                  value={formData.fantasyName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Super San Martín"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información Fiscal */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Información Fiscal</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condición Impositiva *</label>
                <select
                  name="taxCondition"
                  value={formData.taxCondition}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  {taxConditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CUIT/CUIL *</label>
                <input
                  type="text"
                  name="cuitCuil"
                  value={formData.cuitCuil}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: 30-12345678-9"
                  pattern="[0-9]{2}-[0-9]{8}-[0-9]{1}"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Formato: XX-XXXXXXXX-X</p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Información de Contacto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Contacto *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Juan Carlos Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono de Contacto *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: +54 11 1234-5678"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: contacto@cliente.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              href="/proveedor/clientes"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Guardando..." : "Crear Cliente"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
