import { getUserByEmail } from "@/api/users/users.api";
import { useQuery } from "@tanstack/react-query";

const useUserQuery = (email: string) => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getUserByEmail(email),
  });

  return { users, isLoading, isError };
};

export default useUserQuery;
