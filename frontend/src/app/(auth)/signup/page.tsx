"use client";

import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  EyeIcon,
  EyeOffIcon,
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

type ShowPassword = {
  showPassword: boolean;
  showConfirmPassword: boolean;
};

const initialStatePassword: ShowPassword = {
  showPassword: false,
  showConfirmPassword: false,
};

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useState<ShowPassword>(initialStatePassword);

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
          <Logo className="bg-violet-700 text-white" />
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
            <h2 className="text-2xl font-semibold tracking-tight text-black">
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
                        className="text-black text-sm"
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
                            className="pl-10 text-black border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:outline-none"
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
                      <FormLabel htmlFor="email" className="text-black text-sm">
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
                            className="pl-10 text-black border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:outline-none"
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
                        className="text-black text-sm"
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type={passwordState.showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10 text-black border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                            onClick={() => setPasswordState((prevState) => ({
                              ...prevState,
                              showPassword: !prevState.showPassword,
                            }))}
                          >
                            {
                              passwordState.showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )
                            }
                          </button>
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
                        className="text-black text-sm"
                      >
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={passwordState.showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            {...field}
                            autoComplete="off"
                            aria-required="true"
                            required
                            className="pl-10 text-black border-violet-200 focus:border-violet-200 focus:ring-violet-200 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                            onClick={() => setPasswordState((prevState) => ({
                              ...prevState,
                              showConfirmPassword: !prevState.showConfirmPassword,
                            }))}
                          >
                          {
                            passwordState.showConfirmPassword ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )
                          }
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
              <Separator className="w-full bg-violet-300" />
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
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Sign in
            </Link>
          </div>
          <div className="flex gap-2 items-center justify-center text-black">
            <p className="text-xs font-normal mt-4">
              By signing up, you agree to our{" "}
              <a
                className="text-violet-600 hover:underline font-medium"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="text-violet-600 hover:underline font-medium"
                href="#"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon
              size="48px"
              className="animate-bounce text-violet-700"
            />
          </div>
          <h2 className="text-xl tracking-[-0.16px] text-black font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground font-medium">
            We just sent a verification link to{" "}
            <span className="font-semibold">{form.getValues().email}</span>.
          </p>
          <Link href="/">
            <Button className="h-[40px] mt-2 text-white bg-violet-600 hover:bg-violet-700 font-semibold transition duration-200">
              <span className="text-sm font-medium">Go to login</span>
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
