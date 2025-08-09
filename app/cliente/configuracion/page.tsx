"use client"

import { useState } from "react"
import { Building, Bell, Shield, CreditCard, Save } from "lucide-react"

interface ConfigData {
  // Datos de la empresa
  fantasyName: string
  businessName: string
  cuitCuil: string
  email: string
  phone: string
  address: string

  // Configuraciones
  notifications: {
    orderUpdates: boolean
    promotions: boolean
    priceChanges: boolean
    email: boolean
    sms: boolean
  }

  // Preferencias de pedido
  defaultDeliveryTime: string
  autoApplyPromotions: boolean
  requireOrderConfirmation: boolean
}

const initialConfig: ConfigData = {
  fantasyName: "Super San Martín",
  businessName: "Supermercados San Martín S.A.",
  cuitCuil: "30-12345678-9",
  email: "admin@supersanmartin.com",
  phone: "+54 11 1234-5678",
  address: "San Martín 1234, Centro, CABA",
  notifications: {
    orderUpdates: true,
    promotions: true,
    priceChanges: false,
    email: true,
    sms: false,
  },
  defaultDeliveryTime: "morning",
  autoApplyPromotions: true,
  requireOrderConfirmation: false,
}

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<ConfigData>(initialConfig)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("empresa")

  const handleSave = async () => {
    setLoading(true)
    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      alert("Configuración guardada correctamente")
    }, 1000)
  }

  const handleInputChange = (field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }))
  }

  const tabs = [
    { id: "empresa", label: "Datos de Empresa", icon: Building },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "pedidos", label: "Preferencias", icon: CreditCard },
    { id: "seguridad", label: "Seguridad", icon: Shield },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra la configuración de tu cuenta y preferencias</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "bg-white text-provender-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "empresa" && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Fantasía *</label>
                <input
                  type="text"
                  value={config.fantasyName}
                  onChange={(e) => handleInputChange("fantasyName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social *</label>
                <input
                  type="text"
                  value={config.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CUIT/CUIL *</label>
                <input
                  type="text"
                  value={config.cuitCuil}
                  onChange={(e) => handleInputChange("cuitCuil", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                <input
                  type="tel"
                  value={config.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
                <input
                  type="text"
                  value={config.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notificaciones" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Notificaciones</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Actualizaciones de Pedidos</h4>
                    <p className="text-sm text-gray-600">Recibir notificaciones sobre el estado de tus pedidos</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notifications.orderUpdates}
                    onChange={(e) => handleNotificationChange("orderUpdates", e.target.checked)}
                    className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Promociones</h4>
                    <p className="text-sm text-gray-600">Recibir información sobre nuevas promociones y ofertas</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notifications.promotions}
                    onChange={(e) => handleNotificationChange("promotions", e.target.checked)}
                    className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Cambios de Precios</h4>
                    <p className="text-sm text-gray-600">Notificaciones sobre actualizaciones de precios</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notifications.priceChanges}
                    onChange={(e) => handleNotificationChange("priceChanges", e.target.checked)}
                    className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Canales de Notificación</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notifications.email}
                    onChange={(e) => handleNotificationChange("email", e.target.checked)}
                    className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS</h4>
                    <p className="text-sm text-gray-600">Recibir notificaciones por mensaje de texto</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notifications.sms}
                    onChange={(e) => handleNotificationChange("sms", e.target.checked)}
                    className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pedidos" && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Pedidos</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horario de Entrega Preferido</label>
                <select
                  value={config.defaultDeliveryTime}
                  onChange={(e) => handleInputChange("defaultDeliveryTime", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                >
                  <option value="morning">Mañana (8:00 - 12:00)</option>
                  <option value="afternoon">Tarde (12:00 - 18:00)</option>
                  <option value="evening">Noche (18:00 - 22:00)</option>
                  <option value="any">Cualquier horario</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Aplicar Promociones Automáticamente</h4>
                  <p className="text-sm text-gray-600">
                    Las promociones aplicables se agregarán automáticamente a tus pedidos
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.autoApplyPromotions}
                  onChange={(e) => handleInputChange("autoApplyPromotions", e.target.checked)}
                  className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Requerir Confirmación de Pedidos</h4>
                  <p className="text-sm text-gray-600">Solicitar confirmación antes de enviar pedidos al proveedor</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.requireOrderConfirmation}
                  onChange={(e) => handleInputChange("requireOrderConfirmation", e.target.checked)}
                  className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "seguridad" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  />
                </div>
                <button className="btn-secondary">Actualizar Contraseña</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sesiones Activas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Dispositivo Actual</p>
                    <p className="text-sm text-gray-600">Chrome en Windows • Última actividad: Ahora</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Activa</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">iPhone</p>
                    <p className="text-sm text-gray-600">Safari en iOS • Última actividad: Hace 2 horas</p>
                  </div>
                  <button className="text-red-600 text-sm hover:text-red-800">Cerrar sesión</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="sticky bottom-4">
        <button onClick={handleSave} disabled={loading} className="w-full btn-primary flex items-center justify-center">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Guardar Configuración
            </>
          )}
        </button>
      </div>
    </div>
  )
}
