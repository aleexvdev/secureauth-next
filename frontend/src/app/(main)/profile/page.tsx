"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, Edit, User } from "lucide-react";

const ProfilePage = () => {

  const user = {
    name: "Alexander Valverde",
    email: "alex@example.com",
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userPreferences: {
      enable2FA: true,
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y preferencias
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Tu Perfil</CardTitle>
            <CardDescription>Información básica de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="rounded-full bg-muted text-primary text-4xl font-semibold">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-medium">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Cambiar foto
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Miembro desde Enero 2023</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Último acceso: Hoy, 10:45 AM</span>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información personal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input id="first-name" defaultValue="Usuario" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Apellido</Label>
                <Input id="last-name" defaultValue="Ejemplo" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" defaultValue="usuario@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" defaultValue="+51 900 000 000" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" defaultValue="Calle Ejemplo, 123" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" defaultValue="Lima" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Provincia</Label>
                <Input id="state" defaultValue="Huaura" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" defaultValue="28001" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Guardar Cambios</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
