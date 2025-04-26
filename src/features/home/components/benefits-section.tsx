"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function BenefitsSection() {
  const benefitsForProjects = [
    {
      title: "Швидкий доступ до обладнання",
      description: "Отримайте необхідне обладнання без значних початкових інвестицій.",
    },
    {
      title: "Широка мережа постачальників",
      description: "Доступ до великої бази виробників та постачальників обладнання.",
    },
    {
      title: "Прозорий процес",
      description: "Чіткі умови співпраці та відстеження виконання зобов'язань.",
    },
  ]
  
  const benefitsForInvestors = [
    {
      title: "Нові ринки збуту",
      description: "Розширення ринків збуту для вашої продукції та обладнання.",
    },
    {
      title: "Стабільний дохід",
      description: "Отримання частки від прибутку проєктів протягом тривалого часу.",
    },
    {
      title: "Соціальний вплив",
      description: "Участь у відбудові України та підтримка економічного розвитку.",
    },
  ]
  
  return (
    <section id="benefits" className="w-full py-20 md:py-32 relative">
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
            <span>Переваги</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight max-w-2xl">
            Чому варто долучитися до <span className="text-primary">платформи</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Наша платформа пропонує унікальні можливості як для власників проєктів, так і для інвесторів.
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
                Для власників проєктів
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
                Для інвесторів
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
              <h3 className="text-2xl font-bold">Готові розпочати?</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Приєднуйтесь до платформи сьогодні та станьте частиною відбудови України.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-full">
                Створити проєкт
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Стати інвестором
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
