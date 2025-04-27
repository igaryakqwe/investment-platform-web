"use client";
import useAuthStore from "@/store/use-auth-store";
import useProjectsQuery from "@/hooks/use-projects-query";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectCardSkeleton } from "@/features/projects/components/project-card-skeleton";
import { usePagination } from "@/hooks/use-pagination";
import PaginationControls from "@/components/pagination-controls";

const ProjectsTab = () => {
  const { user } = useAuthStore();

  const { projects, isLoading } = useProjectsQuery({
    userId: user?.id,
  });

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination({
      itemsPerPage: 2,
      totalItems: projects?.length ?? 0,
    });

  const paginatedProjects = currentItems(projects);

  return (
    <>
      <div className="mb-5 grid gap-6 md:grid-cols-2 md:gap-8">
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}

        {!isLoading && projects.length === 0 && (
          <div className="col-span-2 text-center">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}

        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProjectsTab;
