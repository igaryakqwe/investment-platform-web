"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./components/project-card";
// import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { Plus, Sparkles } from "lucide-react";
import useProjectsQuery from "@/hooks/use-projects-query";

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { projects } = useProjectsQuery({});

  return (
    <div className="container px-4 py-8 md:px-6 md:py-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 space-y-3 md:mb-0">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Проєкти відбудови</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Проєкти, які шукають{" "}
            <span className="text-primary">інвесторів</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Ознайомтеся з проєктами, які потребують обладнання для відбудови та
            розвитку.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="gap-2 rounded-full"
        >
          <Plus className="h-5 w-5" />
          Створити проєкт
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/*<CreateProjectModal*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onClose={() => setIsModalOpen(false)}*/}
      {/*/>*/}
    </div>
  );
};

export default ProjectsPage;
