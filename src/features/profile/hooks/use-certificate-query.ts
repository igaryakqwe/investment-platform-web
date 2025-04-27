import { useQuery } from "@tanstack/react-query";
import { getInvestmentCertificate } from "@/api/users/users.api";

const useCertificateQuery = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => getInvestmentCertificate(id),
  });
  
  return {
    certificate: data,
    isLoading,
    isError,
  };
};
export default useCertificateQuery;