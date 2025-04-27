"use client"

import { useState, useCallback } from "react"
import type { ProjectInfoValues } from "../components/stepper/steps/project-info-step"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateProjectDto } from "@/api/projects/projects.dto"
import { createProject } from "@/api/projects/projects.api"
import useAuthStore from "@/store/use-auth-store";

export interface Product {
  id: string
  name: string
  amount: number
}

interface CreateProjectState {
  projectInfo: ProjectInfoValues
  projectImages: {
    link: string
    isMain: boolean
  }[]
  products: Product[]
}

const INITIAL_INFO: ProjectInfoValues = {
  name: "",
  description: "",
  address: "",
}

const INITIAL_STATE: CreateProjectState = {
  projectInfo: INITIAL_INFO,
  projectImages: [],
  products: [],
}

const toast = {
  success: (message: string) => console.log(`Success: ${message}`),
  error: (message: string) => console.error(`Error: ${message}`),
  warn: (message: string) => console.warn(`Warning: ${message}`),
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore();
  
  const [formState, setFormState] = useState<CreateProjectState>(INITIAL_STATE)
  
  const { mutateAsync: createAsync, isPending: isSubmitting } = useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project created successfully")
      resetForm()
    },
    onError: () => {
      toast.error("Failed to create project. Please try again.")
    },
  })
  
  const updateProjectInfo = useCallback((info: CreateProjectState["projectInfo"]) => {
    setFormState((s) => ({ ...s, projectInfo: info }))
  }, [])
  
  const updateProjectImages = useCallback((images: CreateProjectState["projectImages"]) => {
    setFormState((s) => ({ ...s, projectImages: images }))
  }, [])
  
  const addProduct = useCallback((product: { id: string; name: string; amount: number }) => {
    setFormState((s) => ({ ...s, products: [...s.products, product] }))
  }, [])
  
  const updateProduct = useCallback((prod: { id: string; name: string; amount: number }) => {
    setFormState((s) => ({
      ...s,
      products: s.products.map((p) => (p.id === prod.id ? prod : p)),
    }))
  }, [])
  
  const removeProduct = useCallback((id: string) => {
    setFormState((s) => ({
      ...s,
      products: s.products.filter((p) => p.id !== id),
    }))
  }, [])
  
  const resetForm = useCallback(() => {
    setFormState(INITIAL_STATE)
  }, [])
  
  const submitForm = useCallback(async () => {
    const { projectInfo, projectImages, products } = formState
    
    if (!projectInfo || products.length === 0 || projectImages.length === 0) {
      toast.warn("Please fill in all required fields.")
      return false
    }
    const userId = user?.id ?? ""
    const dto: CreateProjectDto = {
      userId: userId,
      name: projectInfo.name,
      description: projectInfo.description,
      address: projectInfo.address,
      photos: projectImages,
      product: products.map(({ name, amount }) => ({ name, amount })),
    }
    
    try {
      await createAsync(dto)
      return true
    } catch {
      return false
    }
  }, [formState, user?.id, createAsync])
  
  return {
    ...formState,
    updateProjectInfo,
    updateProjectImages,
    addProduct,
    updateProduct,
    removeProduct,
    resetForm,
    submitForm,
    isSubmitting,
  }
}

