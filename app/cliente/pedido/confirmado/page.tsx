"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Calendar, MapPin, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function PedidoConfirmadoPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect después de 10 segundos
    const timer = setTimeout(() => {
      router.push("/cliente/dashboard")
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animación de éxito */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-600">Tu pedido ha sido recibido y está siendo procesado</p>
        </div>

        {/* Información del Pedido */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pedido #PED-2024-001</h2>
            <p className="text-sm text-gray-600">Generado el {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-provender-primary" />
              <div>
                <p className="font-medium text-gray-900">Fecha de Entrega</p>
                <p className="text-sm text-gray-600">Mañana - Entre 8:00 y 12:00</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-provender-primary" />
              <div>
                <p className="font-medium text-gray-900">Estado del Pedido</p>
                <p className="text-sm text-provender-primary font-medium">En Preparación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos Pasos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">¿Qué sigue?</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Procesaremos tu pedido en los próximos minutos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Te notificaremos cuando esté en camino</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Podrás seguir la entrega en tiempo real</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <Link
            href="/cliente/pedidos/en-camino"
            className="w-full bg-provender-primary text-white py-3 rounded-lg font-semibold hover:bg-provender-accent transition-colors flex items-center justify-center"
          >
            Seguir mi Pedido
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>

          <Link
            href="/cliente/dashboard"
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Link>

          <Link
            href="/cliente/pedido/nuevo"
            className="w-full text-provender-primary py-2 rounded-lg font-medium hover:bg-provender-primary hover:text-white transition-colors text-center block"
          >
            Hacer Otro Pedido
          </Link>
        </div>

        {/* Auto-redirect notice */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Serás redirigido automáticamente al inicio en unos segundos
        </p>
      </div>
    </div>
  )
}
