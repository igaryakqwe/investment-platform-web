"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProjectInfoStep from "./steps/project-info-step"
import ProjectImagesStep from "./steps/project-images-step"
import ProductInfoStep from "./steps/product-info-step"
import { useCreateProjectContext } from "@/context/create-project-context"
import { Loader2 } from "lucide-react"
import { Stepper } from "@/components/ui/stepper"

interface ProjectStepperProps {
  onClose: () => void
}

export function ProjectStepper({ onClose }: ProjectStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { isSubmitting, submitForm } = useCreateProjectContext()
  
  const steps = [
    { id: "info", label: "Інформація про проєкт", component: <ProjectInfoStep /> },
    { id: "images", label: "Фотографії проєкту", component: <ProjectImagesStep /> },
    { id: "product", label: "Інформація про продукт", component: <ProductInfoStep /> },
  ]
  
  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      const ok = await submitForm()
      if (ok) onClose()
    }
  }
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }
  
  return (
    <div className="space-y-6 pb-2">
      <Stepper steps={steps} activeStep={currentStep} className="px-2 py-4" />
      <div className="min-h-[300px] py-4">{steps[currentStep]?.component}</div>
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={currentStep === 0 ? onClose : handleBack} disabled={isSubmitting}>
          {currentStep === 0 ? "Скасувати" : "Назад"}
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentStep === steps.length - 1 ? "Створити проєкт" : "Далі"}
        </Button>
      </div>
    </div>
  )
}

