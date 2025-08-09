"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Package, DollarSign, CreditCard, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos simulados del pedido
const pedidoData = {
  id: "1234",
  cliente: "Kiosco El Rápido",
  fecha: "2024-01-20",
  estado: "Pendiente",
  total: 5250.0,
  items: [
    { id: 1, producto: "Coca Cola 500ml", cantidad: 24, precio: 150.0, subtotal: 3600.0 },
    { id: 2, producto: "Papas Lays 150g", cantidad: 12, precio: 120.0, subtotal: 1440.0 },
    { id: 3, producto: "Chicles Beldent", cantidad: 10, precio: 21.0, subtotal: 210.0 },
  ],
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount)
}

export default function ConfirmarPedidoPage({ params }: { params: { pedidoId: string } }) {
  const [metodoPago, setMetodoPago] = useState("")
  const [monto, setMonto] = useState(pedidoData.total.toString())
  const [notas, setNotas] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowConfirmation(true)
  }

  if (showConfirmation) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Pedido Confirmado!</h2>
            <p className="text-green-700 mb-6">
              El pedido #{pedidoData.id} ha sido confirmado y el pago ha sido registrado exitosamente.
            </p>
            <div className="space-y-3">
              <Link href={`/proveedor/pedidos/${params.pedidoId}`}>
                <Button className="w-full bg-provender-primary hover:bg-provender-primary/90">
                  Ver Detalle del Pedido
                </Button>
              </Link>
              <Link href="/proveedor/pedidos">
                <Button variant="outline" className="w-full bg-transparent">
                  Volver a Pedidos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/proveedor/pedidos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Confirmar Pedido #{pedidoData.id}</h1>
          <p className="text-gray-600">Cliente: {pedidoData.cliente}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen del pedido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Resumen del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Número de Pedido:</span>
              <Badge variant="outline">#{pedidoData.id}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fecha:</span>
              <span className="font-medium">{pedidoData.fecha}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cliente:</span>
              <span className="font-medium">{pedidoData.cliente}</span>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Productos:</h4>
              <div className="space-y-2">
                {pedidoData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.producto}</span>
                      <span className="text-gray-500 ml-2">x{item.cantidad}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-provender-primary">{formatCurrency(pedidoData.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de pago */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Registrar Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="metodoPago">Método de Pago *</Label>
                <Select value={metodoPago} onValueChange={setMetodoPago} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">💵 Efectivo</SelectItem>
                    <SelectItem value="transferencia">🏦 Transferencia Bancaria</SelectItem>
                    <SelectItem value="cheque">📄 Cheque</SelectItem>
                    <SelectItem value="tarjeta">💳 Tarjeta de Crédito/Débito</SelectItem>
                    <SelectItem value="mercadopago">📱 MercadoPago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="monto">Monto *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="monto"
                    type="number"
                    step="0.01"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">Monto sugerido: {formatCurrency(pedidoData.total)}</p>
              </div>

              <div>
                <Label htmlFor="referencia">Referencia / Número de Comprobante</Label>
                <Input id="referencia" value={`PED-${pedidoData.id}`} disabled className="bg-gray-100 text-gray-600" />
                <p className="text-sm text-gray-500 mt-1">Se asigna automáticamente el número de pedido</p>
              </div>

              <div>
                <Label htmlFor="notas">Notas Adicionales</Label>
                <Textarea
                  id="notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Observaciones sobre el pago (opcional)"
                  rows={3}
                />
              </div>

              {/* Vista previa */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>Vista previa:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Se confirmará el pedido #{pedidoData.id}</li>
                      <li>• Se registrará un pago de {formatCurrency(Number.parseFloat(monto) || 0)}</li>
                      <li>• El estado del pedido cambiará a "Confirmado"</li>
                      <li>• Se actualizará la cuenta corriente del cliente</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Link href="/proveedor/pedidos" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 bg-provender-primary hover:bg-provender-primary/90"
                  disabled={isSubmitting || !metodoPago}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Pedido y Registrar Pago"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
