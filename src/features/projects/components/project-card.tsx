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
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const mainPhoto = project.photos?.link || "/placeholder.svg";
  const totalInvested =
    project.products?.investments?.reduce(
      (sum, investment) => sum + investment.amount,
      0,
    ) || 0;
  const progress = project.products?.amount
    ? Math.min((totalInvested / project.products.amount) * 100, 100)
    : 0;

  return (
    <Card className="border-border/50 bg-card/50 hover:shadow-primary/5 hover:border-primary/20 group h-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={mainPhoto}
            width={400}
            height={300}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="bg-background/80 absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
          {project.projectType}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{project.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3" />
          {project.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {project.description}
        </p>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>Прогрес збору</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Потрібно:</span>
            <span className="ml-1 font-medium">
              {project.products?.name} ({project.products?.amount} шт.)
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Оціночна вартість:</span>
            <span className="ml-1 font-medium">
              {project.estimatedCost} {project.currencyType}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="group-hover:bg-primary group-hover:text-primary-foreground w-full rounded-full transition-colors"
        >
          Детальніше
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
