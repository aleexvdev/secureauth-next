"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Grid3X3, Layout, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/providers/ThemeProvider";
import { useLanguage } from "@/providers/LanguageProvider";

const ACCENT_COLORS = [
  { name: "Emerald", value: "emerald", class: "bg-emerald-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
  { name: "Rose", value: "rose", class: "bg-rose-500" },
  { name: "Amber", value: "amber", class: "bg-amber-500" },
];

const AppearancePage = () => {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState("default");
  const [fontScale, setFontScale] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState("left");
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.style.fontSize = `${fontScale}%`;
    }
  }, [fontScale, mounted]);

  useEffect(() => {
    if (mounted) {
      if (reducedMotion) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    }
  }, [reducedMotion, mounted]);

  useEffect(() => {
    if (mounted) {
      if (highContrast) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    }
  }, [highContrast, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("appearance.title")}
        </h1>
        <p className="text-muted-foreground">{t("appearance.customize")}</p>
      </div>

      <Tabs defaultValue="theme">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">{t("appearance.theme")}</TabsTrigger>
          <TabsTrigger value="layout">{t("appearance.layout")}</TabsTrigger>
          <TabsTrigger value="accessibility">
            {t("appearance.accessibility")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="space-y-4 pt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">{t("appearance.theme")}</CardTitle>
              <CardDescription>
                {t("appearance.customize_theme")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={theme}
                onValueChange={(value) =>
                  setTheme(value as "light" | "dark" | "system")
                }
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="light"
                    id="theme-light"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    {t("appearance.light")}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="dark"
                    id="theme-dark"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    {t("appearance.dark")}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="system"
                    id="theme-system"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="theme-system"
                    className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Monitor className="mb-3 h-6 w-6" />
                    {t("appearance.system")}
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {t("appearance.system_adapt")}
              </p>
            </CardFooter>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">
                {t("appearance.accent_color")}
              </CardTitle>
              <CardDescription>
                {t("appearance.customize_color")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    className={cn(
                      "relative flex h-10 w-full items-center justify-center rounded-md transition-all",
                      color.class,
                      accentColor === color.value &&
                        "ring-2 ring-offset-2 ring-offset-background"
                    )}
                    onClick={() => setAccentColor(color.value)}
                    title={color.name}
                  >
                    {accentColor === color.value && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {t("appearance.selected_color")}:{" "}
                  {ACCENT_COLORS.find((c) => c.value === accentColor)?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAccentColor("emerald")}
                >
                  {t("common.reset")}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="preview-button">{t("appearance.preview")}</Label>
                  <Button id="preview-button">{t("appearance.button_example")}</Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="preview-progress">{t("appearance.progress_bar")}</Label>
                  <div className="w-1/2">
                    <Slider
                      id="preview-progress"
                      defaultValue={[66]}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 pt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">{t("appearance.layout")}</CardTitle>
              <CardDescription>{t("appearance.customize_layout")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={layout}
                onValueChange={setLayout}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="default"
                    id="layout-default"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="layout-default"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Layout className="mb-3 h-6 w-6" />
                    {t("appearance.standard")}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="compact"
                    id="layout-compact"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="layout-compact"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Grid3X3 className="mb-3 h-6 w-6" />
                    {t("appearance.compact")}
                  </Label>
                </div>
              </RadioGroup>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sidebar-position">
                  {t("appearance.sidebar_position")}
                </Label>
                <Select
                  value={sidebarPosition}
                  onValueChange={setSidebarPosition}
                >
                  <SelectTrigger id="sidebar-position">
                    <SelectValue placeholder="Selecciona una posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">{t("appearance.left")}</SelectItem>
                    <SelectItem value="right">{t("appearance.right")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="content-width">{t("appearance.content_width")}</Label>
                <Select defaultValue="container">
                  <SelectTrigger id="content-width">
                    <SelectValue placeholder={t("appearance.select_width")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="container">
                      {t("appearance.container")}
                    </SelectItem>
                    <SelectItem value="full">{t("appearance.full_width")}</SelectItem>
                    <SelectItem value="narrow">{t("appearance.narrow")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("appearance.apply_layout")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4 pt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">{t("appearance.accessibility")}</CardTitle>
              <CardDescription>{t("appearance.adjust_settings")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="font-scale">
                  {t("appearance.font_size")} ({fontScale}%)
                </Label>
                <Slider
                  id="font-scale"
                  min={75}
                  max={150}
                  step={5}
                  value={[fontScale]}
                  onValueChange={(value) => setFontScale(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("appearance.small")}</span>
                  <span>{t("appearance.normal")}</span>
                  <span>{t("appearance.large")}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">{t("appearance.high_contrast")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("appearance.increase_contrast")}
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">{t("appearance.reduced_motion")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("appearance.reduce_animations")}
                  </p>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setFontScale(100);
                  setReducedMotion(false);
                  setHighContrast(false);
                }}
              >
                {t("appearance.reset_accessibility")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppearancePage;
