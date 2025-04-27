import { type PropsWithChildren } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ChatPopover from "@/components/chat/chat-popover";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <main className="h-full w-full max-w-7xl flex-1">{children}</main>
      <Footer />
      <ChatPopover />
    </div>
  );
};

export default MainLayout;
