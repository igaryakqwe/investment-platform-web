import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Calendar, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Investment } from "@/types/investment";

interface InvestmentCardProps {
  investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const createdDate = new Date(investment.createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <Card className="border-border/50 bg-card/50 hover:shadow-primary/5 hover:border-primary/20 group overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48">
          <div className="aspect-video h-full overflow-hidden md:aspect-square">
            <Image
              src={investment.photoLink}
              width={400}
              height={300}
              alt={investment.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="bg-background/80 absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
            Investment
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="line-clamp-1 text-lg font-semibold">
                {investment.name}
              </h3>
              <div className="flex items-center font-medium text-emerald-500">
                <DollarSign className="mr-1 h-4 w-4" />
                <span>
                  {investment.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {investment.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Product:</span>
                <span className="ml-1 font-medium">
                  {investment.productName}
                </span>
              </div>

              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Posted {timeAgo}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="group-hover:bg-primary group-hover:text-primary-foreground rounded-full transition-colors"
            >
              View Details
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
