"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const slides = [
  {
    title: "Monitor Active Sessions 🔍",
    description:
      "Track all user sessions in real-time with detailed analytics and location data.",
    icon: <Users className="h-10 w-10 text-violet-200" />,
    features: [
      "Real-time monitoring",
      "Geolocation tracking",
      "Device fingerprinting",
    ],
    emoji: "🛡️",
  },
  {
    title: "Advanced Authentication 🔐",
    description:
      "Multi-factor authentication, biometrics, and passwordless login options for maximum security.",
    icon: <ShieldCheck className="h-10 w-10 text-violet-200" />,
    features: [
      "Biometric verification",
      "Hardware key support",
      "Time-based OTP",
    ],
    emoji: "🔒",
  },
  {
    title: "Comprehensive Audit Logs 📊",
    description:
      "Detailed logs of all authentication events and user activities for compliance and security.",
    icon: <CheckCircle className="h-10 w-10 text-violet-200" />,
    features: [
      "Tamper-proof records",
      "Compliance reporting",
      "Anomaly detection",
    ],
    emoji: "✅",
  },
];

export const PageInicio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden p-8 text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-indigo-800/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,0,255,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(60,0,255,0.25),transparent_40%)]" />
      </div>
      <div className="z-10 mb-5 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          SecureAuth Dashboard
        </h2>
        <p className="text-lg text-violet-100">
          Complete authentication and authorization solution
        </p>
      </div>

      <div className="z-10 w-full max-w-4xl">
        <div className="relative h-max overflow-hidden rounded-xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-sm">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentSlide
                  ? "opacity-100 relative z-10"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-violet-900/30 p-3">
                  {slide.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{slide.title}</h3>
                <p className="mb-4 text-violet-100">{slide.description}</p>
                <div className="mb-4 flex flex-wrap justify-center gap-3">
                  {slide.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center rounded-full bg-violet-800/30 px-3 py-1 text-sm"
                    >
                      <span className="mr-1">{slide.emoji}</span> {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[50px] w-full overflow-hidden rounded-b-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-violet-600/90 px-3 py-1 text-sm font-bold backdrop-blur-sm">
                  {index === 0
                    ? "⚡ 10x Faster Detection"
                    : index === 1
                    ? "🔥 99.99% Security Rating"
                    : "💯 100% Compliance Success"}
                </div>
                <div className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-violet-800 backdrop-blur-sm">
                  {index === 0
                    ? "🚀 Enterprise Ready"
                    : index === 1
                    ? "⭐ Top Rated Solution"
                    : "🏆 Award Winning"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="z-10 mt-8 flex items-center justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="z-10 mt-6 flex flex-col items-center gap-4">
        <Link href="/signup">
          <Button className="group bg-white text-violet-700 hover:bg-violet-100 mb-3">
            Start Free Trial Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <p className="text-center text-sm text-violet-200">
          🔥 <span className="font-bold">Limited Time Offer:</span> 30-day free
          trial with all premium features
        </p>
      </div>

      <div className="z-10 mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-violet-100">
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4" /> 99.9% Uptime ⚡
        </div>
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4" /> 2FA Authenticator 🔐
        </div>
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4" /> Email Verification 📧
        </div>
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4" /> 24/7 Support 🌎
        </div>
      </div>

      <div className="z-10 mt-6 flex items-center justify-center space-x-4">
        <div className="flex -space-x-2">
          {["👨", "👩", "👨", "👩"].map((emoji, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full border-2 border-violet-600 bg-violet-300 text-center text-xs font-bold leading-7 text-violet-800"
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-violet-100">
          Join 10,000+ security professionals using SecureAuth
        </p>
      </div>
    </div>
  );
};
