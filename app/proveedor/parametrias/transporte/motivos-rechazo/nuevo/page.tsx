"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertTriangle, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categorias = ["Cliente", "Dirección", "Pago", "Producto", "Horario", "Transporte", "Otro"]

export default function NuevoMotivoRechazoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre.trim() || !formData.categoria) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Simular guardado
    const nuevoMotivo = {
      id: Date.now(),
      ...formData,
      isActive: true,
      usos: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    console.log("Nuevo motivo de rechazo creado:", nuevoMotivo)
    alert("Motivo de rechazo creado correctamente")
    router.push("/proveedor/parametrias/transporte/motivos-rechazo")
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
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Motivo de Rechazo</h1>
          <p className="text-gray-600">Configura un nuevo motivo para rechazar entregas</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Información del Motivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del Motivo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                placeholder="Ej: Cliente ausente"
                required
              />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                placeholder="Describe el motivo de rechazo..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoría *</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
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
            Crear Motivo
          </Button>
        </div>
      </form>
    </div>
  )
}
