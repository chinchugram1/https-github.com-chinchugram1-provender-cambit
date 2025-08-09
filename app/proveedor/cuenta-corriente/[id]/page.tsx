"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, DollarSign, CreditCard, Calendar, Plus, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos simulados
const clienteData = {
  id: 1,
  cliente: "Kiosco El Rápido",
  razonSocial: "El Rápido SRL",
  saldoActual: -15750.0,
  limiteCredito: 50000.0,
  deudaVencida: 8500.0,
  ultimoPago: "2024-01-10",
  diasVencido: 15,
  nivelRiesgo: "Alto",
  estado: "Vencido",
}

const movimientos = [
  {
    id: 1,
    fecha: "2024-01-20",
    tipo: "Pedido",
    descripcion: "Pedido #1234 - Productos varios",
    debito: 5250.0,
    credito: 0,
    saldo: -15750.0,
    estado: "Pendiente",
    referencia: "PED-1234",
  },
  {
    id: 2,
    fecha: "2024-01-18",
    tipo: "Pago",
    descripcion: "Pago parcial - Transferencia",
    debito: 0,
    credito: 3000.0,
    saldo: -10500.0,
    estado: "Confirmado",
    referencia: "TRF-5678",
  },
  {
    id: 3,
    fecha: "2024-01-15",
    tipo: "Pedido",
    descripcion: "Pedido #1233 - Bebidas y snacks",
    debito: 7800.0,
    credito: 0,
    saldo: -13500.0,
    estado: "Vencido",
    referencia: "PED-1233",
  },
  {
    id: 4,
    fecha: "2024-01-10",
    tipo: "Pago",
    descripcion: "Pago completo - Efectivo",
    debito: 0,
    credito: 12000.0,
    saldo: -5700.0,
    estado: "Confirmado",
    referencia: "EFE-9012",
  },
  {
    id: 5,
    fecha: "2024-01-08",
    tipo: "Pedido",
    descripcion: "Pedido #1232 - Productos de limpieza",
    debito: 4200.0,
    credito: 0,
    saldo: -17700.0,
    estado: "Pagado",
    referencia: "PED-1232",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Math.abs(amount))
}

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "Pedido":
      return "📦"
    case "Pago":
      return "💰"
    case "Ajuste":
      return "⚖️"
    case "Interés":
      return "📈"
    default:
      return "📄"
  }
}

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Confirmado":
    case "Pagado":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{estado}</Badge>
    case "Pendiente":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{estado}</Badge>
    case "Vencido":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{estado}</Badge>
    default:
      return <Badge variant="secondary">{estado}</Badge>
  }
}

export default function CuentaCorrienteDetallePage({ params }: { params: { id: string } }) {
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")

  // Filtros
  const movimientosFiltrados = movimientos.filter((mov) => {
    const matchTipo = filtroTipo === "todos" || mov.tipo === filtroTipo
    // Aquí podrías agregar lógica para filtrar por período
    return matchTipo
  })

  // Cálculos
  const creditoDisponible = clienteData.limiteCredito - Math.abs(clienteData.saldoActual)
  const totalDebitos = movimientosFiltrados.reduce((sum, mov) => sum + mov.debito, 0)
  const totalCreditos = movimientosFiltrados.reduce((sum, mov) => sum + mov.credito, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/proveedor/cuenta-corriente">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{clienteData.cliente}</h1>
          <p className="text-gray-600">{clienteData.razonSocial}</p>
        </div>
        <Link href={`/proveedor/cuenta-corriente/${params.id}/pago`}>
          <Button className="bg-provender-primary hover:bg-provender-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Pago
          </Button>
        </Link>
      </div>

      {/* Alertas */}
      {clienteData.deudaVencida > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div className="text-sm text-red-800">
              <strong>Deuda Vencida:</strong> {formatCurrency(clienteData.deudaVencida)}({clienteData.diasVencido} días
              de atraso)
            </div>
          </div>
        </div>
      )}

      {creditoDisponible < 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div className="text-sm text-red-800">
              <strong>Límite de Crédito Superado:</strong> Exceso de {formatCurrency(Math.abs(creditoDisponible))}
            </div>
          </div>
        </div>
      )}

      {/* Resumen de cuenta */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(clienteData.saldoActual)}</div>
            <p className="text-xs text-muted-foreground">Debe el cliente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Límite de Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(clienteData.limiteCredito)}</div>
            <p className="text-xs text-muted-foreground">Límite autorizado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédito Disponible</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${creditoDisponible >= 0 ? "text-green-600" : "text-red-600"}`}>
              {creditoDisponible >= 0
                ? formatCurrency(creditoDisponible)
                : `-${formatCurrency(Math.abs(creditoDisponible))}`}
            </div>
            <p className="text-xs text-muted-foreground">Disponible para usar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clienteData.ultimoPago}</div>
            <p className="text-xs text-muted-foreground">Fecha del último pago</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl font-semibold">Historial de Movimientos</h2>
        <div className="flex gap-4">
          <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los períodos</SelectItem>
              <SelectItem value="ultimo-mes">Último mes</SelectItem>
              <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
              <SelectItem value="ultimo-año">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="Pedido">Pedidos</SelectItem>
              <SelectItem value="Pago">Pagos</SelectItem>
              <SelectItem value="Ajuste">Ajustes</SelectItem>
              <SelectItem value="Interés">Intereses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumen de movimientos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Débitos</div>
            <div className="text-xl font-bold text-red-600">{formatCurrency(totalDebitos)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Créditos</div>
            <div className="text-xl font-bold text-green-600">{formatCurrency(totalCreditos)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Movimientos</div>
            <div className="text-xl font-bold">{movimientosFiltrados.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de movimientos */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Débito
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crédito
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Saldo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movimientosFiltrados.map((movimiento) => (
                  <tr key={movimiento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movimiento.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{getTipoIcon(movimiento.tipo)}</span>
                        {movimiento.tipo}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        {movimiento.descripcion}
                        <div className="text-xs text-gray-500">Ref: {movimiento.referencia}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {movimiento.debito > 0 && (
                        <span className="text-red-600 font-medium">{formatCurrency(movimiento.debito)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {movimiento.credito > 0 && (
                        <span className="text-green-600 font-medium">{formatCurrency(movimiento.credito)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <span className="text-red-600">{formatCurrency(movimiento.saldo)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{getEstadoBadge(movimiento.estado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {movimientosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay movimientos</h3>
          <p className="text-gray-600">No se encontraron movimientos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  )
}
