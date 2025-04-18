"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ArrowRight, CheckCircle, Clock, Laptop, Shield } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Bienvenido, Alexander
        </h1>
        <p className="text-muted-foreground">
          Gestiona la seguridad y las sesiones de tu cuenta
        </p>
      </div>
      <Alert
        variant="destructive"
        className="bg-destructive/10 text-destructive border-destructive/20"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Seguridad MFA no activada</AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span>
            Recomendamos activar la autenticación de dos factores para mejorar
            la seguridad de tu cuenta.
          </span>
          <Button
            variant="destructive"
            size="sm"
            asChild
            className="sm:ml-auto whitespace-nowrap"
          >
            <Link href="/mfa">
              Activar MFA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estado de Seguridad
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">
                Mejora tu seguridad activando MFA
              </p>
            </div>
            <Progress value={65} className="mt-2" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/settings">Mejorar Seguridad</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sesiones Activas
            </CardTitle>
            <Laptop className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">
              3 dispositivos conectados actualmente
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/sessions">Gestionar Sesiones</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Acceso</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hoy</div>
            <p className="text-xs text-muted-foreground mt-2">
              Madrid, España - Chrome en Windows
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/sessions">Ver Detalles</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas actividades en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Inicio de sesión exitoso
                  </p>
                  <p className="text-xs text-muted-foreground">Hoy, 10:45 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Contraseña actualizada</p>
                  <p className="text-xs text-muted-foreground">Ayer, 3:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-destructive/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Intento de acceso bloqueado
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hace 2 días, 8:15 PM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Ver todo el historial
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recomendaciones de Seguridad</CardTitle>
            <CardDescription>Mejora la seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-destructive/10 p-2 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Activa la autenticación de dos factores
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Añade una capa adicional de seguridad a tu cuenta
                  </p>
                  <Button variant="default" size="sm" className="mt-2" asChild>
                    <Link href="/mfa">Activar MFA</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-500/10 p-2 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Actualiza tu contraseña</p>
                  <p className="text-xs text-muted-foreground">
                    Tu contraseña no se ha cambiado en los últimos 90 días
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/settings">Cambiar Contraseña</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
