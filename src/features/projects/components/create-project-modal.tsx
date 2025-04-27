"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectStepper } from "./stepper/project-stepper"
import { useCreateProject } from "../hooks/use-create-project"

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { resetForm } = useCreateProject()
  
  // Очищаємо форму при закритті модального вікна
  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Створення нового проєкту</DialogTitle>
        </DialogHeader>
        <ProjectStepper onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
