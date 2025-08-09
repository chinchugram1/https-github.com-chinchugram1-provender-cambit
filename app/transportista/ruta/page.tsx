"use client"
import { useRouter } from "next/navigation"
import { MapPin, Phone, Navigation, Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data para la ruta de hoy con nuevos estados
const rutaHoy = {
  fecha: "2024-01-16",
  entregas: [
    {
      id: "ped-001",
      cliente: "Kiosco El Rápido",
      direccion: "Av. Corrientes 1234, CABA",
      telefono: "+54 11 4567-8901",
      horario: "08:00 - 09:00",
      productos: 15,
      total: 45600,
      estado: "entregado",
      observaciones: "Tocar timbre 2 veces",
    },
    {
      id: "ped-002",
      cliente: "Supermercado Los Andes",
      direccion: "Av. Rivadavia 2567, CABA",
      telefono: "+54 11 4567-8902",
      horario: "09:30 - 10:30",
      productos: 32,
      total: 87300,
      estado: "entregado",
      observaciones: "Entrada por el costado",
    },
    {
      id: "ped-003",
      cliente: "Almacén Don Pedro",
      direccion: "San Martín 890, CABA",
      telefono: "+54 11 4567-8903",
      horario: "11:00 - 12:00",
      productos: 18,
      total: 52400,
      estado: "cancelado",
      observaciones: "Negocio cerrado por vacaciones",
    },
    {
      id: "ped-004",
      cliente: "Kiosco Central",
      direccion: "Av. 9 de Julio 456, CABA",
      telefono: "+54 11 4567-8904",
      horario: "14:00 - 15:00",
      productos: 22,
      total: 68900,
      estado: "en_calle",
      observaciones: "Llamar antes de llegar",
    },
  ],
}

export default function RutaPage() {
  const router = useRouter()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "entregado":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Entregado</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>
      case "en_calle":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Camino</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "entregado":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "cancelado":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "en_calle":
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const entregasPendientes = rutaHoy.entregas.filter((e) => e.estado === "en_calle").length
  const entregasEntregadas = rutaHoy.entregas.filter((e) => e.estado === "entregado").length
  const totalFacturacion = rutaHoy.entregas
    .filter((e) => e.estado === "entregado")
    .reduce((acc, entrega) => acc + entrega.total, 0)

  return (
    <div className="p-4 space-y-4">
      {/* Resumen del día */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ruta de Hoy</h2>
            <Badge className="bg-[#0492C2] text-white">
              {new Date(rutaHoy.fecha).toLocaleDateString("es-AR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#0492C2]">{rutaHoy.entregas.length}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{entregasPendientes}</div>
              <div className="text-xs text-gray-500">En Camino</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{entregasEntregadas}</div>
              <div className="text-xs text-gray-500">Entregadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón para ver ruta completa */}
      <Button
        className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90"
        onClick={() => {
          const direcciones = rutaHoy.entregas
            .filter((e) => e.estado === "en_calle")
            .map((e) => encodeURIComponent(e.direccion))
            .join("/")
          window.open(`https://maps.google.com/dir/${direcciones}`, "_blank")
        }}
      >
        <Navigation className="w-4 h-4 mr-2" />
        Ver Ruta Completa en Maps
      </Button>

      {/* Lista de entregas */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Entregas del Día</h3>

        {rutaHoy.entregas.map((entrega, index) => (
          <Card
            key={entrega.id}
            className={`border-l-4 ${
              entrega.estado === "entregado"
                ? "border-l-green-500"
                : entrega.estado === "cancelado"
                  ? "border-l-red-500"
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    {getEstadoBadge(entrega.estado)}
                  </div>
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    {getEstadoIcon(entrega.estado)}
                    <span className="ml-2">{entrega.cliente}</span>
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {entrega.direccion}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {entrega.horario}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  {entrega.productos} productos
                </div>
                <div className="font-semibold text-gray-900">{formatCurrency(entrega.total)}</div>
              </div>

              {entrega.observaciones && (
                <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded mb-3">
                  <strong>Obs:</strong> {entrega.observaciones}
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${entrega.telefono}`, "_self")}
                  disabled={entrega.estado === "entregado" || entrega.estado === "cancelado"}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Llamar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(entrega.direccion)}`, "_blank")
                  }
                  disabled={entrega.estado === "entregado" || entrega.estado === "cancelado"}
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Ir
                </Button>
                {entrega.estado === "en_calle" && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => router.push(`/transportista/entrega/${entrega.id}`)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Entregar
                  </Button>
                )}
                {entrega.estado === "en_calle" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => router.push(`/transportista/cancelar/${entrega.id}`)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancelar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen de facturación */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Facturación del Día</p>
              <p className="text-xs text-green-600">Entregas confirmadas</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-800">{formatCurrency(totalFacturacion)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
