import { type PropsWithChildren } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <main className="h-full w-full max-w-7xl flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
