"use client"

import { useState } from "react"
import { MapPin, Clock, Package, Navigation, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data para la próxima ruta programada con detalle de productos
const proximaRuta = {
  fecha: "2024-01-17",
  entregas: [
    {
      id: "ped-201",
      cliente: "Supermercado Norte",
      direccion: "Av. Cabildo 1500, CABA",
      telefono: "+54 11 4567-8905",
      horario: "08:30 - 09:30",
      productos: [
        { nombre: "Coca Cola 2L", cantidad: 15, precio: 1200, total: 18000 },
        { nombre: "Leche La Serenísima 1L", cantidad: 24, precio: 850, total: 20400 },
        { nombre: "Pan Lactal Bimbo", cantidad: 12, precio: 680, total: 8160 },
        { nombre: "Aceite Natura 900ml", cantidad: 8, precio: 1800, total: 14400 },
        { nombre: "Arroz Gallo 1kg", cantidad: 15, precio: 980, total: 14700 },
        { nombre: "Fideos Matarazzo", cantidad: 20, precio: 420, total: 8400 },
        { nombre: "Yogur Ser 1L", cantidad: 6, precio: 1200, total: 7200 },
      ],
      total: 89400,
      observaciones: "Entrega temprana solicitada",
    },
    {
      id: "ped-202",
      cliente: "Kiosco Plaza",
      direccion: "Plaza San Martín 123, CABA",
      telefono: "+54 11 4567-8906",
      horario: "10:00 - 11:00",
      productos: [
        { nombre: "Coca Cola 500ml", cantidad: 20, precio: 800, total: 16000 },
        { nombre: "Alfajores Havanna x6", cantidad: 8, precio: 1200, total: 9600 },
        { nombre: "Chicles Beldent", cantidad: 15, precio: 180, total: 2700 },
        { nombre: "Cigarrillos Marlboro", cantidad: 6, precio: 1080, total: 6480 },
        { nombre: "Encendedores BIC", cantidad: 12, precio: 350, total: 4200 },
        { nombre: "Caramelos Sugus", cantidad: 25, precio: 120, total: 3000 },
        { nombre: "Preservativos Prime", cantidad: 4, precio: 1200, total: 4800 },
        { nombre: "Pilas Duracell AA", cantidad: 6, precio: 450, total: 2700 },
      ],
      total: 52300,
      observaciones: "",
    },
    {
      id: "ped-203",
      cliente: "Almacén Familiar",
      direccion: "Belgrano 456, CABA",
      telefono: "+54 11 4567-8907",
      horario: "11:30 - 12:30",
      productos: [
        { nombre: "Cerveza Quilmes 1L", cantidad: 18, precio: 1100, total: 19800 },
        { nombre: "Vino Toro 750ml", cantidad: 8, precio: 1500, total: 12000 },
        { nombre: "Agua Villavicencio 2L", cantidad: 12, precio: 450, total: 5400 },
        { nombre: "Gaseosa Sprite 2L", cantidad: 10, precio: 1000, total: 10000 },
        { nombre: "Jugo Cepita 1L", cantidad: 15, precio: 780, total: 11700 },
        { nombre: "Snacks Doritos", cantidad: 18, precio: 550, total: 9900 },
      ],
      total: 67800,
      observaciones: "Llamar antes de llegar",
    },
    {
      id: "ped-204",
      cliente: "Distribuidora Central",
      direccion: "Av. Santa Fe 789, CABA",
      telefono: "+54 11 4567-8908",
      horario: "14:00 - 15:00",
      productos: [
        { nombre: "Coca Cola 2L", cantidad: 30, precio: 1200, total: 36000 },
        { nombre: "Pepsi 2L", cantidad: 20, precio: 1150, total: 23000 },
        { nombre: "Leche La Serenísima 1L", cantidad: 40, precio: 850, total: 34000 },
        { nombre: "Aceite Natura 900ml", cantidad: 15, precio: 1800, total: 27000 },
        { nombre: "Arroz Gallo 1kg", cantidad: 25, precio: 980, total: 24500 },
        { nombre: "Fideos Matarazzo", cantidad: 30, precio: 420, total: 12600 },
      ],
      total: 156700,
      observaciones: "Descarga por muelle de carga",
    },
  ],
}

export default function ProximaRutaPage() {
  const [expandedCards, setExpandedCards] = useState<string[]>([])

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

  const toggleExpanded = (pedidoId: string) => {
    setExpandedCards((prev) => (prev.includes(pedidoId) ? prev.filter((id) => id !== pedidoId) : [...prev, pedidoId]))
  }

  const totalProductos = proximaRuta.entregas.reduce(
    (acc, entrega) => acc + entrega.productos.reduce((sum, prod) => sum + prod.cantidad, 0),
    0,
  )
  const totalFacturacion = proximaRuta.entregas.reduce((acc, entrega) => acc + entrega.total, 0)

  return (
    <div className="p-4 space-y-4">
      {/* Header con fecha */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Próxima Ruta</h2>
            <Badge className="bg-[#0492C2] text-white">{formatFecha(proximaRuta.fecha)}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#0492C2]">{proximaRuta.entregas.length}</div>
              <div className="text-xs text-gray-500">Entregas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{totalProductos}</div>
              <div className="text-xs text-gray-500">Productos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalFacturacion)}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón para planificar ruta */}
      <Button
        className="w-full bg-[#0492C2] hover:bg-[#0492C2]/90"
        onClick={() => {
          const direcciones = proximaRuta.entregas.map((e) => encodeURIComponent(e.direccion)).join("/")
          window.open(`https://maps.google.com/dir/${direcciones}`, "_blank")
        }}
      >
        <Navigation className="w-4 h-4 mr-2" />
        Planificar Ruta en Maps
      </Button>

      {/* Información importante */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-orange-800">Recordatorio</p>
              <p className="text-sm text-orange-700">
                Esta ruta está programada para mañana. Revisa los productos y observaciones para armar el camión.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de entregas programadas */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Entregas Programadas</h3>

        {proximaRuta.entregas.map((entrega, index) => (
          <Card key={entrega.id} className="border-l-4 border-l-[#0492C2]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <Badge variant="outline" className="text-[#0492C2] border-[#0492C2]">
                      Programada
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900">{entrega.cliente}</h4>
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
                  {entrega.productos.reduce((sum, prod) => sum + prod.cantidad, 0)} productos
                </div>
                <div className="font-semibold text-gray-900">{formatCurrency(entrega.total)}</div>
              </div>

              {entrega.observaciones && (
                <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded mb-3">
                  <strong>Obs:</strong> {entrega.observaciones}
                </div>
              )}

              {/* Detalle de productos colapsible */}
              <Collapsible>
                <CollapsibleTrigger
                  className="flex items-center justify-between w-full p-2 bg-gray-50 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => toggleExpanded(entrega.id)}
                >
                  <span>Ver detalle de productos</span>
                  {expandedCards.includes(entrega.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="space-y-2 bg-gray-50 p-3 rounded">
                    {entrega.productos.map((producto, prodIndex) => (
                      <div key={prodIndex} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-xs text-gray-500">
                            {producto.cantidad} x {formatCurrency(producto.precio)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(producto.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() =>
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(entrega.direccion)}`, "_blank")
                  }
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Ver Ubicación
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nota al final */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Tip:</strong> Usa el detalle de productos para armar el camión de manera eficiente antes de
            salir.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
