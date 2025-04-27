import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, MapPin, Users, Calendar } from "lucide-react";
import type { Project } from "@/types/project";
import { formatDistanceToNow } from "date-fns";
import useChatStore from "@/store/use-chat-store";
import { getUserById } from "@/api/users/users.api";
import Link from "next/link";
import { cn } from "@/utils/styles.utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { addChat, setIsChatOpen, setReceiverId } = useChatStore();

  const mainPhoto =
    project.photos.find((p) => p.isMain)?.link ?? project.photos[0]?.link;
  const totalInvested =
    project.products?.reduce((sum, investment) => sum + investment.amount, 0) ||
    0;
  const progress = project.products.reduce((sum, investment) => {
    return sum + (investment.amount || 0);
  }, 0);

  const investorCount = project.products?.length ?? 0;
  const createdDate = new Date(project.createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  const handleOpenChat = async () => {
    const user = await getUserById(project.userId);
    addChat(user);
    setReceiverId(user.id);
    setIsChatOpen(true);
  };

  return (
    <Card className="border-border/50 bg-card/50 hover:shadow-primary/5 hover:border-primary/20 group h-full w-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={mainPhoto ?? ""}
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
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>Funding Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="text-muted-foreground border-border/30 flex items-center justify-between border-t pt-2 text-xs">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>
              {investorCount} investor{investorCount !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Listed {timeAgo}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleOpenChat}>Chat</Button>
        <Link
          href={`/projects/${project.id}`}
          className={cn(
            buttonVariants(),
            "group-hover:bg-primary group-hover:text-primary-foreground w-full rounded-full transition-colors",
          )}
        >
          View Details
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
