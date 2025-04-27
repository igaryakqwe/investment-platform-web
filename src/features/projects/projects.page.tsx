"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./components/project-card";
// import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { Plus, Sparkles } from "lucide-react";
import useProjectsQuery from "@/hooks/use-projects-query";
import { parseAsString, useQueryState } from "nuqs";
import SearchField from "@/features/projects/components/search-field";
import useDebounce from "@/hooks/use-debounce";
import { usePagination } from "@/hooks/use-pagination";
import PaginationControls from "@/components/pagination-controls";
import { ProjectCardSkeleton } from "@/features/projects/components/project-card-skeleton";

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const debouncedSearch = useDebounce(search, 300);

  const { projects, isLoading } = useProjectsQuery({ search: debouncedSearch });

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination({
      itemsPerPage: 6,
      totalItems: projects?.length ?? 0,
    });

  const paginatedProjects = currentItems(projects);

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

      <div className="mb-6 grid w-full gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}

        {!isLoading && projects.length === 0 && (
          <div className="col-span-2 text-center">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}

        {paginatedProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/*<CreateProjectModal*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onClose={() => setIsModalOpen(false)}*/}
      {/*/>*/}
    </div>
  );
};

export default ProjectsPage;
