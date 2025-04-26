import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/utils/styles.utils";

const AuthButtons = () => {
  return (
    <div className="flex gap-2 mt-2 px-2">
      <Link href={ROUTES.SIGN_IN} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 rounded-full")}>
        Sign in
      </Link>
      <Link href={ROUTES.SIGN_UP} className={cn(buttonVariants({ size: "sm" }), "flex-1 rounded-full")}>
        Sign up
      </Link>
    </div>
  );
};

export default AuthButtons;
