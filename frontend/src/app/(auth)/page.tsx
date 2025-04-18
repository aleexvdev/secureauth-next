"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginMutationFn } from "@/service/api";
import { Logo } from "@/components/logo/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, EyeIcon, EyeOffIcon, Loader, Lock, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.data.mfaRequired) {
          router.replace(`/verify-mfa?email=${values.email}`);
          return;
        }
        router.replace(`/home`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Logo className="bg-violet-700 text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-violet-700">
            SecureAuth
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Your complete authentication solution
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black">Sign in</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Login form">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="text-black text-sm"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          autoComplete="off"
                          aria-required="true"
                          className="pl-10 text-black border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:outline-none"
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel
                        htmlFor="password"
                        className="text-black text-sm"
                      >
                        Password
                      </FormLabel>
                      <Link
                        href={`/forgot-password?email=${form.getValues().email}`}
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                          autoComplete="off"
                          aria-required="true"
                          className="text-black pl-10 border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-200"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-semibold transition duration-200"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" />
                  <span className="text-sm">Signing in</span>
                </>
              ) : (
                <>
                  <span className="text-sm">Sign in</span>
                  <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-violet-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground font-medium">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            variant="outline"
            className="w-full h-[40px] bg-white hover:bg-violet-50 border-violet-200"
            title="Sign in with Google"
          >
            <img src="./google.svg" alt="google" />
          </Button>
          <Button
            variant="outline"
            className="w-full h-[40px] bg-white hover:bg-violet-50 border-violet-200"
            title="Sign in with Facebook"
          >
            <img src="./facebook.svg" alt="facebook" />
          </Button>
          <Button
            variant="outline"
            className="w-full h-[40px] bg-white hover:bg-violet-50 border-violet-200"
            title="Sign in with Apple"
          >
            <img src="./apple.svg" alt="apple" />
          </Button>
        </div>
        <div className="text-center text-sm text-black">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-violet-600 hover:text-violet-700"
          >
            Sign up
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center text-black">
          <p className="text-xs font-normal mt-4">
            By signing up, you agree to our{" "}
            <a className="text-violet-600 hover:underline font-medium" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-violet-600 hover:underline font-medium" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
