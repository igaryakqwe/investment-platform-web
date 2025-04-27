"use client"

import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button";
import { Sparkles } from "lucide-react"
import Link from "next/link";
import useAuthStore from "@/store/use-auth-store";
import { ROUTES } from "@/constants/navigation";

export function BenefitsSection() {
  const { user } = useAuthStore();
  const benefitsForProjects = [
    {
      title: "Quick access to equipment",
      description: "Get the equipment you need without a significant initial investment.",
    },
    {
      title: "Wide network of suppliers",
      description: "Access to a large database of equipment manufacturers and suppliers.",
    },
    {
      title: "Transparent process",
      description: "Clear terms of cooperation and tracking of fulfillment of obligations.",
    },
  ]
  
  const benefitsForInvestors = [
    {
      title: "New sales markets",
      description: "Expanding markets for your products and equipment.",
    },
    {
      title: "Stable income",
      description: "Receiving a share of the profits of projects over a long period of time.",
    },
    {
      title: "Social impact",
      description: "Participation in the reconstruction of Ukraine and support for economic development.",
    },
  ]
  
  return (
    <section id="benefits" className="w-full py-20 md:pb-32 pt-0 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Benefits</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight max-w-2xl">
            Why join the <span className="text-primary">platform</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Our platform offers unique opportunities for both project owners and investors.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  1
                </div>
                For project owners
              </h3>
              <ul className="space-y-6">
                {benefitsForProjects.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  2
                </div>
                For investors
              </h3>
              <ul className="space-y-6">
                {benefitsForInvestors.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Join the platform today and become part of the reconstruction of Ukraine.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={{
                  pathname: user ? ROUTES.PROJECTS : ROUTES.SIGN_IN,
                  query: { showModal: true }
                }}
                className={buttonVariants({ size: "lg" })}
              >
                Create a project
              </Link>
              <Link
                href={user ? ROUTES.PROJECTS : ROUTES.SIGN_IN}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Become an investor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
