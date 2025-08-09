"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Search, DollarSign, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Client {
  id: string
  name: string
  businessName: string
  currentBalance: number
}

interface PaymentForm {
  clientId: string
  amount: string
  paymentMethod: string
  paymentDate: string
  reference: string
  notes: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Juan Carlos Pérez",
    businessName: "Super San Martín",
    currentBalance: -45000,
  },
  {
    id: "2",
    name: "María Elena González",
    businessName: "Almacén Central",
    currentBalance: -12000,
  },
  {
    id: "3",
    name: "Carlos Alberto Rodríguez",
    businessName: "Super Barrio",
    currentBalance: -75000,
  },
]

export default function NuevoPagoPage() {
  const router = useRouter()
  const [clients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const [formData, setFormData] = useState<PaymentForm>({
    clientId: "",
    amount: "",
    paymentMethod: "efectivo",
    paymentDate: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  })

  const [loading, setLoading] = useState(false)

  const paymentMethods = [
    { value: "efectivo", label: "Efectivo" },
    { value: "transferencia", label: "Transferencia Bancaria" },
    { value: "cheque", label: "Cheque" },
    { value: "tarjeta", label: "Tarjeta de Débito/Crédito" },
    { value: "mercadopago", label: "Mercado Pago" },
    { value: "otro", label: "Otro" },
  ]

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
    setFormData((prev) => ({
      ...prev,
      clientId: client.id,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular envío
    setTimeout(() => {
      setLoading(false)
      router.push("/proveedor/cuenta-corriente")
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/cuenta-corriente"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Pago</h1>
          <p className="text-gray-600">Selecciona un cliente y registra su pago</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Cliente</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedClient?.id === client.id
                    ? "border-provender-primary bg-provender-primary/5"
                    : "border-gray-200 hover:border-provender-primary hover:bg-gray-50"
                }`}
              >
                <h3 className="font-medium text-gray-900">{client.businessName}</h3>
                <p className="text-sm text-gray-600">{client.name}</p>
                <p className="text-sm font-semibold text-red-600">
                  Debe: ${Math.abs(client.currentBalance).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos del Pago</h2>

          {!selectedClient ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Selecciona un cliente para continuar</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Client Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900">{selectedClient.businessName}</h3>
                <p className="text-blue-700">{selectedClient.name}</p>
                <p className="text-sm font-semibold text-red-600">
                  Saldo actual: ${Math.abs(selectedClient.currentBalance).toLocaleString()} (Debe)
                </p>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Monto del Pago *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha del Pago *
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago *
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                  Referencia / Comprobante
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  placeholder="Ej: TRF-001234, CHQ-5678"
                  value={formData.reference}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notas
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                  placeholder="Observaciones..."
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              {/* Payment Preview */}
              {formData.amount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Resumen</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Pago:</span>
                      <span className="font-semibold">
                        +${Number.parseFloat(formData.amount || "0").toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Saldo actual:</span>
                      <span className="text-red-600">-${Math.abs(selectedClient.currentBalance).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-green-200 pt-1">
                      <span className="text-green-700">Nuevo saldo:</span>
                      <span className="font-semibold">
                        -$
                        {(
                          Math.abs(selectedClient.currentBalance) - Number.parseFloat(formData.amount || "0")
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.amount}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{loading ? "Registrando..." : "Registrar Pago"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
