import type { Metadata } from "next";

import ProjectsPage from "@/features/projects/projects.page";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

const Projects = () => {
  return (
    <Suspense>
      <ProjectsPage />
    </Suspense>
  );
};

export default Projects;
