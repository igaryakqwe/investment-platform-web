"use client"

import { useState, useCallback, useEffect } from "react"
import type { ProjectInfoValues } from "../components/stepper/steps/project-info-step"
import type { ProductInfoValues } from "../components/stepper/steps/product-info-step"

const LOCAL_STORAGE_KEY = "create-project-form"

interface CreateProjectState {
  projectInfo: ProjectInfoValues | null
  projectImages: string[]
  productInfo: ProductInfoValues | null
}

export function useCreateProject() {
  const [state, setState] = useState<CreateProjectState>(() => {
    // Спроба отримати збережений стан з localStorage
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedState) {
        try {
          return JSON.parse(savedState)
        } catch (e) {
          console.error("Failed to parse saved form state:", e)
        }
      }
    }
    
    // Початковий стан, якщо немає збереженого
    return {
      projectInfo: null,
      projectImages: [],
      productInfo: null,
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Зберігаємо стан в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])
  
  const updateProjectInfo = useCallback((info: ProjectInfoValues) => {
    setState((prev) => ({ ...prev, projectInfo: info }))
  }, [])
  
  const updateProjectImages = useCallback((images: string[]) => {
    setState((prev) => ({ ...prev, projectImages: images }))
  }, [])
  
  const updateProductInfo = useCallback((info: ProductInfoValues) => {
    setState((prev) => ({ ...prev, productInfo: info }))
  }, [])
  
  const resetForm = useCallback(() => {
    setState({
      projectInfo: null,
      projectImages: [],
      productInfo: null,
    })
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }, [])
  
  const submitForm = useCallback(async () => {
    setIsSubmitting(true)
    
    try {
      // Тут буде логіка відправки даних на сервер
      console.log("Submitting project:", state)
      
      // Імітація затримки запиту
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Очищення форми після успішного створення
      resetForm()
      
      return true
    } catch (error) {
      console.error("Error submitting project:", error)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [state, resetForm])
  
  return {
    projectInfo: state.projectInfo,
    projectImages: state.projectImages,
    productInfo: state.productInfo,
    updateProjectInfo,
    updateProjectImages,
    updateProductInfo,
    resetForm,
    submitForm,
    isSubmitting,
  }
}
