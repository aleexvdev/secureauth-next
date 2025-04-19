"use client";

import { Laptop, Smartphone, Clock, MapPin, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/providers/LanguageProvider";

const sessions = [
  {
    id: 1,
    device: "Windows PC",
    browser: "Chrome",
    location: "Lima, Perú",
    ip: "192.168.1.1",
    lastActive: "Activo ahora",
    isCurrentDevice: true,
    icon: Laptop,
  },
  {
    id: 2,
    device: "iPhone 13",
    browser: "Safari",
    location: "Lima, Perú",
    ip: "192.168.1.2",
    lastActive: "Hace 2 horas",
    isCurrentDevice: false,
    icon: Smartphone,
  },
  {
    id: 3,
    device: "MacBook Pro",
    browser: "Firefox",
    location: "Lima, Perú",
    ip: "192.168.1.3",
    lastActive: "Hace 5 días",
    isCurrentDevice: false,
    icon: Laptop,
  },
];

const SessionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("sessions.title")}
        </h1>
        <p className="text-muted-foreground">{t("sessions.manage_sessions")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {t("sessions.active_sessions")}
          </CardTitle>
          <CardDescription>{t("sessions.devices_logged_in")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sessions.map((session) => (
              <div key={session.id} className="flex flex-col space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <session.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{session.device}</h3>
                        {session.isCurrentDevice && (
                          <Badge variant="outline" className="text-xs">
                            {t("sessions.this_device")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.browser}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={session.isCurrentDevice}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("sessions.logout")}
                  </Button>
                </div>
                <div className="ml-10 grid gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{session.lastActive}</span>
                  </div>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">{t("sessions.refresh")}</Button>
          <Button variant="destructive">{t("sessions.logout_all")}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {t("sessions.login_history")}
          </CardTitle>
          <CardDescription>{t("sessions.recent_logins")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("sessions.date_time")}</TableHead>
                <TableHead>{t("sessions.device")}</TableHead>
                <TableHead>{t("sessions.location")}</TableHead>
                <TableHead>{t("sessions.ip_address")}</TableHead>
                <TableHead>{t("sessions.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Hoy, 10:45 AM</TableCell>
                <TableCell>Windows PC (Chrome)</TableCell>
                <TableCell>Madrid, España</TableCell>
                <TableCell>192.168.1.1</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {t("sessions.successful")}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ayer, 8:30 PM</TableCell>
                <TableCell>iPhone 13 (Safari)</TableCell>
                <TableCell>Barcelona, España</TableCell>
                <TableCell>192.168.1.2</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {t("sessions.successful")}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hace 2 días, 3:15 PM</TableCell>
                <TableCell>Desconocido (Firefox)</TableCell>
                <TableCell>Lisboa, Portugal</TableCell>
                <TableCell>192.168.1.4</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    {t("sessions.blocked")}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hace 3 días, 9:20 AM</TableCell>
                <TableCell>MacBook Pro (Firefox)</TableCell>
                <TableCell>Valencia, España</TableCell>
                <TableCell>192.168.1.3</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {t("sessions.successful")}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {t("sessions.view_full_history")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SessionsPage;
