"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Edit,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Branch {
  id: string
  name: string
  phone: string
  email: string
  address: string
  zone: string
  schedule: string
  isActive: boolean
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
}

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Sucursal Centro",
    phone: "+54 11 1234-5678",
    email: "centro@supersanmartin.com",
    address: "San Martín 1234, Centro",
    zone: "Centro",
    schedule: "Lun-Vie 8:00-18:00, Sáb 8:00-13:00",
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
    schedule: "Lun-Vie 9:00-19:00, Sáb 9:00-14:00",
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
    schedule: "Lun-Vie 8:30-17:30, Sáb 8:30-12:30",
    isActive: false,
    totalOrders: 32,
    totalSpent: 72000,
    lastOrderDate: "2024-01-15",
  },
]

const zones = ["Todas", "Centro", "Norte", "Sur", "Este", "Oeste"]

export default function SucursalesPage() {
  const params = useParams()
  const clientId = params.id as string
  const [branches, setBranches] = useState<Branch[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedZone, setSelectedZone] = useState("Todas")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setBranches(mockBranches)
      setLoading(false)
    }, 500)
  }, [clientId])

  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZone = selectedZone === "Todas" || branch.zone === selectedZone
    return matchesSearch && matchesZone
  })

  const toggleBranchStatus = (branchId: string) => {
    setBranches(branches.map((branch) => (branch.id === branchId ? { ...branch, isActive: !branch.isActive } : branch)))
  }

  const activeBranches = branches.filter((b) => b.isActive).length
  const totalOrders = branches.reduce((sum, b) => sum + b.totalOrders, 0)
  const totalSpent = branches.reduce((sum, b) => sum + b.totalSpent, 0)

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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/proveedor/clientes/${clientId}`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Sucursales</h1>
          <p className="text-gray-600">Gestiona las sucursales del cliente</p>
        </div>
        <Link
          href={`/proveedor/clientes/${clientId}/sucursales/nueva`}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Sucursal</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sucursales</p>
              <p className="text-2xl font-bold text-gray-900">{branches.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activas</p>
              <p className="text-2xl font-bold text-green-600">{activeBranches}</p>
            </div>
            <ToggleRight className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-provender-primary">{totalOrders}</p>
            </div>
            <Building2 className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Ventas</p>
              <p className="text-2xl font-bold text-green-600">${totalSpent.toLocaleString()}</p>
            </div>
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar sucursales por nombre o dirección..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Zona:</span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedZone === zone
                  ? "bg-provender-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-provender-primary"
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Branches List */}
      <div className="space-y-4">
        {filteredBranches.map((branch) => (
          <div key={branch.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{branch.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{branch.address}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    branch.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {branch.isActive ? "Activa" : "Inactiva"}
                </span>
                <button
                  onClick={() => toggleBranchStatus(branch.id)}
                  className={`p-1 rounded ${branch.isActive ? "text-green-600" : "text-gray-400"}`}
                >
                  {branch.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Contacto</span>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-900">{branch.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-900">{branch.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Horarios</span>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-900">{branch.schedule}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Performance</span>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900">{branch.totalOrders} pedidos</p>
                  <p className="text-gray-900">${branch.totalSpent.toLocaleString()} en ventas</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="inline-block bg-provender-light/20 text-provender-primary px-2 py-1 rounded-full text-xs">
                {branch.zone}
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/proveedor/clientes/${clientId}/sucursales/${branch.id}/editar`}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </Link>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span>Ver en Mapa</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron sucursales</h3>
          <p className="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <Link href={`/proveedor/clientes/${clientId}/sucursales/nueva`} className="btn-primary">
            Crear Primera Sucursal
          </Link>
        </div>
      )}
    </div>
  )
}
