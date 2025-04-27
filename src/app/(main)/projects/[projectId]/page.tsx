import ProjectPage from "@/features/project/project.page";

interface ProjectProps {
  params: Promise<{
    projectId: string;
  }>;
}

const Project = async ({ params }: ProjectProps) => {
  const { projectId } = await params;
  return <ProjectPage id={projectId} />;
};

export default Project;
