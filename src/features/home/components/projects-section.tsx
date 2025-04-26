"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react"
import { ROUTES } from "@/constants/navigation";
import Link from "next/link";

export function ProjectsSection() {
  const projects = [
    {
      title: "Відновлення електростанції",
      category: "Енергетика",
      image: "/placeholder.svg?height=300&width=400",
      needs: "трансформатори, генератори, кабелі",
      roi: "15-20% річних",
      progress: 65,
      delay: 0,
    },
    {
      title: "Відбудова водоочисної станції",
      category: "Інфраструктура",
      image: "/placeholder.svg?height=300&width=400",
      needs: "фільтри, насоси, труби",
      roi: "12-18% річних",
      progress: 40,
      delay: 0.1,
    },
    {
      title: "Модернізація хлібозаводу",
      category: "Харчова промисловість",
      image: "/placeholder.svg?height=300&width=400",
      needs: "печі, тістомісильні машини",
      roi: "20-25% річних",
      progress: 80,
      delay: 0.2,
    },
  ]
  
  return (
    <section id="projects" className="w-full py-20 md:pb-32 pt-0 relative">
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
            <span>Актуальні проєкти</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight max-w-2xl">
            Проєкти, які шукають <span className="text-primary">інвесторів</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Ознайомтеся з проєктами, які потребують обладнання для відбудови та розвитку.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: project.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                    {project.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>Потрібно: {project.needs}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Прогрес збору</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Рентабельність:</span>
                      <span className="ml-1 font-medium">{project.roi}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                        >
                          <span className="text-xs">{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Детальніше
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link href={ROUTES.PROJECTS} className={buttonVariants({ variant: "outline", size: "lg" })}>
            Переглянути всі проєкти
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
