"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Package, Search, Filter, Eye } from "lucide-react"
import Link from "next/link"

interface Pedido {
  id: string
  fecha: string
  total: number
  estado: string
  items: number
  proveedor: string
}

export default function HistorialPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [dateFilter, setDateFilter] = useState("todos")

  // Mock data - en producción vendría de la API
  const pedidos: Pedido[] = [
    {
      id: "PED-001",
      fecha: "2024-01-15",
      total: 2850,
      estado: "Entregado",
      items: 8,
      proveedor: "Distribuidora Central",
    },
    {
      id: "PED-002",
      fecha: "2024-01-12",
      total: 1920,
      estado: "En camino",
      items: 5,
      proveedor: "Distribuidora Central",
    },
    {
      id: "PED-003",
      fecha: "2024-01-10",
      total: 3450,
      estado: "Entregado",
      items: 12,
      proveedor: "Distribuidora Central",
    },
    {
      id: "PED-004",
      fecha: "2024-01-08",
      total: 1580,
      estado: "Cancelado",
      items: 4,
      proveedor: "Distribuidora Central",
    },
    {
      id: "PED-005",
      fecha: "2024-01-05",
      total: 4200,
      estado: "Entregado",
      items: 15,
      proveedor: "Distribuidora Central",
    },
  ]

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "En camino":
        return "bg-blue-100 text-blue-800"
      case "Confirmado":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPedidos = pedidos.filter((pedido) => {
    const matchesSearch = pedido.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || pedido.estado.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const totalGastado = pedidos.filter((p) => p.estado === "Entregado").reduce((sum, pedido) => sum + pedido.total, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Historial de Pedidos</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                <p className="text-2xl font-bold">{pedidos.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                <p className="text-2xl font-bold">${totalGastado.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Entregados</p>
                <p className="text-2xl font-bold">{pedidos.filter((p) => p.estado === "Entregado").length}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID de pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="en camino">En camino</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los períodos</SelectItem>
                <SelectItem value="ultima-semana">Última semana</SelectItem>
                <SelectItem value="ultimo-mes">Último mes</SelectItem>
                <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({filteredPedidos.length})</CardTitle>
          <CardDescription>Lista de todos tus pedidos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0492C2]/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-[#0492C2]" />
                  </div>
                  <div>
                    <p className="font-semibold">{pedido.id}</p>
                    <p className="text-sm text-gray-600">
                      {pedido.items} productos • {pedido.proveedor}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(pedido.fecha).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold">${pedido.total.toLocaleString()}</p>
                    <Badge className={getStatusColor(pedido.estado)}>{pedido.estado}</Badge>
                  </div>
                  <Link href={`/cliente/historial/${pedido.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalle
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPedidos.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron pedidos</h3>
              <p className="text-gray-600 mb-4">No hay pedidos que coincidan con los filtros seleccionados</p>
              <Button>Hacer Nuevo Pedido</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
