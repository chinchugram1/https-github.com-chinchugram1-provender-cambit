"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, DollarSign, Calendar, CreditCard, Save } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

interface PaymentForm {
  amount: string
  paymentMethod: string
  paymentDate: string
  reference: string
  notes: string
}

export default function RegistrarPagoPage() {
  const params = useParams()
  const router = useRouter()
  const accountId = params.id as string

  const [formData, setFormData] = useState<PaymentForm>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular envío
    setTimeout(() => {
      setLoading(false)
      router.push(`/proveedor/cuenta-corriente/${accountId}`)
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
          href={`/proveedor/cuenta-corriente/${accountId}`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Pago</h1>
          <p className="text-gray-600">Super San Martín - Juan Carlos Pérez</p>
        </div>
      </div>

      {/* Current Account Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Saldo Actual</p>
              <p className="text-xl font-bold text-red-600">$45,000</p>
              <p className="text-sm text-gray-500">Debe</p>
            </div>
            <DollarSign className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deuda Vencida</p>
              <p className="text-xl font-bold text-yellow-600">$15,000</p>
            </div>
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Crédito Disponible</p>
              <p className="text-xl font-bold text-green-600">$55,000</p>
            </div>
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Datos del Pago</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Referencia / Número de Comprobante
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
              placeholder="Ej: TRF-001234, CHQ-5678, etc."
              value={formData.reference}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
              placeholder="Observaciones sobre el pago..."
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          {/* Payment Preview */}
          {formData.amount && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Resumen del Pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Monto a pagar:</span>
                  <span className="font-semibold text-blue-900">
                    ${Number.parseFloat(formData.amount || "0").toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Saldo actual:</span>
                  <span className="font-semibold text-red-600">-$45,000</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-2">
                  <span className="text-blue-700">Nuevo saldo:</span>
                  <span className="font-semibold text-blue-900">
                    -${(45000 - Number.parseFloat(formData.amount || "0")).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Link
              href={`/proveedor/cuenta-corriente/${accountId}`}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading || !formData.amount}
              className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{loading ? "Registrando..." : "Registrar Pago"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
