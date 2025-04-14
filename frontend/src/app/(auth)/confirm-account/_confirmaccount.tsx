"use client";

import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { confirmAccountMutationFn } from "@/service/api";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const { mutate, isPending } = useMutation({
    mutationFn: confirmAccountMutationFn,
  });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Error",
        description: "Confirmation token not found",
        variant: "destructive",
      });
      return;
    }
    mutate(
      {
        code: code,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account verified successfully",
          });
          router.replace("/");
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: "Error",
            description: error.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
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
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Account confirmation
          </h2>
          <p className="text-sm text-muted-foreground">
            {"To confirm your account, please follow the button below."}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Button
            className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-semibold transition duration-200"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Confirming account
              </>
            ) : (
              <>
                Confirm account
                <ArrowRight />
              </>
            )}
          </Button>
        </form>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-xs font-normal mt-4">
            If you have any issue confirming your account please, contact{" "}
            <a
              className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
              href="#"
            >
              support@squeezy.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
