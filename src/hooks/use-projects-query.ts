import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projects/projects.api";

interface UseProjectsQueryProps {
  search?: string;
  userId?: string;
}

const useProjectsQuery = ({ search, userId }: UseProjectsQueryProps) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (userId) params.append("userId", userId);
  const queryString = params.toString();

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", queryString],
    queryFn: () => getProjects(queryString),
  });

  return {
    projects,
    isLoading,
    error,
  };
};

export default useProjectsQuery;
