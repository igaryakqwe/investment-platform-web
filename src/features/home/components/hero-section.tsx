"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, ArrowUpRight } from "lucide-react";
import useAuthStore from "@/store/use-auth-store";
import { ROUTES } from "@/constants/navigation";
import Link from "next/link";
import { cn } from "@/utils/styles.utils";

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
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] w-full items-center"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="from-background via-background/90 to-background absolute inset-0 bg-gradient-to-b"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            opacity: 0.15,
          }}
        ></div>
        <div className="bg-primary/10 absolute top-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"></div>
        <div className="bg-secondary/10 absolute bottom-1/3 left-1/3 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 py-12 md:px-6 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
        >
          <div className="flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Innovative platform</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Rebuilding Ukraine through{" "}
                <span className="text-primary">investments in equipment</span>
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                A platform that connects reconstruction projects with businesses
                that can invest not money, but the necessary equipment and
                machinery.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={{
                  pathname: user ? ROUTES.PROJECTS : ROUTES.SIGN_IN,
                  query: { showModal: true }
                }}
                className={cn(buttonVariants({ size: "lg" }), "group gap-1")}
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={user ? ROUTES.PROJECTS : ROUTES.SIGN_IN}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Become an investor
              </Link>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center gap-2 pl-2">
                <span className="text-muted-foreground text-sm">
                  +500 projects already on the platform
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground text-sm">
                  Online support 24/7
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInVariants}
            className="relative mx-auto w-full max-w-md lg:max-w-full"
          >
            <div className="border-border/50 bg-card/50 relative z-10 overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Rebuilding Ukraine"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute right-4 bottom-4 left-4">
                  <div className="text-white">
                    <div className="text-sm font-medium opacity-80">
                      Popular project
                    </div>
                    <div className="text-xl font-bold">
                      Power plant restoration
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <Zap className="text-primary h-4 w-4" />
                    </div>
                    <span className="font-medium">Energy</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Required: 15 transformers
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                  >
                    View details
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="bg-primary/20 absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl"></div>
            <div className="bg-secondary/20 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-2xl"></div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-4 md:gap-8"
        >
          {[
            { label: "Projects", value: "500+" },
            { label: "Investors", value: "250+" },
            { label: "Successful cases", value: "120+" },
            { label: "Equipment", value: "₴500M+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="border-border/50 bg-card/50 rounded-xl border p-4 backdrop-blur-sm md:p-6"
            >
              <div className="text-primary text-2xl font-bold md:text-3xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
