import type { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default Providers;
