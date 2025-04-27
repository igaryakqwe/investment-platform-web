"use client";

import useInvestmentsQuery from "@/hooks/use-investments-query";
import { InvestmentCardSkeleton } from "@/features/profile/components/investment-card-skeleton";
import { InvestmentCard } from "@/features/profile/components/investment-card";
import { usePagination } from "@/hooks/use-pagination";
import PaginationControls from "@/components/pagination-controls";

const InvestmentsTab = () => {
  const { investments, isLoading } = useInvestmentsQuery();

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination({
      itemsPerPage: 3,
      totalItems: investments?.length ?? 0,
    });

  const paginatedInvestments = currentItems(investments);

  return (
    <div className="flex w-full flex-col gap-5">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <InvestmentCardSkeleton key={index} />
        ))}

      {!isLoading && investments.length === 0 && (
        <div className="col-span-2 text-center">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      )}

      {paginatedInvestments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InvestmentsTab;
