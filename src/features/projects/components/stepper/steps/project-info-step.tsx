"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProjectContext } from "@/context/create-project-context"

const projectInfoSchema = z.object({
  name: z.string().min(3, "Назва проєкту має містити щонайменше 3 символи"),
  description: z.string().min(10, "Опис проєкту має містити щонайменше 10 символів"),
  address: z.string().min(5, "Адреса має містити щонайменше 5 символів"),
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
        label="Назва проєкту"
        placeholder="Введіть назву проєкту"
        error={errors.name?.message}
        {...register("name", {
          onChange: (e) =>
            updateProjectInfo({ ...projectInfo, name: e.target.value }),
        })}
      />
      <Textarea
        id="description"
        label="Опис проєкту"
        placeholder="Детальний опис проєкту…"
        className="min-h-[120px]"
        error={errors.description?.message}
        {...register("description", {
          onChange: (e) =>
            updateProjectInfo({ ...projectInfo, description: e.target.value }),
        })}
      />
      <Input
        id="address"
        label="Адреса проєкту"
        placeholder="Область, місто, вулиця"
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
