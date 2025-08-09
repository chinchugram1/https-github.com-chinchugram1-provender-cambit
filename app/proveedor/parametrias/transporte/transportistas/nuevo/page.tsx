"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const zonas = ["Centro", "Norte", "Sur", "Este", "Oeste"]
const tiposVehiculo = ["Camión", "Furgón", "Camioneta", "Moto"]

export default function NuevoTransportistaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    vehiculo: "",
    patente: "",
    zona: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre.trim() || !formData.telefono || !formData.vehiculo || !formData.zona) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Simular guardado
    const nuevoTransportista = {
      id: Date.now(),
      ...formData,
      isActive: true,
      entregas: 0,
      rating: 5.0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    console.log("Nuevo transportista creado:", nuevoTransportista)
    alert("Transportista creado correctamente")
    router.push("/proveedor/parametrias/transporte/transportistas")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Transportista</h1>
          <p className="text-gray-600">Registra un nuevo transportista o empresa de transporte</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Información del Transportista
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Carlos Mendez"
                  required
                />
              </div>
              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData((prev) => ({ ...prev, empresa: e.target.value }))}
                  placeholder="Ej: Transportes Rápidos SA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                  placeholder="+54 11 1234-5678"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehiculo">Tipo de Vehículo *</Label>
                <Select
                  value={formData.vehiculo}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, vehiculo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposVehiculo.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="patente">Patente</Label>
                <Input
                  id="patente"
                  value={formData.patente}
                  onChange={(e) => setFormData((prev) => ({ ...prev, patente: e.target.value }))}
                  placeholder="ABC123"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="zona">Zona de Trabajo *</Label>
              <Select
                value={formData.zona}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, zona: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {zonas.map((zona) => (
                    <SelectItem key={zona} value={zona}>
                      {zona}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-provender-primary hover:bg-provender-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Crear Transportista
          </Button>
        </div>
      </form>
    </div>
  )
}
