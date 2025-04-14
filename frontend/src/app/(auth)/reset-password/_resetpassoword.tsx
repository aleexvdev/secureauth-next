"use client";

import { Logo } from "@/components/logo/logo";
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
import { toast } from "@/hooks/use-toast";
import { resetPasswordMutationFn } from "@/service/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Frown, Loader, Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Resetpassoword() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const exp = Number(params.get("exp"));
  const now = Date.now();
  const isValid = code && exp && now < exp;
  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });
  const formSchema = z
    .object({
      password: z.string().trim().min(6, {
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
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!code) {
      toast({
        title: "Error",
        description: "Invalid code",
        variant: "destructive",
      });
      router.replace("/forgot-password?email=");
      return;
    }
    const data = {
      password: values.password,
      verifyCode: code,
    };
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        router.replace("/");
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
      {isValid ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h2>
            <p className="text-sm text-muted-foreground">
              {
                "Your password must be different from the previous password you used."
              }
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              aria-label="Reset password form"
            >
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
              <div className="flex justify-center mt-6">
                <Button
                  className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-semibold transition duration-200"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin" />
                      Updating password
                    </>
                  ) : (
                    <>
                      Update password
                      <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight flex gap-x-4">
              Invalid or expired reset link
              <Frown size="40px" className="animate-bounce text-red-500" />
            </h2>
            <p className="text-sm text-muted-foreground">
              {
                "You can request a new password reset link by clicking the button below."
              }
            </p>
            <Link
              href="/forgot-password"
              className="flex items-center justify-center mt-6"
            >
              <Button className="h-[40px] mt-2">
                <span className="text-sm font-medium">Request new link</span>
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
