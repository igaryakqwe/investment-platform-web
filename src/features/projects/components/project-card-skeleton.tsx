import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ProjectCardSkeleton() {
  return (
    <Card className="border-border/50 bg-card/50 h-full overflow-hidden backdrop-blur-sm">
      <div className="relative">
        <div className="bg-muted aspect-[16/9] animate-pulse"></div>
        <div className="bg-background/80 absolute top-3 left-3 h-5 w-20 animate-pulse rounded-full"></div>
      </div>
      <CardHeader className="pb-2">
        <div className="bg-muted h-6 w-3/4 animate-pulse rounded"></div>
        <div className="mt-1 flex h-4 items-center gap-1">
          <div className="bg-muted h-3 w-3 animate-pulse rounded-full"></div>
          <div className="bg-muted h-3 w-1/2 animate-pulse rounded"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="bg-muted h-4 w-full animate-pulse rounded"></div>
          <div className="bg-muted h-4 w-3/4 animate-pulse rounded"></div>
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <div className="bg-muted h-4 w-24 animate-pulse rounded"></div>
            <div className="bg-muted h-4 w-10 animate-pulse rounded"></div>
          </div>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div className="bg-muted-foreground/30 h-full w-2/3 animate-pulse rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="bg-muted h-4 w-32 animate-pulse rounded"></div>
          </div>
          <div>
            <div className="bg-muted h-4 w-36 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="border-border/30 flex items-center justify-between border-t pt-2">
          <div className="bg-muted h-3 w-20 animate-pulse rounded"></div>
          <div className="bg-muted h-3 w-24 animate-pulse rounded"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="bg-muted h-9 w-full animate-pulse rounded-full"></div>
      </CardFooter>
    </Card>
  );
}
