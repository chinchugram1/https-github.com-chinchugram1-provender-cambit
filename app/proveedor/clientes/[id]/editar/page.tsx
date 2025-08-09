"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

// Mock data para simular carga del cliente
const mockClient = {
  id: "1",
  firstName: "Juan Carlos",
  lastName: "Pérez",
  businessName: "Supermercados San Martín S.A.",
  fantasyName: "Super San Martín",
  taxCondition: "Responsable Inscripto",
  cuitCuil: "30-12345678-9",
  contactPhone: "+54 11 1234-5678",
  contactName: "Juan Carlos Pérez",
  email: "juan@supersanmartin.com",
}

export default function EditarClientePage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    fantasyName: "",
    taxCondition: "",
    cuitCuil: "",
    contactPhone: "",
    contactName: "",
    email: "",
  })

  const [loading, setLoading] = useState(true)

  const taxConditions = [
    "Responsable Inscripto",
    "Responsable No Inscripto",
    "Exento",
    "Consumidor Final",
    "Monotributista",
  ]

  useEffect(() => {
    // Simular carga del cliente
    setTimeout(() => {
      setFormData({
        firstName: mockClient.firstName,
        lastName: mockClient.lastName,
        businessName: mockClient.businessName,
        fantasyName: mockClient.fantasyName,
        taxCondition: mockClient.taxCondition,
        cuitCuil: mockClient.cuitCuil,
        contactPhone: mockClient.contactPhone,
        contactName: mockClient.contactName,
        email: mockClient.email,
      })
      setLoading(false)
    }, 500)
  }, [clientId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se enviaría la data al backend
    console.log("Cliente actualizado:", formData)
    alert("Cliente actualizado exitosamente!")
    router.push(`/proveedor/clientes/${clientId}`)
  }

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.businessName &&
      formData.cuitCuil &&
      formData.contactPhone &&
      formData.email
    )
  }

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div>
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-4xl space-y-6">
          <div className="card">
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/proveedor/clientes/${clientId}`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Cliente</h1>
          <p className="text-gray-600">Modifica la información del cliente</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Personales */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Juan Carlos"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Datos Comerciales */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos Comerciales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razón Social <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Supermercados San Martín S.A."
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Fantasía</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Super San Martín"
                  value={formData.fantasyName}
                  onChange={(e) => setFormData({ ...formData, fantasyName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CUIT/CUIL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="30-12345678-9"
                    value={formData.cuitCuil}
                    onChange={(e) => setFormData({ ...formData, cuitCuil: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condición Impositiva</label>
                  <select
                    className="input-field"
                    value={formData.taxCondition}
                    onChange={(e) => setFormData({ ...formData, taxCondition: e.target.value })}
                  >
                    <option value="">Seleccionar condición</option>
                    {taxConditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Datos de Contacto */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Contacto</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Juan Carlos Pérez"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono de Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+54 11 1234-5678"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="cliente@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {isFormValid() && (
            <div className="card bg-provender-light/10 border-provender-light">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h2>
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-provender-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-provender-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {formData.fantasyName || formData.businessName}
                  </h3>
                  <p className="text-gray-600">{formData.businessName}</p>
                  <p className="text-sm text-gray-500">
                    {formData.firstName} {formData.lastName} • {formData.cuitCuil}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>📞 {formData.contactPhone}</p>
                    <p>✉️ {formData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Link
              href={`/proveedor/clientes/${clientId}`}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Actualizar Cliente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
