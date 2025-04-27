import { ArrowRightIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/utils/styles.utils";

const SuccessCard = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex justify-center">
          <CheckCircle2 className="text-primary h-8 w-8" />
        </div>
        <CardTitle className="text-center text-2xl">
          Account successfully created
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <h1>Check your email to confirm your registration.</h1>
        <Link href={ROUTES.SIGN_IN} className={cn(buttonVariants(), "w-full")}>
          <span>Sign in</span>
          <ArrowRightIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
