import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projects/projects.api";

const useProjectQuery = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectById(id),
  });

  const project = {
    ...data,
    additionalInfo: {
      timeline: "Expected completion within 6 months from funding",
      impact:
        "Will serve approximately 5,000 community members with various educational and social programs",
      team: [
        {
          name: "Maria Kovalenko",
          role: "Project Manager",
          avatar: "/api/placeholder/40/40",
        },
        {
          name: "Taras Shevchenko",
          role: "Lead Engineer",
          avatar: "/api/placeholder/40/40",
        },
        {
          name: "Olena Dudka",
          role: "Community Liaison",
          avatar: "/api/placeholder/40/40",
        },
      ],
    },
    createdAt: "2025-02-01T08:00:00.000Z",
    createdBy: {
      name: "Community Development Organization",
      id: "org-123",
      avatar: "/api/placeholder/40/40",
    },
  };

  return {
    project,
    isLoading,
    isError: error,
  };
};

export default useProjectQuery;
