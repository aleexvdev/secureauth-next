"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona las preferencias de tu cuenta
        </p>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Seguridad de la Cuenta</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Gestiona la configuración de seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cambiar Contraseña</Label>
                  <p className="text-sm text-muted-foreground">
                    Actualiza tu contraseña regularmente para mayor seguridad
                  </p>
                </div>
                <Button variant="outline">Cambiar</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Autenticación de Dos Factores
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Añade una capa adicional de seguridad a tu cuenta
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dispositivos Conectados</Label>
                  <p className="text-sm text-muted-foreground">
                    Gestiona los dispositivos que tienen acceso a tu cuenta
                  </p>
                </div>
                <Button variant="outline">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Notificaciones</CardTitle>
            <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
                <span>Alertas de Seguridad</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recibe notificaciones sobre actividades sospechosas
                </span>
              </Label>
              <Switch id="security-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="login-alerts" className="flex flex-col space-y-1">
                <span>Alertas de Inicio de Sesión</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recibe notificaciones cuando se inicie sesión en tu cuenta
                </span>
              </Label>
              <Switch id="login-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                <span>Correos de Marketing</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recibe actualizaciones sobre nuevas funciones y ofertas
                </span>
              </Label>
              <Switch id="marketing-emails" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Privacidad</CardTitle>
            <CardDescription>Gestiona la configuración de privacidad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="activity-log" className="flex flex-col space-y-1">
                <span>Registro de Actividad</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Mantener un registro detallado de la actividad de tu cuenta
                </span>
              </Label>
              <Switch id="activity-log" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="data-sharing" className="flex flex-col space-y-1">
                <span>Compartir Datos de Uso</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Ayúdanos a mejorar compartiendo datos anónimos de uso
                </span>
              </Label>
              <Switch id="data-sharing" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Descargar Mis Datos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
