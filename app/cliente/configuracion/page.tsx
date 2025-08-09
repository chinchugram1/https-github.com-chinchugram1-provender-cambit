"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, CreditCard } from "lucide-react"

export default function ConfiguracionPage() {
  const [profile, setProfile] = useState({
    nombre: "Juan Pérez",
    email: "juan@kiosco.com",
    telefono: "+54 11 1234-5678",
    direccion: "Av. Corrientes 1234, CABA",
    descripcion: "Kiosco familiar en el barrio de San Telmo",
  })

  const [notifications, setNotifications] = useState({
    pedidos: true,
    promociones: true,
    stock: false,
    email: true,
    sms: false,
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Facturación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    value={profile.nombre}
                    onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={profile.telefono}
                    onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={profile.direccion}
                    onChange={(e) => setProfile({ ...profile, direccion: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del Negocio</Label>
                <Textarea
                  id="descripcion"
                  value={profile.descripcion}
                  onChange={(e) => setProfile({ ...profile, descripcion: e.target.value })}
                  rows={3}
                />
              </div>
              <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tipos de Notificaciones</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pedidos">Actualizaciones de Pedidos</Label>
                      <p className="text-sm text-gray-600">Recibe notificaciones sobre el estado de tus pedidos</p>
                    </div>
                    <Switch
                      id="pedidos"
                      checked={notifications.pedidos}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pedidos: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promociones">Promociones y Ofertas</Label>
                      <p className="text-sm text-gray-600">Recibe información sobre descuentos y ofertas especiales</p>
                    </div>
                    <Switch
                      id="promociones"
                      checked={notifications.promociones}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promociones: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="stock">Alertas de Stock</Label>
                      <p className="text-sm text-gray-600">Notificaciones cuando productos estén por agotarse</p>
                    </div>
                    <Switch
                      id="stock"
                      checked={notifications.stock}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, stock: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Canales de Notificación</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email</Label>
                      <p className="text-sm text-gray-600">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS</Label>
                      <p className="text-sm text-gray-600">Recibir notificaciones por mensaje de texto</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">Guardar Preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Gestiona tu contraseña y configuraciones de seguridad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña Actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">Cambiar Contraseña</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Información de Facturación</CardTitle>
              <CardDescription>Gestiona tu información de facturación y métodos de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razon-social">Razón Social</Label>
                  <Input id="razon-social" placeholder="Nombre de la empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuit">CUIT</Label>
                  <Input id="cuit" placeholder="XX-XXXXXXXX-X" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion-fiscal">Dirección Fiscal</Label>
                  <Input id="direccion-fiscal" placeholder="Dirección completa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condicion-iva">Condición IVA</Label>
                  <Input id="condicion-iva" placeholder="Responsable Inscripto" />
                </div>
              </div>
              <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">Actualizar Información</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
