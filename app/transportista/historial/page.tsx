"use client"

import { useState } from "react"
import { Calendar, Package, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data del historial (últimos 10 días)
const historialEntregas = [
  {
    fecha: "2024-01-15",
    entregas: [
      {
        id: "ped-101",
        cliente: "Kiosco Central",
        direccion: "Florida 345, CABA",
        productos: 15,
        total: 56700,
        metodoPago: "efectivo",
        horaEntrega: "14:30",
      },
      {
        id: "ped-102",
        cliente: "Almacén San Martín",
        direccion: "San Martín 789, CABA",
        productos: 22,
        total: 78900,
        metodoPago: "transferencia",
        horaEntrega: "16:15",
      },
    ],
  },
  {
    fecha: "2024-01-14",
    entregas: [
      {
        id: "ped-098",
        cliente: "Supermercado La Esquina",
        direccion: "Rivadavia 890, CABA",
        productos: 35,
        total: 125400,
        metodoPago: "cuenta-corriente",
        horaEntrega: "11:45",
      },
      {
        id: "ped-099",
        cliente: "Kiosco El Rápido",
        direccion: "Av. Corrientes 1234, CABA",
        productos: 18,
        total: 67800,
        metodoPago: "tarjeta",
        horaEntrega: "15:20",
      },
    ],
  },
  {
    fecha: "2024-01-13",
    entregas: [
      {
        id: "ped-095",
        cliente: "Almacén Don José",
        direccion: "San Martín 567, CABA",
        productos: 12,
        total: 45600,
        metodoPago: "efectivo",
        horaEntrega: "10:30",
      },
    ],
  },
]

export default function HistorialPage() {
  const [filtroFecha, setFiltroFecha] = useState("todos")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const getMetodoPagoColor = (metodo: string) => {
    switch (metodo) {
      case "efectivo":
        return "bg-green-100 text-green-800"
      case "transferencia":
        return "bg-blue-100 text-blue-800"
      case "tarjeta":
        return "bg-purple-100 text-purple-800"
      case "cuenta-corriente":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMetodoPagoTexto = (metodo: string) => {
    switch (metodo) {
      case "efectivo":
        return "Efectivo"
      case "transferencia":
        return "Transferencia"
      case "tarjeta":
        return "Tarjeta"
      case "cuenta-corriente":
        return "Cta. Corriente"
      default:
        return metodo
    }
  }

  // Calcular totales
  const totalEntregas = historialEntregas.reduce((acc, dia) => acc + dia.entregas.length, 0)
  const totalFacturado = historialEntregas.reduce(
    (acc, dia) => acc + dia.entregas.reduce((dayAcc, entrega) => dayAcc + entrega.total, 0),
    0,
  )

  return (
    <div className="p-4 space-y-4">
      {/* Header con resumen */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Historial de Entregas</h2>
            <Badge variant="outline" className="text-[#0492C2] border-[#0492C2]">
              Últimos 10 días
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#0492C2]">{totalEntregas}</div>
              <div className="text-xs text-gray-500">Entregas Realizadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalFacturado)}</div>
              <div className="text-xs text-gray-500">Total Facturado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="flex space-x-2">
        <Button
          variant={filtroFecha === "todos" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroFecha("todos")}
          className={filtroFecha === "todos" ? "bg-[#0492C2] hover:bg-[#0492C2]/90" : ""}
        >
          Todos
        </Button>
        <Button
          variant={filtroFecha === "hoy" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroFecha("hoy")}
          className={filtroFecha === "hoy" ? "bg-[#0492C2] hover:bg-[#0492C2]/90" : ""}
        >
          Hoy
        </Button>
        <Button
          variant={filtroFecha === "semana" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroFecha("semana")}
          className={filtroFecha === "semana" ? "bg-[#0492C2] hover:bg-[#0492C2]/90" : ""}
        >
          Esta Semana
        </Button>
      </div>

      {/* Lista de entregas por día */}
      <div className="space-y-4">
        {historialEntregas.map((dia) => (
          <div key={dia.fecha}>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-[#0492C2]" />
              <h3 className="font-medium text-gray-900 capitalize">{formatFecha(dia.fecha)}</h3>
              <Badge variant="secondary">{dia.entregas.length} entregas</Badge>
            </div>

            <div className="space-y-2 ml-6">
              {dia.entregas.map((entrega) => (
                <Card key={entrega.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{entrega.cliente}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {entrega.direccion}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(entrega.total)}</div>
                        <div className="text-xs text-gray-500">{entrega.horaEntrega}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-3 h-3 mr-1" />
                          {entrega.productos} productos
                        </div>
                        <Badge className={getMetodoPagoColor(entrega.metodoPago)}>
                          {getMetodoPagoTexto(entrega.metodoPago)}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Entregado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
