"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, TrendingUp, Clock, Star, ArrowRight, Bell } from "lucide-react"

export default function ClienteDashboard() {
  const stats = [
    {
      title: "Pedidos Este Mes",
      value: "12",
      change: "+2 vs mes anterior",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Total Gastado",
      value: "$45,230",
      change: "+15% vs mes anterior",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Productos Favoritos",
      value: "8",
      change: "En tu lista",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Próxima Entrega",
      value: "Mañana",
      change: "10:00 - 12:00",
      icon: Clock,
      color: "text-purple-600",
    },
  ]

  const recentOrders = [
    {
      id: "PED-001",
      fecha: "2024-01-15",
      total: 2850,
      estado: "Entregado",
      items: 8,
    },
    {
      id: "PED-002",
      fecha: "2024-01-12",
      total: 1920,
      estado: "En camino",
      items: 5,
    },
    {
      id: "PED-003",
      fecha: "2024-01-10",
      total: 3450,
      estado: "Entregado",
      items: 12,
    },
  ]

  const promotions = [
    {
      title: "20% OFF en Bebidas",
      description: "Válido hasta el 31/01",
      code: "BEBIDAS20",
    },
    {
      title: "Envío Gratis",
      description: "En compras mayores a $5000",
      code: "ENVIOGRATIS",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">¡Hola, Juan! 👋</h1>
          <p className="text-gray-600">Bienvenido a tu panel de cliente</p>
        </div>
        <Button className="bg-[#0492C2] hover:bg-[#0492C2]/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pedidos Recientes
            </CardTitle>
            <CardDescription>Tus últimos pedidos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.items} productos</p>
                    <p className="text-xs text-gray-500">{order.fecha}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toLocaleString()}</p>
                    <Badge
                      variant={order.estado === "Entregado" ? "default" : "secondary"}
                      className={
                        order.estado === "Entregado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {order.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver Todos los Pedidos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Promotions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Promociones Activas
            </CardTitle>
            <CardDescription>Aprovecha estas ofertas especiales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {promotions.map((promo, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                  <h3 className="font-semibold text-[#0492C2]">{promo.title}</h3>
                  <p className="text-sm text-gray-600">{promo.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="font-mono">
                      {promo.code}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Usar Código
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver Todas las Promociones
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <ShoppingCart className="h-6 w-6 mb-2" />
              Nuevo Pedido
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              Mis Pedidos
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Star className="h-6 w-6 mb-2" />
              Favoritos
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Bell className="h-6 w-6 mb-2" />
              Notificaciones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
