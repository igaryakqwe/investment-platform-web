"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signIn } from "@/api/auth/auth.api";
import { type SignInFormData, signInSchema } from "@/api/auth/auth.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, setAuthToken } from "@/utils/auth.utils";
import { cn } from "@/utils/styles.utils";
import { ROUTES } from "@/constants/navigation";

interface SignInFormProps {
  className?: string;
}

const SignInForm = ({ className }: SignInFormProps) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { token } = await signIn(data);
      setAuthToken(token);
      await getUser();
      toast.success("You have successfully logged in.");
      replace(ROUTES.HOME);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to log in.
        </p>
      </div>
      <div className="grid gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="m@example.com"
          {...register("email")}
        />
        <Input
          id="password"
          label="Password"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Sign in
        </Button>
      </div>
      <div className="text-center text-sm">
        You do not have an account?{" "}
        <a href={ROUTES.SIGN_UP} className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
