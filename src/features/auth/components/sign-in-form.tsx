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
      toast.success("Ви успішно увійшли в акаунт");
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
        <h1 className="text-2xl font-bold">Вхід</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Введіть свої дані, щоб увійти в систему
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
          label="Пароль"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Увійти
        </Button>
      </div>
      <div className="text-center text-sm">
        Не маєш аккаунту?{" "}
        <a href={ROUTES.SIGN_UP} className="underline underline-offset-4">
          Зареєструватися
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
