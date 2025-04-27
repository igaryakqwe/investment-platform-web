"use client"

import { useState, useCallback, useEffect } from "react"
import type { ProjectInfoValues } from "../components/stepper/steps/project-info-step"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import type {CreateProjectDto} from "@/api/projects/projects.dto";
import {createProject} from "@/api/projects/projects.api";

const LOCAL_STORAGE_KEY = "create-project-form"

export interface Product {
  id: string // Унікальний ідентифікатор для керування списком
  name: string
  amount: number
}

interface CreateProjectState {
  projectInfo: ProjectInfoValues | null
  projectImages: {
    link: string,
    isMain: boolean
  }[]
  products: Product[]
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  const [state, setState] = useState<CreateProjectState>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedState) {
        try {
          return JSON.parse(savedState) as CreateProjectState
        } catch (e) {
          console.error("Failed to parse saved form state:", e)
        }
      }
    }
    
    return {
      projectInfo: null,
      projectImages: [],
      products: [],
    }
  })
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])
  
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      
      toast("Проєкт створено");
      
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      
      toast("Не вдалося створити проєкт. Спробуйте ще раз.");
    },
  });
  
  const updateProjectInfo = useCallback((info: ProjectInfoValues) => {
    setState((prev) => ({ ...prev, projectInfo: info }))
  }, [])
  
  const updateProjectImages = useCallback((images: { link: string, isMain: boolean }[]) => {
    setState((prev) => ({ ...prev, projectImages: images }))
  }, [])
  
  const addProduct = useCallback((product: Product) => {
    setState((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }))
  }, [])
  
  const updateProduct = useCallback((updatedProduct: Product) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    }))
  }, [])
  
  const removeProduct = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== productId),
    }))
  }, [])
  
  const resetForm = useCallback(() => {
    setState({
      projectInfo: null,
      projectImages: [],
      products: [],
    })
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }, [])
  
  const submitForm = useCallback(async () => {
    if (!state.projectInfo || state.products.length === 0 || state.projectImages.length === 0) {
      toast("Будь ласка, заповніть всі обов'язкові поля.")
      return false
    }
    
    const payload: CreateProjectDto = {
      name: state.projectInfo.name,
      description: state.projectInfo.description,
      address: state.projectInfo.address,
      images: state.projectImages,
      product: state.products.map(({ name, amount }) => ({ name, amount })), // Видаляємо id
    }
    
    createProjectMutation.mutate(payload)
    
    return true
  }, [state, createProjectMutation])
  
  return {
    projectInfo: state.projectInfo,
    projectImages: state.projectImages,
    products: state.products,
    updateProjectInfo,
    updateProjectImages,
    addProduct,
    updateProduct,
    removeProduct,
    resetForm,
    submitForm,
    isSubmitting: createProjectMutation.isPending,
  }
}
