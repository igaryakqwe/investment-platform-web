"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { emailApprove, emailResend } from "@/api/auth/auth.api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/utils/styles.utils";

const ApproveEmailCard = () => {
  const [token] = useQueryState("token", parseAsString);
  const [email] = useQueryState("email");
  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );

  const handleApprove = async () => {
    if (!token) return;
    try {
      await emailApprove(token);
      setStatus("success");
      toast.success("Email verified successfully");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      setStatus("failure");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await emailResend({ email: email });
      toast.success("Confirmation email resent");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    handleApprove().catch(console.error);
  }, [token]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Mail confirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {status === "loading" && (
          <Loader2 className="text-primary mx-auto h-8 w-8 animate-spin" />
        )}
        {status === "success" && (
          <>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-md font-semibold">
                Email confirmed successfully!
              </span>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-4",
              )}
              href={ROUTES.SIGN_UP}
            >
              Return to login
            </Link>
          </>
        )}
        {status === "failure" && (
          <>
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <XCircle className="h-6 w-6" />
              <span className="text-md font-semibold">
                Email verification failed.
              </span>
            </div>
            <Button
              onClick={handleResend}
              variant="outline"
              size="lg"
              className="mt-4"
            >
              Try again
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApproveEmailCard;
