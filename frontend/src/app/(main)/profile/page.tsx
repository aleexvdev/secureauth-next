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
import { useLanguage } from "@/providers/LanguageProvider";
import { Calendar, Edit, User } from "lucide-react";

const ProfilePage = () => {

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
        <h1 className="text-3xl font-bold tracking-tight">{t("profile.title")}</h1>
        <p className="text-muted-foreground">{t("profile.manage_info")}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t("profile.your_profile")}</CardTitle>
            <CardDescription>{t("profile.basic_info")}</CardDescription>
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
              {t("profile.change_photo")}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{t("profile.member_since", { date: new Date().toLocaleDateString() })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{t("profile.last_login", { date: new Date().toLocaleDateString() })}</span>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t("profile.personal_info")}</CardTitle>
            <CardDescription>{t("profile.update_personal")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">{t("profile.first_name")}</Label>
                <Input id="first-name" defaultValue="Usuario" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">{t("profile.last_name")}</Label>
                <Input id="last-name" defaultValue="Example" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("profile.email")}</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("profile.phone")}</Label>
              <Input id="phone" type="tel" defaultValue="+51 900 000 000" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="address">{t("profile.address")}</Label>
              <Input id="address" defaultValue="Calle Ejemplo, 123" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">{t("profile.city")}</Label>
                <Input id="city" defaultValue="Lima" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t("profile.state")}</Label>
                <Input id="state" defaultValue="Huaura" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">{t("profile.postal_code")}</Label>
                <Input id="zip" defaultValue="28001" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t("profile.save_changes")}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
