"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, AlertTriangle, TrendingUp, Users, DollarSign, Filter, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos simulados
const cuentasCorrientes = [
  {
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
  },
  {
    id: 2,
    cliente: "Almacén Don José",
    razonSocial: "José Pérez",
    saldoActual: -25300.0,
    limiteCredito: 30000.0,
    deudaVencida: 0,
    ultimoPago: "2024-01-18",
    diasVencido: 0,
    nivelRiesgo: "Medio",
    estado: "Al día",
  },
  {
    id: 3,
    cliente: "Supermercado Central",
    razonSocial: "Central SA",
    saldoActual: -75000.0,
    limiteCredito: 100000.0,
    deudaVencida: 25000.0,
    ultimoPago: "2024-01-05",
    diasVencido: 20,
    nivelRiesgo: "Alto",
    estado: "Límite superado",
  },
  {
    id: 4,
    cliente: "Kiosco La Esquina",
    razonSocial: "María González",
    saldoActual: -12000.0,
    limiteCredito: 25000.0,
    deudaVencida: 0,
    ultimoPago: "2024-01-20",
    diasVencido: 0,
    nivelRiesgo: "Bajo",
    estado: "Al día",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Math.abs(amount))
}

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Al día":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Al día</Badge>
    case "Vencido":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Vencido</Badge>
    case "Límite superado":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Límite superado</Badge>
    default:
      return <Badge variant="secondary">{estado}</Badge>
  }
}

const getRiesgoBadge = (riesgo: string) => {
  switch (riesgo) {
    case "Bajo":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Bajo</Badge>
    case "Medio":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medio</Badge>
    case "Alto":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alto</Badge>
    default:
      return <Badge variant="secondary">{riesgo}</Badge>
  }
}

export default function CuentaCorrientePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroRiesgo, setFiltroRiesgo] = useState("todos")

  // Cálculos para KPIs
  const deudaTotal = cuentasCorrientes.reduce((sum, cuenta) => sum + Math.abs(cuenta.saldoActual), 0)
  const deudaVencidaTotal = cuentasCorrientes.reduce((sum, cuenta) => sum + cuenta.deudaVencida, 0)
  const clientesConProblemas = cuentasCorrientes.filter((c) => c.estado !== "Al día").length
  const creditoTotal = cuentasCorrientes.reduce((sum, cuenta) => sum + cuenta.limiteCredito, 0)

  // Filtros
  const cuentasFiltradas = cuentasCorrientes.filter((cuenta) => {
    const matchSearch =
      cuenta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuenta.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === "todos" || cuenta.estado === filtroEstado
    const matchRiesgo = filtroRiesgo === "todos" || cuenta.nivelRiesgo === filtroRiesgo

    return matchSearch && matchEstado && matchRiesgo
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cuenta Corriente</h1>
          <p className="text-gray-600">Gestión de cuentas corrientes y cobranzas</p>
        </div>
        <Link href="/proveedor/cuenta-corriente/nuevo-pago">
          <Button className="bg-provender-primary hover:bg-provender-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Pago
          </Button>
        </Link>
      </div>

      {/* Alertas */}
      {(deudaVencidaTotal > 0 || clientesConProblemas > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <div className="text-sm text-yellow-800">
              <strong>Atención:</strong> Tienes {clientesConProblemas} cliente(s) con problemas de pago
              {deudaVencidaTotal > 0 && ` y ${formatCurrency(deudaVencidaTotal)} en deuda vencida`}.
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deuda Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(deudaTotal)}</div>
            <p className="text-xs text-muted-foreground">Total adeudado por clientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deuda Vencida</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(deudaVencidaTotal)}</div>
            <p className="text-xs text-muted-foreground">Pagos atrasados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes con Problemas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{clientesConProblemas}</div>
            <p className="text-xs text-muted-foreground">De {cuentasCorrientes.length} clientes totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédito Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(creditoTotal)}</div>
            <p className="text-xs text-muted-foreground">Límite total otorgado</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre o razón social..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="Al día">Al día</SelectItem>
            <SelectItem value="Vencido">Vencido</SelectItem>
            <SelectItem value="Límite superado">Límite superado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroRiesgo} onValueChange={setFiltroRiesgo}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Riesgo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los riesgos</SelectItem>
            <SelectItem value="Bajo">Bajo</SelectItem>
            <SelectItem value="Medio">Medio</SelectItem>
            <SelectItem value="Alto">Alto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de cuentas corrientes */}
      <div className="space-y-4">
        {cuentasFiltradas.map((cuenta) => (
          <Card key={cuenta.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{cuenta.cliente}</h3>
                    <div className="flex gap-2">
                      {getEstadoBadge(cuenta.estado)}
                      {getRiesgoBadge(cuenta.nivelRiesgo)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{cuenta.razonSocial}</p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Saldo Actual:</span>
                      <p className="font-semibold text-red-600">{formatCurrency(cuenta.saldoActual)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Límite de Crédito:</span>
                      <p className="font-semibold">{formatCurrency(cuenta.limiteCredito)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Crédito Disponible:</span>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(cuenta.limiteCredito - Math.abs(cuenta.saldoActual))}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Último Pago:</span>
                      <p className="font-semibold">{cuenta.ultimoPago}</p>
                    </div>
                  </div>

                  {cuenta.deudaVencida > 0 && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center text-yellow-800">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          Deuda vencida: {formatCurrency(cuenta.deudaVencida)} ({cuenta.diasVencido} días)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href={`/proveedor/cuenta-corriente/${cuenta.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalle
                    </Button>
                  </Link>
                  <Link href={`/proveedor/cuenta-corriente/${cuenta.id}/pago`}>
                    <Button size="sm" className="w-full sm:w-auto bg-provender-primary hover:bg-provender-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Registrar Pago
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cuentasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cuentas</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda.</p>
        </div>
      )}
    </div>
  )
}
