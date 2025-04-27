"use client"

import { useCreateProject } from "../../../hooks/use-create-project"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"

const projectInfoSchema = z.object({
  name: z.string().min(3, "Назва проєкту має містити щонайменше 3 символи"),
  description: z.string().min(10, "Опис проєкту має містити щонайменше 10 символів"),
  address: z.string().min(5, "Адреса має містити щонайменше 5 символів"),
})

export type ProjectInfoValues = z.infer<typeof projectInfoSchema>

const ProjectInfoStep = () => {
  const { projectInfo, updateProjectInfo } = useCreateProject()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectInfoValues>({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: projectInfo ?? {
      name: "",
      description: "",
      address: "",
    },
  })
  
  // Оновлюємо стан форми при зміні полів
  const formValues = watch()
  
  useEffect(() => {
    updateProjectInfo(formValues)
  }, [formValues, updateProjectInfo])
  
  // Функція-заглушка для onSubmit, оскільки відправка відбувається в іншому компоненті
  const onSubmit = (data: ProjectInfoValues) => {
    console.log(data)
  }
  
  return (
    <form className="space-y-6 p-1" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="name"
        label="Назва проєкту"
        placeholder="Введіть назву проєкту"
        error={errors.name?.message}
        {...register("name")}
      />
      
      <Textarea
        id="description"
        label="Опис проєкту"
        placeholder="Детальний опис проєкту, його цілі та очікувані результати"
        className="min-h-[120px]"
        error={errors.description?.message}
        {...register("description")}
      />
      
      <Input
        id="address"
        label="Адреса проєкту"
        placeholder="Область, місто, вулиця"
        error={errors.address?.message}
        {...register("address")}
      />
    </form>
  )
}

export default ProjectInfoStep;
