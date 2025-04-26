import type { Metadata } from "next";

import ProjectsPage from "@/features/projects/projects.page";

export const metadata: Metadata = {
  title: "Projects",
}

const Projects = () => {
  return <ProjectsPage />
}

export default Projects;