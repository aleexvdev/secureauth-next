"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Laptop, Lock, QrCode, Shield } from "lucide-react";

const MfaPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Seguridad MFA</h1>
        <p className="text-muted-foreground">
          Configura la autenticación de dos factores para proteger tu cuenta
        </p>
      </div>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Seguridad MFA no activada</AlertTitle>
        <AlertDescription>
          Tu cuenta es vulnerable a accesos no autorizados. Recomendamos activar la autenticación de dos factores.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>¿Qué es la Autenticación Multifactor?</CardTitle>
          <CardDescription>
            La autenticación multifactor (MFA) es un método de seguridad que requiere más de un tipo de verificación para acceder a tu cuenta. Esto significa que incluso si alguien obtiene tu contraseña, no podrá acceder a tu cuenta sin el segundo factor de autenticación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Mayor Seguridad</h3>
              <p className="text-sm text-muted-foreground">
                Protege tu cuenta con una capa adicional de seguridad más allá de tu contraseña
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Prevención de Accesos</h3>
              <p className="text-sm text-muted-foreground">
                Evita accesos no autorizados incluso si tu contraseña es comprometida
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h3 className="text-lg font-medium">Seguridad Mínima</h3>
              <p className="text-sm text-muted-foreground">
                Asegura que solo tú puedes acceder a tu cuenta
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="app">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">Aplicación Autenticadora</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Aplicación Autenticadora</CardTitle>
              <CardDescription>
                Usa una aplicación como Google Authenticator, Microsoft Authenticator o Authy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <QrCode className="h-32 w-32 mx-auto" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Escanea este código QR con tu aplicación autenticadora o introduce el código manualmente
                </p>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 w-full max-w-xs">
                  <code className="text-sm font-mono">ABCD EFGH IJKL MNOP</code>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                    <span className="sr-only">Copiar código</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de Verificación</Label>
                <div className="flex gap-2">
                  <Input id="verification-code" placeholder="Ingresa el código de 6 dígitos" />
                  <Button>Verificar</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ingresa el código de 6 dígitos generado por tu aplicación autenticadora
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Autenticación por SMS</CardTitle>
              <CardDescription>Recibe códigos de verificación por mensaje de texto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Número de Teléfono</Label>
                <div className="flex gap-2">
                  <Input id="phone-number" placeholder="+34 600 000 000" />
                  <Button>Enviar Código</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ingresa tu número de teléfono para recibir códigos de verificación
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sms-code">Código de Verificación</Label>
                <div className="flex gap-2">
                  <Input id="sms-code" placeholder="Ingresa el código de 6 dígitos" />
                  <Button>Verificar</Button>
                </div>
                <p className="text-xs text-muted-foreground">Ingresa el código de 6 dígitos enviado a tu teléfono</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Códigos de Respaldo</CardTitle>
          <CardDescription>
            Guarda estos códigos en un lugar seguro para acceder a tu cuenta si pierdes tu dispositivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <code key={i} className="rounded-md border bg-muted p-2 text-center font-mono text-sm">
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </code>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Descargar Códigos</Button>
          <Button variant="outline">Generar Nuevos Códigos</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispositivos de Confianza</CardTitle>
          <CardDescription>Gestiona los dispositivos que no requieren verificación de dos factores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Laptop className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Windows PC (Chrome)</h3>
                  <p className="text-sm text-muted-foreground">Añadido: Hoy, 10:45 AM</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Añadir Este Dispositivo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MfaPage;