"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import UserProfile from "@/components/header/user-profile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = isHomePage
    ? [
        { name: "Home", id: "hero", href: "/" },
        { name: "How it works", id: "how-it-works", href: "/#how-it-works" },
        { name: "Projects", id: "projects", href: "/#projects" },
        { name: "Benefits", id: "benefits", href: "/#benefits" },
      ]
    : [
        { name: "Home", id: "", href: "/" },
        { name: "Projects", id: "", href: "/projects" },
      ];

  return (
    <>
      <header className="bg-background/80 border-border/40 sticky top-0 z-40 w-full max-w-7xl border-b backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />

          <nav className="hidden gap-8 px-2 md:flex">
            {navItems.map((item) =>
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-primary text-muted-foreground relative text-sm font-medium transition-colors hover:cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-primary relative text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="activeSection"
                      className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <UserProfile />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 border-border/40 fixed inset-x-0 top-16 z-30 border-b px-2 py-4 backdrop-blur-lg md:hidden"
        >
          <nav className="container flex flex-col gap-4">
            <UserProfile />
            {navItems.map((item) =>
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:bg-muted text-muted-foreground rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Header;
