"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Target,
  Users,
  Star,
  Send,
  Calendar,
  Filter,
  TrendingUp,
  MessageSquare,
  Plus,
  Eye,
  Edit,
} from "lucide-react"

const segmentosDisponibles = [
  {
    id: 1,
    nombre: "Solo Kioscos",
    descripcion: "Clientes tipo kiosco únicamente",
    cantidad: 45,
    criterio: "tipo",
    valor: "kiosco",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    nombre: "Clientes Inactivos 30 días",
    descripcion: "Sin compras en los últimos 30 días",
    cantidad: 12,
    criterio: "inactividad",
    valor: "30_dias",
    color: "bg-red-100 text-red-800",
  },
  {
    id: 3,
    nombre: "Compradores de Golosinas",
    descripcion: "Clientes que suelen comprar golosinas",
    cantidad: 67,
    criterio: "categoria",
    valor: "golosinas",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 4,
    nombre: "Clientes Premium",
    descripcion: "Facturación mensual > $10,000",
    cantidad: 23,
    criterio: "facturacion",
    valor: "premium",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 5,
    nombre: "Zona Norte",
    descripcion: "Clientes ubicados en zona norte",
    cantidad: 34,
    criterio: "zona",
    valor: "norte",
    color: "bg-green-100 text-green-800",
  },
]

const campanasActivas = [
  {
    id: 1,
    nombre: "Reactivación Clientes Inactivos",
    segmento: "Clientes Inactivos 30 días",
    fechaCreacion: "2024-01-15",
    fechaEnvio: "2024-01-16",
    destinatarios: 12,
    abiertos: 8,
    clicks: 3,
    conversiones: 2,
    estado: "completada",
    mensaje: "¡Te extrañamos! Volvé con 15% OFF en tu próxima compra",
  },
  {
    id: 2,
    nombre: "Promoción Golosinas Día del Niño",
    segmento: "Compradores de Golosinas",
    fechaCreacion: "2024-01-18",
    fechaEnvio: "2024-01-20",
    destinatarios: 67,
    abiertos: 45,
    clicks: 18,
    conversiones: 12,
    estado: "activa",
    mensaje: "Día del Niño: 2x1 en todas las golosinas. ¡No te lo pierdas!",
  },
  {
    id: 3,
    nombre: "Oferta Exclusiva Premium",
    segmento: "Clientes Premium",
    fechaCreacion: "2024-01-19",
    fechaEnvio: "pendiente",
    destinatarios: 23,
    abiertos: 0,
    clicks: 0,
    conversiones: 0,
    estado: "programada",
    mensaje: "Oferta exclusiva para nuestros mejores clientes: 20% OFF",
  },
]

export default function CampanasSegmentadasPage() {
  const [segmentoSeleccionado, setSegmentoSeleccionado] = useState<number | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevaCampana, setNuevaCampana] = useState({
    nombre: "",
    mensaje: "",
    fechaEnvio: "",
    segmento: "",
  })

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "bg-green-100 text-green-800"
      case "completada":
        return "bg-blue-100 text-blue-800"
      case "programada":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calcularTasaApertura = (abiertos: number, destinatarios: number) => {
    return destinatarios > 0 ? ((abiertos / destinatarios) * 100).toFixed(1) : "0"
  }

  const calcularTasaConversion = (conversiones: number, destinatarios: number) => {
    return destinatarios > 0 ? ((conversiones / destinatarios) * 100).toFixed(1) : "0"
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Premium */}
      <div className="mb-8">
        <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Campañas Segmentadas
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Crea campañas dirigidas a segmentos específicos de clientes con mensajes personalizados
                  </p>
                </div>
              </div>
              <Target className="h-12 w-12 text-[#0492C2]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs de Campañas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campañas Activas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campanasActivas.filter((c) => c.estado === "activa").length}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa Apertura Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    campanasActivas.reduce(
                      (acc, c) => acc + Number.parseFloat(calcularTasaApertura(c.abiertos, c.destinatarios)),
                      0,
                    ) / campanasActivas.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversiones Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campanasActivas.reduce((acc, c) => acc + c.conversiones, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Segmentos Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">{segmentosDisponibles.length}</p>
              </div>
              <Filter className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segmentos Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Segmentos de Clientes Disponibles
              </CardTitle>
              <CardDescription>Selecciona un segmento para crear una campaña dirigida</CardDescription>
            </div>
            <Button onClick={() => setMostrarFormulario(true)} className="bg-[#0492C2] hover:bg-[#0492C2]/90">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Campaña
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segmentosDisponibles.map((segmento) => (
              <div
                key={segmento.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  segmentoSeleccionado === segmento.id
                    ? "border-[#0492C2] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSegmentoSeleccionado(segmento.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{segmento.nombre}</h4>
                  <Badge className={segmento.color}>{segmento.cantidad}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{segmento.descripcion}</p>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#0492C2]" />
                  <span className="text-sm font-medium text-[#0492C2]">{segmento.cantidad} clientes</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulario Nueva Campaña */}
      {mostrarFormulario && (
        <Card className="mb-8 border-2 border-[#0492C2]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Crear Nueva Campaña
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Campaña</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Ej: Promoción Fin de Semana"
                    value={nuevaCampana.nombre}
                    onChange={(e) => setNuevaCampana({ ...nuevaCampana, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Segmento Objetivo</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={nuevaCampana.segmento}
                    onChange={(e) => setNuevaCampana({ ...nuevaCampana, segmento: e.target.value })}
                  >
                    <option value="">Seleccionar segmento</option>
                    {segmentosDisponibles.map((segmento) => (
                      <option key={segmento.id} value={segmento.nombre}>
                        {segmento.nombre} ({segmento.cantidad} clientes)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Envío</label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={nuevaCampana.fechaEnvio}
                    onChange={(e) => setNuevaCampana({ ...nuevaCampana, fechaEnvio: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje de la Campaña</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none"
                  placeholder="Escribe tu mensaje personalizado aquí..."
                  value={nuevaCampana.mensaje}
                  onChange={(e) => setNuevaCampana({ ...nuevaCampana, mensaje: e.target.value })}
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">💡 Sugerencias de Mensajes:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• "¡Te extrañamos! Volvé con 15% OFF"</li>
                    <li>• "Oferta exclusiva para vos: 2x1 en golosinas"</li>
                    <li>• "Promoción especial zona norte: envío gratis"</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">
                <Send className="h-4 w-4 mr-2" />
                Programar Campaña
              </Button>
              <Button variant="outline" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campañas Activas y Historial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Campañas Activas e Historial
          </CardTitle>
          <CardDescription>Seguimiento de rendimiento de tus campañas segmentadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {campanasActivas.map((campana) => (
              <div key={campana.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{campana.nombre}</h4>
                      <Badge className={getEstadoColor(campana.estado)}>
                        {campana.estado === "activa"
                          ? "Activa"
                          : campana.estado === "completada"
                            ? "Completada"
                            : "Programada"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Segmento:</strong> {campana.segmento}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Mensaje:</strong> "{campana.mensaje}"
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Creada: {new Date(campana.fechaCreacion).toLocaleDateString()}
                      </span>
                      {campana.fechaEnvio !== "pendiente" && (
                        <span className="flex items-center gap-1">
                          <Send className="h-4 w-4" />
                          Enviada: {new Date(campana.fechaEnvio).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>

                {campana.estado !== "programada" && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{campana.destinatarios}</p>
                      <p className="text-sm text-gray-600">Enviados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{campana.abiertos}</p>
                      <p className="text-sm text-gray-600">Abiertos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{campana.clicks}</p>
                      <p className="text-sm text-gray-600">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{campana.conversiones}</p>
                      <p className="text-sm text-gray-600">Conversiones</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#0492C2]">
                        {calcularTasaConversion(campana.conversiones, campana.destinatarios)}%
                      </p>
                      <p className="text-sm text-gray-600">Tasa Conversión</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
