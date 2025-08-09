"use client"

import { useState } from "react"
import { Search, Plus, Users, MapPin, Calendar, ShoppingBag, DollarSign, Filter, Building2 } from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  firstName: string
  lastName: string
  businessName: string
  fantasyName: string
  taxCondition: string
  cuitCuil: string
  contactPhone: string
  contactName: string
  email: string
  registrationDate: string
  status: "activo" | "inactivo" | "pendiente"
  totalBranches: number
  activeBranches: number
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  averageOrderValue: number
}

const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Juan Carlos",
    lastName: "Pérez",
    businessName: "Supermercados San Martín S.A.",
    fantasyName: "Super San Martín",
    taxCondition: "Responsable Inscripto",
    cuitCuil: "30-12345678-9",
    contactPhone: "+54 11 1234-5678",
    contactName: "Juan Carlos Pérez",
    email: "juan@supersanmartin.com",
    registrationDate: "2023-06-15",
    status: "activo",
    totalBranches: 3,
    activeBranches: 3,
    totalOrders: 145,
    totalSpent: 325000,
    lastOrderDate: "2024-01-20",
    averageOrderValue: 2240,
  },
  {
    id: "2",
    firstName: "María Elena",
    lastName: "González",
    businessName: "Distribuidora González Hnos.",
    fantasyName: "Almacén Central",
    taxCondition: "Responsable Inscripto",
    cuitCuil: "27-23456789-4",
    contactPhone: "+54 11 2345-6789",
    contactName: "María Elena González",
    email: "maria@gonzalezhnos.com",
    registrationDate: "2023-08-22",
    status: "activo",
    totalBranches: 2,
    activeBranches: 2,
    totalOrders: 89,
    totalSpent: 189000,
    lastOrderDate: "2024-01-18",
    averageOrderValue: 2124,
  },
  {
    id: "3",
    firstName: "Carlos Alberto",
    lastName: "Rodríguez",
    businessName: "Kioscos del Barrio S.R.L.",
    fantasyName: "Super Barrio",
    taxCondition: "Responsable Inscripto",
    cuitCuil: "30-34567890-1",
    contactPhone: "+54 11 3456-7890",
    contactName: "Carlos Alberto Rodríguez",
    email: "carlos@kioscosdelbarrio.com",
    registrationDate: "2023-11-10",
    status: "pendiente",
    totalBranches: 1,
    activeBranches: 0,
    totalOrders: 8,
    totalSpent: 15000,
    lastOrderDate: "2024-01-15",
    averageOrderValue: 1875,
  },
  {
    id: "4",
    firstName: "Ana Sofía",
    lastName: "Martínez",
    businessName: "Despensas Familiares S.A.",
    fantasyName: "Despensa Familiar",
    taxCondition: "Responsable Inscripto",
    cuitCuil: "27-45678901-2",
    contactPhone: "+54 11 4567-8901",
    contactName: "Ana Sofía Martínez",
    email: "ana@despensasfamiliares.com",
    registrationDate: "2023-04-03",
    status: "inactivo",
    totalBranches: 4,
    activeBranches: 1,
    totalOrders: 167,
    totalSpent: 380000,
    lastOrderDate: "2023-12-20",
    averageOrderValue: 2275,
  },
]

export default function ClientesPage() {
  const [clients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "activo", label: "Activos" },
    { value: "inactivo", label: "Inactivos" },
    { value: "pendiente", label: "Pendientes" },
  ]

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.fantasyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "todos" || client.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "inactivo":
        return "bg-red-100 text-red-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "activo":
        return "Activo"
      case "inactivo":
        return "Inactivo"
      case "pendiente":
        return "Pendiente"
      default:
        return status
    }
  }

  const totalBranches = clients.reduce((sum, c) => sum + c.totalBranches, 0)
  const activeBranches = clients.reduce((sum, c) => sum + c.activeBranches, 0)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h1>
          <p className="text-gray-600">Gestiona tu base de clientes y sus sucursales</p>
        </div>
        <Link href="/proveedor/clientes/nuevo" className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <Users className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sucursales</p>
              <p className="text-2xl font-bold text-blue-600">{totalBranches}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sucursales Activas</p>
              <p className="text-2xl font-bold text-green-600">{activeBranches}</p>
            </div>
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Totales</p>
              <p className="text-2xl font-bold text-provender-primary">
                ${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, razón social o nombre de fantasía..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Estado:</span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedStatus === option.value
                  ? "bg-provender-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-provender-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{client.fantasyName}</h3>
                <p className="text-gray-600">{client.businessName}</p>
                <p className="text-sm text-gray-500">
                  {client.firstName} {client.lastName} • {client.cuitCuil}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
                {getStatusText(client.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Sucursales</span>
                <p className="font-semibold text-gray-900">
                  {client.activeBranches}/{client.totalBranches}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Total Pedidos</span>
                <p className="font-semibold text-gray-900">{client.totalOrders}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Total Gastado</span>
                <p className="font-semibold text-gray-900">${client.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Último Pedido</span>
                <p className="font-semibold text-gray-900">
                  {new Date(client.lastOrderDate).toLocaleDateString("es-AR")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Cliente desde {new Date(client.registrationDate).toLocaleDateString("es-AR")}</span>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/proveedor/clientes/${client.id}`}
                  className="flex items-center space-x-1 px-3 py-1 bg-provender-primary/10 text-provender-primary rounded-lg text-sm hover:bg-provender-primary/20"
                >
                  <Users className="w-4 h-4" />
                  <span>Gestionar</span>
                </Link>
                <Link
                  href={`/proveedor/clientes/${client.id}/sucursales`}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Sucursales</span>
                </Link>
                <Link
                  href={`/proveedor/clientes/${client.id}/pedidos`}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pedidos</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron clientes</h3>
          <p className="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <Link href="/proveedor/clientes/nuevo" className="btn-primary">
            Agregar Primer Cliente
          </Link>
        </div>
      )}
    </div>
  )
}
