"use client"

import type React from "react"

import { useState } from "react"
import { User, Bell, Palette, Shield, Save, Eye, EyeOff } from "lucide-react"

interface ConfigSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const configSections: ConfigSection[] = [
  {
    id: "perfil",
    title: "Perfil del Negocio",
    icon: User,
    description: "Información básica de tu empresa",
  },
  {
    id: "notificaciones",
    title: "Notificaciones",
    icon: Bell,
    description: "Configura cómo recibir alertas",
  },
  {
    id: "apariencia",
    title: "Apariencia",
    icon: Palette,
    description: "Personaliza la interfaz",
  },
  {
    id: "seguridad",
    title: "Seguridad",
    icon: Shield,
    description: "Contraseña y acceso",
  },
]

export default function ConfiguracionPage() {
  const [activeSection, setActiveSection] = useState("perfil")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    promotions: false,
    reports: true,
  })

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Negocio</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
              <input
                type="text"
                className="input-field"
                defaultValue="Distribuidora PROVENDER"
                placeholder="Nombre de tu empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CUIT/CUIL</label>
              <input type="text" className="input-field" defaultValue="20-12345678-9" placeholder="XX-XXXXXXXX-X" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <input
              type="text"
              className="input-field"
              defaultValue="Av. Corrientes 1234, CABA"
              placeholder="Dirección completa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                className="input-field"
                defaultValue="+54 11 1234-5678"
                placeholder="+54 11 XXXX-XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                defaultValue="proveedor@provender.com"
                placeholder="email@empresa.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              defaultValue="Distribuidora especializada en productos de consumo masivo para kioscos y almacenes."
              placeholder="Describe tu negocio..."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Atención</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lunes a Viernes</label>
              <div className="flex space-x-2">
                <input type="time" className="input-field" defaultValue="08:00" />
                <input type="time" className="input-field" defaultValue="18:00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sábados</label>
              <div className="flex space-x-2">
                <input type="time" className="input-field" defaultValue="08:00" />
                <input type="time" className="input-field" defaultValue="13:00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domingos</label>
              <select className="input-field">
                <option>Cerrado</option>
                <option>Abierto</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Nuevos Pedidos</h4>
              <p className="text-sm text-gray-600">Recibir notificación cuando llegue un nuevo pedido</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, newOrders: !notifications.newOrders })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.newOrders ? "bg-provender-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.newOrders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Stock Bajo</h4>
              <p className="text-sm text-gray-600">Alertas cuando los productos tengan poco stock</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, lowStock: !notifications.lowStock })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.lowStock ? "bg-provender-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.lowStock ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Promociones</h4>
              <p className="text-sm text-gray-600">Notificaciones sobre promociones que vencen</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.promotions ? "bg-provender-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.promotions ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Reportes</h4>
              <p className="text-sm text-gray-600">Resúmenes diarios y semanales de ventas</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, reports: !notifications.reports })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.reports ? "bg-provender-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.reports ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Notificación</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="email" className="rounded border-gray-300" defaultChecked />
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="sms" className="rounded border-gray-300" />
            <label htmlFor="sms" className="text-gray-700">
              SMS
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="push" className="rounded border-gray-300" defaultChecked />
            <label htmlFor="push" className="text-gray-700">
              Notificaciones Push
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tema</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border-2 border-provender-primary rounded-lg bg-white">
            <div className="w-full h-20 bg-gradient-to-br from-provender-light to-provender-primary rounded mb-3"></div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="theme" id="light" defaultChecked />
              <label htmlFor="light" className="font-medium">
                Claro
              </label>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg bg-white">
            <div className="w-full h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded mb-3"></div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="theme" id="dark" />
              <label htmlFor="dark" className="font-medium">
                Oscuro
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tamaño de Fuente</h3>
        <select className="input-field max-w-xs">
          <option>Pequeño</option>
          <option selected>Mediano</option>
          <option>Grande</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Idioma</h3>
        <select className="input-field max-w-xs">
          <option selected>Español</option>
          <option>English</option>
          <option>Português</option>
        </select>
      </div>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder="Ingresa tu contraseña actual"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
            <input type="password" className="input-field" placeholder="Ingresa tu nueva contraseña" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
            <input type="password" className="input-field" placeholder="Confirma tu nueva contraseña" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Autenticación de Dos Factores</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">2FA</h4>
              <p className="text-sm text-gray-600">Agrega una capa extra de seguridad a tu cuenta</p>
            </div>
            <button className="px-4 py-2 bg-provender-primary text-white rounded-lg hover:bg-provender-secondary">
              Activar
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sesiones Activas</h3>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Dispositivo Actual</h4>
                <p className="text-sm text-gray-600">Chrome en Windows • Buenos Aires, Argentina</p>
                <p className="text-xs text-gray-500">Última actividad: Ahora</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Activa</span>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Móvil</h4>
                <p className="text-sm text-gray-600">Safari en iPhone • Buenos Aires, Argentina</p>
                <p className="text-xs text-gray-500">Última actividad: Hace 2 horas</p>
              </div>
              <button className="text-red-600 text-sm hover:text-red-800">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActiveSection = () => {
    switch (activeSection) {
      case "perfil":
        return renderProfileSection()
      case "notificaciones":
        return renderNotificationsSection()
      case "apariencia":
        return renderAppearanceSection()
      case "seguridad":
        return renderSecuritySection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Personaliza tu experiencia en PROVENDER</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-0">
            <div className="space-y-1">
              {configSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-provender-primary text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p
                          className={`text-xs ${activeSection === section.id ? "text-provender-cream" : "text-gray-500"}`}
                        >
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {renderActiveSection()}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button className="btn-primary flex items-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
