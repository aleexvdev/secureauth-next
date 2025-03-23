"use client";

import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
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

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      name: z.string().max(255).trim().min(3, {
        message: "Name is required",
      }),
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
      name: "",
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
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      {!isSubmitted ? (
        <div className="w-full p-5 rounded-md">
          <Logo
            url="/"
            size="40px"
            fontSize="24px"
            classContainer="flex items-center justify-start"
          />
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-4 text-center sm:text-left">
            Create a account!
          </h1>
          <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
            Already have an account?{" "}
            <Link className="text-primary" href="/">
              Sign in
            </Link>
            .
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground dark:text-[#f1f7feb5] text-sm">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground dark:text-[#f1f7feb5] text-sm">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          autoComplete="off"
                        />
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
                      <FormLabel className="text-foreground dark:text-[#f1f7feb5] text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          autoComplete="off"
                        />
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
                      <FormLabel className="text-foreground dark:text-[#f1f7feb5] text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••••••"
                          {...field}
                          autoComplete="off"
                        />
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
                      <FormLabel className="text-foreground dark:text-[#f1f7feb5] text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••••••"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full text-[15px] h-[40px] !bg-blue-500 text-white font-semibold flex items-center justify-center gap-4"
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
              <div className="mb-4 mt-4 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
                <span className="mx-4 text-xs dark:text-[#f1f7feb5] font-normal">
                  OR
                </span>
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
              </div>
            </form>
          </Form>
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
          <p className="text-xs font-normal mt-4">
            By signing up, you agree to our{" "}
            <a className="text-primary hover:underline" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-primary hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We just sent a verification link to .
          </p>
          <Link href="/">
            <Button className="h-[40px]">
              Go to login
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
