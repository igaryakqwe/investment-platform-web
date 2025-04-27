"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Factory, Handshake, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Project Creation",
      description:
        "Project owners publish their needs for equipment and machinery for reconstruction.",
      delay: 0,
    },
    {
      icon: <Factory className="h-6 w-6" />,
      title: "Equipment Offering",
      description:
        "Manufacturers and suppliers find projects and offer their products.",
      delay: 0.2,
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Contract Signing",
      description:
        "Parties sign an agreement for equipment supply and profit-sharing.",
      delay: 0.4,
    },
  ];

  return (
    <section id="how-it-works" className="relative w-full py-20 pt-0 md:pb-32">
      <div className="px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center space-y-4 text-center"
        >
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>How It Works</span>
          </div>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Investing in equipment instead of money —{" "}
            <span className="text-primary">a new approach</span> to
            reconstruction
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px] md:text-lg">
            Our platform connects reconstruction projects with businesses that
            can provide the necessary equipment and receive a share of future
            profits.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="bg-border absolute top-8 bottom-8 left-1/2 hidden w-0.5 md:block"></div>

          <div className="relative z-10 grid gap-8 md:grid-cols-3 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: step.delay, duration: 0.5 }}
              >
                <Card className="border-border/50 bg-card/50 relative h-full overflow-hidden backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                        {step.icon}
                      </div>
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <CardTitle className="mt-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                  <div className="bg-muted absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-20"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
