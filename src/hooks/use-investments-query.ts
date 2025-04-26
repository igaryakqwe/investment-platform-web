import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/use-auth-store";
import { getUserInvestments } from "@/api/users/users.api";

const useInvestmentsQuery = () => {
  const { user } = useAuthStore();

  const {
    data: investments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["investments", user?.id],
    queryFn: () => getUserInvestments(user?.id ?? ""),
  });

  return {
    investments,
    isLoading,
    error,
  };
};

export default useInvestmentsQuery;
