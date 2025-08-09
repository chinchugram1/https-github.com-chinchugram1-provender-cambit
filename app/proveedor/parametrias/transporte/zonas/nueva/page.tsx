"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NuevaZonaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cobertura: "",
    tiempoEntrega: "",
    costo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre.trim() || !formData.tiempoEntrega || !formData.costo) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Simular guardado
    const nuevaZona = {
      id: Date.now(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      cobertura: formData.cobertura
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      tiempoEntrega: formData.tiempoEntrega,
      costo: Number(formData.costo),
      isActive: true,
      clientCount: 0,
      deliveryCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    console.log("Nueva zona creada:", nuevaZona)
    alert("Zona creada correctamente")
    router.push("/proveedor/parametrias/transporte/zonas")
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
          <h1 className="text-2xl font-bold text-gray-900">Nueva Zona de Entrega</h1>
          <p className="text-gray-600">Configura una nueva zona de cobertura</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Información de la Zona
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre de la Zona *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                placeholder="Ej: Centro"
                required
              />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                placeholder="Describe la zona de cobertura..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="cobertura">Áreas de Cobertura</Label>
              <Input
                id="cobertura"
                value={formData.cobertura}
                onChange={(e) => setFormData((prev) => ({ ...prev, cobertura: e.target.value }))}
                placeholder="Ej: Microcentro, San Nicolás, Monserrat"
              />
              <p className="text-xs text-gray-500 mt-1">Separar con comas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tiempoEntrega">Tiempo de Entrega *</Label>
                <Input
                  id="tiempoEntrega"
                  value={formData.tiempoEntrega}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tiempoEntrega: e.target.value }))}
                  placeholder="Ej: 2-4 horas"
                  required
                />
              </div>
              <div>
                <Label htmlFor="costo">Costo de Envío *</Label>
                <Input
                  id="costo"
                  type="number"
                  value={formData.costo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, costo: e.target.value }))}
                  placeholder="500"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-provender-primary hover:bg-provender-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Crear Zona
          </Button>
        </div>
      </form>
    </div>
  )
}
