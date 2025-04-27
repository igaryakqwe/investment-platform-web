"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, ArrowUpRight } from "lucide-react"
import useAuthStore from "@/store/use-auth-store";
import { ROUTES } from "@/constants/navigation";
import Link from "next/link";
import { cn } from "@/utils/styles.utils"

export function HeroSection() {
  const { user } = useAuthStore();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  }
  
  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            opacity: 0.15,
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
        >
          <div className="flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Інноваційна платформа</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Відбудова України через <span className="text-primary">інвестиції в обладнання</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Платформа, що з&#39;єднує проєкти відбудови з бізнесами, які можуть інвестувати не гроші, а необхідне
                обладнання та техніку.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={user ? ROUTES.PROJECTS : ROUTES.SIGN_IN}
                className={cn(buttonVariants({ size: "lg" }), "gap-1 group")}
              >
                Розпочати проєкт
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={user ? ROUTES.PROJECTS : ROUTES.SIGN_IN}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Стати інвестором
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                    >
                      <span className="text-xs font-medium">{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">+500 проєктів вже на платформі</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">Онлайн підтримка 24/7</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeInVariants} className="relative mx-auto w-full max-w-md lg:max-w-full">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Відбудова України"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <div className="text-sm font-medium opacity-80">Популярний проєкт</div>
                    <div className="text-xl font-bold">Відновлення електростанції</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Енергетика</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Потрібно: 15 трансформаторів</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Прогрес</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full rounded-full">
                    Переглянути деталі
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl"></div>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { label: "Проєктів", value: "500+" },
            { label: "Інвесторів", value: "250+" },
            { label: "Успішних кейсів", value: "120+" },
            { label: "Обладнання", value: "₴500M+" },
          ].map((stat, index) => (
            <div key={index} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
