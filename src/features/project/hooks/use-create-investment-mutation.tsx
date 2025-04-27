import { useMutation } from "@tanstack/react-query";
import { createInvestment } from "@/api/projects/projects.api";
import type { CreateInvestmentDto } from "@/api/projects/projects.dto";

const useCreateInvestmentMutation = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateInvestmentDto) => createInvestment(data),
  });

  return {
    createInvestment: mutateAsync,
    isCreatingInvestment: isPending,
  };
};

export default useCreateInvestmentMutation;
