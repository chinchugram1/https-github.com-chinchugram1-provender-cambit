"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save, Building2, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

export default function NuevaSucursalPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    zone: "",
    mondayFriday: { open: "08:00", close: "18:00", closed: false },
    saturday: { open: "08:00", close: "13:00", closed: false },
    sunday: { open: "09:00", close: "12:00", closed: true },
  })

  const zones = ["Centro", "Norte", "Sur", "Este", "Oeste"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se enviaría la data al backend
    console.log("Nueva sucursal:", formData)
    alert("Sucursal creada exitosamente!")
    router.push(`/proveedor/clientes/${clientId}/sucursales`)
  }

  const isFormValid = () => {
    return formData.name && formData.phone && formData.address && formData.zone
  }

  const formatSchedule = () => {
    const parts = []
    if (!formData.mondayFriday.closed) {
      parts.push(`Lun-Vie ${formData.mondayFriday.open}-${formData.mondayFriday.close}`)
    }
    if (!formData.saturday.closed) {
      parts.push(`Sáb ${formData.saturday.open}-${formData.saturday.close}`)
    }
    if (!formData.sunday.closed) {
      parts.push(`Dom ${formData.sunday.open}-${formData.sunday.close}`)
    }
    return parts.join(", ") || "Horarios no definidos"
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/proveedor/clientes/${clientId}/sucursales`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Sucursal</h1>
          <p className="text-gray-600">Agrega una nueva sucursal al cliente</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Sucursal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ej: Sucursal Centro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+54 11 1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="sucursal@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Completa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Calle 123, Barrio, Ciudad"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona <span className="text-red-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  required
                >
                  <option value="">Seleccionar zona</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">PIN en el Mapa</span>
                </div>
                <p className="text-sm text-blue-700">
                  Próximamente podrás marcar la ubicación exacta en el mapa para optimizar las rutas de entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Horarios de Atención */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Atención</h2>
            <div className="space-y-4">
              {/* Lunes a Viernes */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <input
                    type="checkbox"
                    id="mondayFriday"
                    checked={!formData.mondayFriday.closed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mondayFriday: { ...formData.mondayFriday, closed: !e.target.checked },
                      })
                    }
                  />
                  <label htmlFor="mondayFriday" className="text-sm font-medium text-gray-700">
                    Lunes a Viernes
                  </label>
                </div>
                {!formData.mondayFriday.closed && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Apertura</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.mondayFriday.open}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mondayFriday: { ...formData.mondayFriday, open: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Cierre</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.mondayFriday.close}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mondayFriday: { ...formData.mondayFriday, close: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sábados */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <input
                    type="checkbox"
                    id="saturday"
                    checked={!formData.saturday.closed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        saturday: { ...formData.saturday, closed: !e.target.checked },
                      })
                    }
                  />
                  <label htmlFor="saturday" className="text-sm font-medium text-gray-700">
                    Sábados
                  </label>
                </div>
                {!formData.saturday.closed && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Apertura</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.saturday.open}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saturday: { ...formData.saturday, open: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Cierre</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.saturday.close}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saturday: { ...formData.saturday, close: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Domingos */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <input
                    type="checkbox"
                    id="sunday"
                    checked={!formData.sunday.closed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sunday: { ...formData.sunday, closed: !e.target.checked },
                      })
                    }
                  />
                  <label htmlFor="sunday" className="text-sm font-medium text-gray-700">
                    Domingos
                  </label>
                </div>
                {!formData.sunday.closed && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Apertura</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.sunday.open}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sunday: { ...formData.sunday, open: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Cierre</label>
                      <input
                        type="time"
                        className="input-field"
                        value={formData.sunday.close}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sunday: { ...formData.sunday, close: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          {isFormValid() && (
            <div className="card bg-provender-light/10 border-provender-light">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h2>
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{formData.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{formData.address}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📞 {formData.phone}</p>
                    {formData.email && <p>✉️ {formData.email}</p>}
                    <p>🕒 {formatSchedule()}</p>
                    <span className="inline-block bg-provender-light/20 text-provender-primary px-2 py-1 rounded-full text-xs">
                      {formData.zone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Link
              href={`/proveedor/clientes/${clientId}/sucursales`}
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
              <span>Crear Sucursal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
