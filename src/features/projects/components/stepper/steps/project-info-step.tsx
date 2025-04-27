"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProjectContext } from "@/context/create-project-context"

const projectInfoSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters long"),
  description: z.string().min(10, "Project description must be at least 10 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
})

export type ProjectInfoValues = z.infer<typeof projectInfoSchema>

export const ProjectInfoStep = () => {
  const { projectInfo, updateProjectInfo } = useCreateProjectContext()
  
  const { register, formState: { errors } } = useForm<ProjectInfoValues>({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: projectInfo,
  })
  
  return (
    <form className="space-y-6 p-1">
      <Input
        id="name"
        label="Project name"
        placeholder="Enter project name"
        error={errors.name?.message}
        {...register("name", {
          onChange: (e) =>
            updateProjectInfo({ ...projectInfo, name: e.target.value }),
        })}
      />
      <Textarea
        id="description"
        label="Project description"
        placeholder="Detailed description of the project…"
        className="min-h-[120px]"
        error={errors.description?.message}
        {...register("description", {
          onChange: (e) =>
            updateProjectInfo({ ...projectInfo, description: e.target.value }),
        })}
      />
      <Input
        id="address"
        label="Project address"
        placeholder="Region, city, street"
        error={errors.address?.message}
        {...register("address", {
          onChange: (e) =>
            updateProjectInfo({ ...projectInfo, address: e.target.value }),
        })}
      />
    </form>
  )
}

export default ProjectInfoStep;
