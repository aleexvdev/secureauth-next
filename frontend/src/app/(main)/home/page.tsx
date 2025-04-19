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
import { useLanguage } from "@/providers/LanguageProvider";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  Laptop,
  Shield,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  const { t } = useLanguage();
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
        <h1 className="text-3xl font-bold tracking-tight">
          {t("home.welcome", { name: user.name })}
        </h1>
        <p className="text-muted-foreground">{t("home.manage_security")}</p>
      </div>
      <Alert
        variant="destructive"
        className="bg-destructive/10 text-destructive border-destructive/20"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t("home.mfa_warning")}</AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span>{t("home.mfa_recommendation")}</span>
          <Button
            variant="destructive"
            size="sm"
            asChild
            className="sm:ml-auto whitespace-nowrap"
          >
            <Link href="/mfa">
              {t("home.activate_mfa")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("home.security_status")}
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">
                {t("home.improve_security_by_enabling_mfa")}
              </p>
            </div>
            <Progress value={65} className="mt-2" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/settings">{t("home.improve_security")}</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("home.active_sessions")}
            </CardTitle>
            <Laptop className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">
              {t("home.devices_connected", { count: 3 })}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/sessions">{t("common.manage")}</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("home.last_access")}
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("time.today")}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Lima, Perú - Chrome en Windows
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/sessions">{t("common.view")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t("home.recent_activity")}</CardTitle>
            <CardDescription>{t("home.last_activities")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("sessions.successful_login")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("time.today")}, 10:45 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("settings.password_updated")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("time.yesterday")}, 3:30 PM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-destructive/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("sessions.access_blocked")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("time.days_ago", { count: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              {t("home.view_history")}
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t("home.security_recommendations")}</CardTitle>
            <CardDescription>{t("home.improve_account")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-destructive/10 p-2 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t("home.enable_2fa")}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("home.add_security_layer")}
                  </p>
                  <Button variant="default" size="sm" className="mt-2" asChild>
                    <Link href="/mfa">{t("home.activate_mfa")}</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-500/10 p-2 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("home.update_password")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("home.password_age")}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/settings">{t("home.change_password")}</Link>
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
