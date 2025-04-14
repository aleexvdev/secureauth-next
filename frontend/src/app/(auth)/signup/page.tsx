"use client";

import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader,
  Lock,
  Mail,
  MailCheckIcon,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerMutationFn } from "@/service/api";
import { useMutation } from "@tanstack/react-query";
import { Logo } from "@/components/logo/logo";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      username: z.string().max(20).trim().min(3, {
        message: "Username is required",
      }),
      email: z.string().trim().email().min(5, {
        message: "Email is required",
      }),
      password: z.string().trim().max(20).min(6, {
        message: "Password is required",
      }),
      confirmPassword: z.string().max(20).min(6, {
        message: "Confirm Password is required",
      }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        setIsSubmitted(false);
      },
    });
  };

  return (
    <section className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <h1 className="text-3xl font-bold tracking-tight text-violet-700">
            SecureAuth
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Your complete authentication solution
        </p>
      </div>
      {!isSubmitted ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your information to get started
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              aria-label="Sign up form"
            >
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="username"
                        className="text-foreground dark:text-[#f1f7feb5] text-sm"
                      >
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="email"
                        className="text-foreground dark:text-[#f1f7feb5] text-sm"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10"
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
                      <FormLabel
                        htmlFor="password"
                        className="text-foreground dark:text-[#f1f7feb5] text-sm"
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••••••"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="confirmPassword"
                        className="text-foreground dark:text-[#f1f7feb5] text-sm"
                      >
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••••••"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10"
                          />
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
                    Creating account
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground font-medium">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Button
              variant="outline"
              className="w-full h-[40px]"
              title="Sign in with Google"
            >
              <img src="./google.svg" alt="google" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-[40px]"
              title="Sign in with Facebook"
            >
              <img src="./facebook.svg" alt="facebook" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-[40px]"
              title="Sign in with Apple"
            >
              <img src="./apple.svg" alt="apple" />
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce text-violet-700" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-medium">
            We just sent a verification link to <span className="font-semibold">{form.getValues().email}</span>.
          </p>
          <Link href="/">
            <Button className="h-[40px] mt-2">
              <span className="text-sm font-medium">Go to login</span>
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
