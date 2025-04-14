"use client";

import { toast } from "@/hooks/use-toast";
import { forgotPasswordMutationFn } from "@/service/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Logo } from "@/components/logo/logo";
import { ArrowLeft, ArrowRight, Loader, Mail, MailCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const params = useSearchParams();
  const email = params.get("email");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });
  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
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
              Forgot your password?
            </h2>
            <p className="text-sm text-muted-foreground">
              {
                "Include the email address associated with your account and we’ll send you an email with instructions to reset your password."
              }
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              aria-label="Forgot password form"
            >
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
              <Button
                className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-semibold transition duration-200"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader className="animate-spin" />
                    Send reset instructions
                  </>
                ) : (
                  <>
                    Send reset instructions
                    <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm">
            <Link href="/">
                <Button className="h-[40px] mt-2 bg-transparent shadow-none hover:bg-transparent" title="Go to login">
                  <ArrowLeft className="text-violet-700" />
                  <span className="text-sm font-medium text-violet-700">Back to login</span>
                </Button>
            </Link>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-xs font-normal mt-4">
              By signing up, you agree to our{" "}
              <a className="text-primary hover:underline font-medium" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-primary hover:underline font-medium" href="#">
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

          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-medium">
            We just sent a verification link to{" "}
            <span className="font-semibold">{form.getValues().email}</span>.
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
