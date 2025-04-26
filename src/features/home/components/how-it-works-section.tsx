"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2, Factory, Handshake, ArrowRight, Sparkles } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Створення проєкту",
      description: "Власники проєктів публікують свої потреби в обладнанні та техніці для відбудови.",
      delay: 0,
    },
    {
      icon: <Factory className="h-6 w-6" />,
      title: "Пропозиція обладнання",
      description: "Виробники та постачальники обладнання знаходять проєкти та пропонують свою продукцію.",
      delay: 0.2,
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Укладання договору",
      description: "Сторони укладають договір про постачання обладнання та розподіл майбутніх прибутків.",
      delay: 0.4,
    },
  ]
  
  return (
    <section id="how-it-works" className="w-full py-20 md:pb-32 pt-0 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Як це працює</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight max-w-2xl">
            Інвестиції в обладнання замість грошей — <span className="text-primary">новий підхід</span> до відбудови
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Наша платформа з&#39;єднує проєкти відбудови з бізнесами, які можуть надати необхідне обладнання та отримати
            частку від майбутніх прибутків.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-border hidden md:block"></div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: step.delay, duration: 0.5 }}
              >
                <Card className="relative overflow-hidden h-full border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        {step.icon}
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <CardTitle className="mt-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-muted opacity-20"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Button size="lg" className="rounded-full">
            Дізнатися більше
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
