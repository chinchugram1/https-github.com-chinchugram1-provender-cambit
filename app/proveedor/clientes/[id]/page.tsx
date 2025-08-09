"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Edit, Building2, ShoppingBag, DollarSign, Calendar, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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

interface Branch {
  id: string
  name: string
  phone: string
  email: string
  address: string
  zone: string
  isActive: boolean
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
}

// Mock data
const mockClient: Client = {
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
}

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Sucursal Centro",
    phone: "+54 11 1234-5678",
    email: "centro@supersanmartin.com",
    address: "San Martín 1234, Centro",
    zone: "Centro",
    isActive: true,
    totalOrders: 65,
    totalSpent: 145000,
    lastOrderDate: "2024-01-20",
  },
  {
    id: "2",
    name: "Sucursal Norte",
    phone: "+54 11 1234-5679",
    email: "norte@supersanmartin.com",
    address: "Belgrano 567, Norte",
    zone: "Norte",
    isActive: true,
    totalOrders: 48,
    totalSpent: 108000,
    lastOrderDate: "2024-01-18",
  },
  {
    id: "3",
    name: "Sucursal Sur",
    phone: "+54 11 1234-5680",
    email: "sur@supersanmartin.com",
    address: "Mitre 890, Sur",
    zone: "Sur",
    isActive: true,
    totalOrders: 32,
    totalSpent: 72000,
    lastOrderDate: "2024-01-15",
  },
]

export default function ClienteDetailPage() {
  const params = useParams()
  const clientId = params.id as string
  const [client, setClient] = useState<Client | null>(null)
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setClient(mockClient)
      setBranches(mockBranches)
      setLoading(false)
    }, 500)
  }, [clientId])

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

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div>
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente no encontrado</h3>
          <Link href="/proveedor/clientes" className="btn-primary">
            Volver a Clientes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/clientes"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.fantasyName}</h1>
          <p className="text-gray-600">{client.businessName}</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/proveedor/clientes/${client.id}/editar`}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Edit className="w-5 h-5" />
            <span>Editar</span>
          </Link>
          <Link
            href={`/proveedor/clientes/${client.id}/sucursales`}
            className="btn-primary flex items-center space-x-2"
          >
            <Building2 className="w-5 h-5" />
            <span>Gestionar Sucursales</span>
          </Link>
        </div>
      </div>

      {/* Client Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Información del Cliente</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
                {getStatusText(client.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                  <p className="text-gray-900">
                    {client.firstName} {client.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Razón Social</label>
                  <p className="text-gray-900">{client.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CUIT/CUIL</label>
                  <p className="text-gray-900">{client.cuitCuil}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Condición Impositiva</label>
                  <p className="text-gray-900">{client.taxCondition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contacto</label>
                  <p className="text-gray-900">{client.contactName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Cliente desde</label>
                  <p className="text-gray-900">{new Date(client.registrationDate).toLocaleDateString("es-AR")}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{client.contactPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{client.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Branches Preview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sucursales ({branches.length})</h2>
              <Link
                href={`/proveedor/clientes/${client.id}/sucursales`}
                className="text-provender-primary font-medium text-sm hover:text-provender-secondary"
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-3">
              {branches.slice(0, 3).map((branch) => (
                <div key={branch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{branch.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{branch.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${branch.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{branch.totalOrders} pedidos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sucursales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {client.activeBranches}/{client.totalBranches}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pedidos</p>
                  <p className="text-2xl font-bold text-gray-900">{client.totalOrders}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-provender-primary" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Gastado</p>
                  <p className="text-2xl font-bold text-gray-900">${client.totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Promedio por Pedido</p>
                  <p className="text-2xl font-bold text-gray-900">${client.averageOrderValue.toLocaleString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-provender-warm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
