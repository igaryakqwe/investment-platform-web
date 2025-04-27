"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectStepper } from "./stepper/project-stepper"
import { CreateProjectProvider, useCreateProjectContext } from "@/context/create-project-context"

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

function InnerCreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { resetForm } = useCreateProjectContext()
  
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

export function CreateProjectModal(props: CreateProjectModalProps) {
  return (
    <CreateProjectProvider>
      <InnerCreateProjectModal {...props} />
    </CreateProjectProvider>
  )
}
