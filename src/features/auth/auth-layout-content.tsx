import { type PropsWithChildren } from "react";

import Logo from "@/components/logo";
import Image from "next/image";

const AuthLayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative m-5 hidden rounded-2xl lg:block">
        {/* Blurred background */}
        <div className="to-primary/40 absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-transparent blur-3xl" />

        <div className="absolute bottom-3 z-20 flex items-center justify-center rounded-xl p-6">
          <h2 className="text-center text-3xl font-bold text-white drop-shadow-lg">
            Investing in Ukraine’s Future
          </h2>
        </div>

        {/* Main image on top */}
        <Image
          src="/factory.webp"
          alt="Poh"
          fill
          className="relative z-10 rounded-2xl object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayoutContent;
