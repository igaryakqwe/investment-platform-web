"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/navigation";
import Link from "next/link";
import type { Project } from "@/types/project";
import { cn } from "@/utils/styles.utils";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const getProgress = (project: Project) => {
    const totalNeeded = project.products.reduce(
      (sum, product) => sum + product.amount,
      0,
    );
    const totalRaised = project.products.reduce((sum, product) => {
      const productInvestments =
        product.investments?.reduce((invSum, inv) => invSum + inv.amount, 0) ??
        0;
      return sum + productInvestments;
    }, 0);
    return totalNeeded > 0 ? (totalRaised / totalNeeded) * 100 : 0;
  };

  return (
    <section id="projects" className="relative w-full py-20 pt-0 md:pb-32">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center space-y-4 text-center"
        >
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Current Projects</span>
          </div>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Projects Seeking <span className="text-primary">Investors</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px] md:text-lg">
            Explore projects in need of equipment for reconstruction and
            development.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index / 10, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="border-border/50 bg-card/50 hover:shadow-primary/5 hover:border-primary/20 h-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={
                        project.photos.find((p) => p.isMain)?.link ??
                        project.photos.at(0)?.link ??
                        ""
                      }
                      width={400}
                      height={300}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-background/80 absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    {project.projectType}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>
                    Needed: {project.products.length} transformer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span className="font-medium">
                        {getProgress(project)}%
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${getProgress(project)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="bg-muted border-background flex h-6 w-6 items-center justify-center rounded-full border-2"
                        >
                          <span className="text-xs">{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`${ROUTES.PROJECTS}/${project.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group-hover:bg-primary group-hover:text-primary-foreground w-full transition-colors",
                    )}
                  >
                    More Details
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
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
          <Link
            href={ROUTES.PROJECTS}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
