"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Package, DollarSign, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Mock data del pedido - incluyo todos los pedidos
const pedidoData = {
  "ped-001": {
    id: "ped-001",
    cliente: "Kiosco El Rápido",
    direccion: "Av. Corrientes 1234, CABA",
    telefono: "+54 11 4567-8901",
    productos: [
      { nombre: "Coca Cola 500ml", cantidad: 24, precio: 800, total: 19200 },
      { nombre: "Alfajores Havanna x6", cantidad: 10, precio: 1200, total: 12000 },
      { nombre: "Papas Lays 150g", cantidad: 12, precio: 450, total: 5400 },
      { nombre: "Chicles Beldent", cantidad: 20, precio: 180, total: 3600 },
      { nombre: "Cigarrillos Marlboro", cantidad: 5, precio: 1080, total: 5400 },
    ],
    total: 45600,
    observaciones: "Tocar timbre 2 veces",
  },
  "ped-002": {
    id: "ped-002",
    cliente: "Supermercado Los Andes",
    direccion: "Av. Rivadavia 2567, CABA",
    telefono: "+54 11 4567-8902",
    productos: [
      { nombre: "Coca Cola 2L", cantidad: 12, precio: 1200, total: 14400 },
      { nombre: "Galletitas Oreo", cantidad: 24, precio: 650, total: 15600 },
      { nombre: "Aceite Natura 900ml", cantidad: 6, precio: 1800, total: 10800 },
      { nombre: "Arroz Gallo 1kg", cantidad: 10, precio: 980, total: 9800 },
      { nombre: "Fideos Matarazzo", cantidad: 15, precio: 420, total: 6300 },
      { nombre: "Leche La Serenísima 1L", cantidad: 20, precio: 850, total: 17000 },
      { nombre: "Pan Lactal Bimbo", cantidad: 8, precio: 680, total: 5440 },
      { nombre: "Yogur Ser 1L", cantidad: 6, precio: 1200, total: 7200 },
    ],
    total: 87300,
    observaciones: "Entrada por el costado",
  },
  "ped-003": {
    id: "ped-003",
    cliente: "Almacén Don Pedro",
    direccion: "San Martín 890, CABA",
    telefono: "+54 11 4567-8903",
    productos: [
      { nombre: "Cerveza Quilmes 1L", cantidad: 12, precio: 1100, total: 13200 },
      { nombre: "Vino Toro 750ml", cantidad: 6, precio: 1500, total: 9000 },
      { nombre: "Agua Villavicencio 2L", cantidad: 10, precio: 450, total: 4500 },
      { nombre: "Gaseosa Sprite 2L", cantidad: 8, precio: 1000, total: 8000 },
      { nombre: "Jugo Cepita 1L", cantidad: 12, precio: 780, total: 9360 },
      { nombre: "Snacks Doritos", cantidad: 15, precio: 550, total: 8250 },
    ],
    total: 52400,
    observaciones: "Cliente canceló por falta de espacio",
  },
  "ped-004": {
    id: "ped-004",
    cliente: "Kiosco Central",
    direccion: "Av. 9 de Julio 456, CABA",
    telefono: "+54 11 4567-8904",
    productos: [
      { nombre: "Coca Cola 500ml", cantidad: 18, precio: 800, total: 14400 },
      { nombre: "Pepsi 500ml", cantidad: 12, precio: 750, total: 9000 },
      { nombre: "Alfajores Jorgito x3", cantidad: 20, precio: 850, total: 17000 },
      { nombre: "Chicles Topline", cantidad: 25, precio: 180, total: 4500 },
      { nombre: "Caramelos Sugus", cantidad: 30, precio: 120, total: 3600 },
      { nombre: "Cigarrillos Philip Morris", cantidad: 4, precio: 1200, total: 4800 },
      { nombre: "Encendedores BIC", cantidad: 10, precio: 350, total: 3500 },
      { nombre: "Pilas Duracell AA", cantidad: 8, precio: 450, total: 3600 },
      { nombre: "Preservativos Prime", cantidad: 6, precio: 1200, total: 7200 },
      { nombre: "Aspirinas Bayer", cantidad: 5, precio: 620, total: 3100 },
    ],
    total: 68900,
    observaciones: "Llamar antes de llegar",
  },
}

export default function EntregaPage() {
  const router = useRouter()
  const params = useParams()
  const pedidoId = params.id as string

  const [metodoPago, setMetodoPago] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)

  const pedido = pedidoData[pedidoId as keyof typeof pedidoData]

  if (!pedido) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-gray-500">Pedido no encontrado</p>
          <Button variant="outline" onClick={() => router.back()} className="mt-4">
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleConfirmarEntrega = async () => {
    if (!metodoPago) {
      alert("Por favor selecciona el método de pago")
      return
    }

    setIsConfirming(true)

    // Simular confirmación
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Aquí se enviaría la confirmación al backend
    console.log({
      pedidoId,
      metodoPago,
      observaciones,
      fechaEntrega: new Date().toISOString(),
    })

    setIsConfirming(false)

    // Mostrar confirmación y volver
    alert("¡Entrega confirmada exitosamente!")
    router.push("/transportista/ruta")
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold">Confirmar Entrega</h1>
          <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
        </div>
      </div>

      {/* Info del cliente */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{pedido.cliente}</CardTitle>
          <p className="text-sm text-gray-600">{pedido.direccion}</p>
          {pedido.observaciones && (
            <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
              <strong>Observaciones:</strong> {pedido.observaciones}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Detalle de productos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Package className="w-4 h-4 mr-2" />
            Productos a Entregar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {pedido.productos.map((producto, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{producto.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {producto.cantidad} x {formatCurrency(producto.precio)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{formatCurrency(producto.total)}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
              <p className="font-bold">Total</p>
              <p className="font-bold text-lg text-[#0492C2]">{formatCurrency(pedido.total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Método de pago */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Método de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RadioGroup value={metodoPago} onValueChange={setMetodoPago}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="efectivo" id="efectivo" />
              <Label htmlFor="efectivo">Efectivo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transferencia" id="transferencia" />
              <Label htmlFor="transferencia">Transferencia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tarjeta" id="tarjeta" />
              <Label htmlFor="tarjeta">Tarjeta de Débito/Crédito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cuenta-corriente" id="cuenta-corriente" />
              <Label htmlFor="cuenta-corriente">Cuenta Corriente</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Observaciones */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Observaciones de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Textarea
            placeholder="Agregar observaciones sobre la entrega (opcional)"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Botón de confirmación */}
      <div className="sticky bottom-20 pt-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          onClick={handleConfirmarEntrega}
          disabled={!metodoPago || isConfirming}
        >
          {isConfirming ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Confirmando...</span>
            </div>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar Entrega y Pago
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
