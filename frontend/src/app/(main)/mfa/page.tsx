"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";
import { AlertTriangle, Laptop, Lock, QrCode, Shield } from "lucide-react";

const MfaPage = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("mfa.title")}</h1>
        <p className="text-muted-foreground">
          {t("mfa.configure_2fa")}
        </p>
      </div>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t("mfa.mfa_not_activated")}</AlertTitle>
        <AlertDescription>{t("mfa.account_vulnerable")}</AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>{t("mfa.what_is_2fa")}</CardTitle>
          <CardDescription>{t("mfa.2fa_adds_layer")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">{t("mfa.greater_security")}</h3>
              <p className="text-sm text-muted-foreground">{t("mfa.protect_account")}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">{t("mfa.prevent_access")}</h3>
              <p className="text-sm text-muted-foreground">{t("mfa.prevent_unauthorized")}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h3 className="text-lg font-medium">{t("mfa.secure_min")}</h3>
              <p className="text-sm text-muted-foreground">{t("mfa.secure_min_message")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="app">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">{t("mfa.authenticator_app")}</TabsTrigger>
          <TabsTrigger value="sms">{t("mfa.configure_sms")}</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("mfa.configure_app")}</CardTitle>
              <CardDescription>{t("mfa.use_app")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <QrCode className="h-32 w-32 mx-auto" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {t("mfa.scan_qr")}
                </p>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 w-full max-w-xs">
                  <code className="text-sm font-mono">ABCD EFGH IJKL MNOP</code>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                    <span className="sr-only">{t("mfa.copy_code")}</span>
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
                <Label htmlFor="verification-code">{t("mfa.verification_code")}</Label>
                <div className="flex gap-2">
                  <Input id="verification-code" placeholder={t("mfa.enter_6_digit")} />
                  <Button>{t("mfa.verify")}</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("mfa.enter_6_digit")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("mfa.configure_sms")}</CardTitle>
              <CardDescription>{t("mfa.receive_codes")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">{t("mfa.phone_number")}</Label>
                <div className="flex gap-2">
                  <Input id="phone-number" placeholder="+34 600 000 000" />
                  <Button>{t("mfa.send_code")}</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("mfa.enter_phone")}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sms-code">{t("mfa.verification_code")}</Label>
                <div className="flex gap-2">
                  <Input id="sms-code" placeholder={t("mfa.enter_sms_code")} />
                  <Button>{t("mfa.verify")}</Button>
                </div>
                <p className="text-xs text-muted-foreground">{t("mfa.enter_sms_code")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t("mfa.backup_codes")}</CardTitle>
          <CardDescription>{t("mfa.save_codes")}</CardDescription>
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
          <Button variant="outline">{t("mfa.download_codes")}</Button>
          <Button variant="outline">{t("mfa.generate_new")}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("mfa.trusted_devices")}</CardTitle>
          <CardDescription>{t("mfa.manage_trusted")}</CardDescription>
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
                  <p className="text-sm text-muted-foreground">{t("common.added")}: {t("time.today")}, 10:45 AM</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {t("common.delete")}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {t("mfa.add_device")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MfaPage;