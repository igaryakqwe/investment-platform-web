"use client";
import useAuthStore from "@/store/use-auth-store";
import useProjectsQuery from "@/hooks/use-projects-query";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectCardSkeleton } from "@/features/projects/components/project-card-skeleton";

const ProjectsTab = () => {
  const { user } = useAuthStore();

  const { projects, isLoading } = useProjectsQuery({
    userId: user?.id,
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {isLoading &&
        Array.from({ length: 2 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}

      {!isLoading && projects.length === 0 && (
        <div className="col-span-2 text-center">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      )}

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsTab;
