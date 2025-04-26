import { type PropsWithChildren } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex items-center min-h-screen flex-col">
      <Header />
      <main className="h-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;