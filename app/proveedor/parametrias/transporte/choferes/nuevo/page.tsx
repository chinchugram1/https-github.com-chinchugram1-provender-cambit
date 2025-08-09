"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tiposLicencia = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"]
const transportistas = ["Transportes Rápidos SA", "Logística Norte", "Distribuciones Sur", "Express Oeste"]

export default function NuevoChoferPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    licencia: "",
    vencimientoLicencia: "",
    transportista: "",
    vehiculoAsignado: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.nombre.trim() ||
      !formData.apellido.trim() ||
      !formData.dni ||
      !formData.telefono ||
      !formData.licencia ||
      !formData.vencimientoLicencia
    ) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Simular guardado
    const nuevoChofer = {
      id: Date.now(),
      ...formData,
      isActive: true,
      entregas: 0,
      rating: 5.0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    console.log("Nuevo chofer creado:", nuevoChofer)
    alert("Chofer creado correctamente")
    router.push("/proveedor/parametrias/transporte/choferes")
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
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Chofer</h1>
          <p className="text-gray-600">Registra un nuevo conductor</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Información del Chofer
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
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData((prev) => ({ ...prev, apellido: e.target.value }))}
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dni">DNI *</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => setFormData((prev) => ({ ...prev, dni: e.target.value }))}
                placeholder="12345678"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                  placeholder="+54 11 1111-1111"
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
                <Label htmlFor="licencia">Tipo de Licencia *</Label>
                <Select
                  value={formData.licencia}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, licencia: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar licencia" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposLicencia.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vencimientoLicencia">Vencimiento de Licencia *</Label>
                <Input
                  id="vencimientoLicencia"
                  type="date"
                  value={formData.vencimientoLicencia}
                  onChange={(e) => setFormData((prev) => ({ ...prev, vencimientoLicencia: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="transportista">Transportista</Label>
              <Select
                value={formData.transportista}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, transportista: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar transportista" />
                </SelectTrigger>
                <SelectContent>
                  {transportistas.map((transportista) => (
                    <SelectItem key={transportista} value={transportista}>
                      {transportista}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vehiculoAsignado">Vehículo Asignado</Label>
              <Input
                id="vehiculoAsignado"
                value={formData.vehiculoAsignado}
                onChange={(e) => setFormData((prev) => ({ ...prev, vehiculoAsignado: e.target.value }))}
                placeholder="Camión ABC123"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-provender-primary hover:bg-provender-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Crear Chofer
          </Button>
        </div>
      </form>
    </div>
  )
}
