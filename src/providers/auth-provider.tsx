"use client";

import { type PropsWithChildren, useEffect } from "react";

import { hydrateAuthStore } from "@/store/use-auth-store";
import { getAuthToken, getUser } from "@/utils/auth.utils";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = getAuthToken();

  const { data: user } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    hydrateAuthStore(user ?? null);
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
