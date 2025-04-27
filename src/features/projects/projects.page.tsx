"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./components/project-card";
import { CreateProjectModal } from "./components/create-project-modal"
import { Plus, Sparkles } from "lucide-react";
import useProjectsQuery from "@/hooks/use-projects-query";
import { parseAsString, useQueryState } from "nuqs";
import SearchField from "@/features/projects/components/search-field";
import useDebounce from "@/hooks/use-debounce";

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const debouncedSearch = useDebounce(search, 300);

  const { projects } = useProjectsQuery({ search: debouncedSearch });

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:px-6 md:py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 space-y-3 md:mb-0">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Reconstruction Projects</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Projects Seeking <span className="text-primary">Investors</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Explore projects that need equipment for reconstruction and
            development.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="gap-2 rounded-full"
        >
          <Plus className="h-5 w-5" />
          Create Project
        </Button>
      </div>

      <div className="mb-5">
        <SearchField />
      </div>

      <div className="grid w-full gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsPage;
