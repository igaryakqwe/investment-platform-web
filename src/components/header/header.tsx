"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Logo from "@/components/logo";
import {cn} from "@/utils/styles.utils";
import {ROUTES} from "@/constants/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const isHomePage = pathname === "/"
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  const navItems = isHomePage
    ? [
      { name: "Головна", id: "hero", href: "/" },
      { name: "Як це працює", id: "how-it-works", href: "/#how-it-works" },
      { name: "Проєкти", id: "projects", href: "/#projects" },
      { name: "Переваги", id: "benefits", href: "/#benefits" },
      { name: "Контакти", id: "contact", href: "/#contact" },
    ]
    : [
      { name: "Головна", id: "", href: "/" },
      { name: "Проєкти", id: "", href: "/projects" },
      { name: "Про нас", id: "", href: "/about" },
      { name: "Блог", id: "", href: "/blog" },
      { name: "Контакти", id: "", href: "/contact" },
    ]
  
  return (
    <>
      <header
        className={`${isHomePage ? "sticky" : "fixed"} max-w-7xl top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border/40`}
      >
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Logo/>
          
          <nav className="hidden md:flex gap-8 px-2">
            {navItems.map((item) =>
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ),
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <Link href={ROUTES.SIGN_IN} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}>
                Увійти
              </Link>
              <Link href={ROUTES.SIGN_UP} className={cn(buttonVariants({ size: "sm" }), "rounded-full")}>
                Зареєструватися
              </Link>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-x-0 top-16 z-30 bg-background/95 backdrop-blur-lg border-b border-border/40 px-2 py-4"
        >
          <nav className="container flex flex-col gap-4">
            {navItems.map((item) =>
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
            <div className="flex gap-2 mt-2 px-2">
              <Link href={ROUTES.SIGN_IN} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 rounded-full")}>
                Увійти
              </Link>
              <Link href={ROUTES.SIGN_UP} className={cn(buttonVariants({ size: "sm" }), "flex-1 rounded-full")}>
                Зареєструватися
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  )
}

export default Header;