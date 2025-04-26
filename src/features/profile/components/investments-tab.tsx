"use client";

import useInvestmentsQuery from "@/hooks/use-investments-query";
import { InvestmentCardSkeleton } from "@/features/profile/components/investment-card-skeleton";
import { InvestmentCard } from "@/features/profile/components/investment-card";

const InvestmentsTab = () => {
  const { investments, isLoading } = useInvestmentsQuery();

  return (
    <div className="flex w-full flex-col">
      {isLoading &&
        Array.from({ length: 2 }).map((_, index) => (
          <InvestmentCardSkeleton key={index} />
        ))}

      {!isLoading && investments.length === 0 && (
        <div className="col-span-2 text-center">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      )}

      {investments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}
    </div>
  );
};

export default InvestmentsTab;
