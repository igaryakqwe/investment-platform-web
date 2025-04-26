import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, MapPin } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    category: string
    address: string
    mainImage: string
    progress: number
    roi: string
    product: {
      name: string
      amount: number
    }
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={project.mainImage || "/placeholder.svg"}
            width={400}
            height={300}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
          {project.category}
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
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Прогрес збору</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Потрібно:</span>
            <span className="ml-1 font-medium">
              {project.product.name} ({project.product.amount} шт.)
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">ROI:</span>
            <span className="ml-1 font-medium">{project.roi}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Детальніше
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
