import type { Metadata } from "next";

import ProjectsPage from "@/features/projects/projects.page";

export const metadata: Metadata = {
  title: "Проєкти",
}

const Projects = () => {
  return <ProjectsPage />
}

export default Projects;