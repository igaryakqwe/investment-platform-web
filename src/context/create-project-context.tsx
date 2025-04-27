"use client"

import React, { createContext, useContext } from "react"
import { useCreateProject } from "@/features/projects/hooks/use-create-project"

type CreateProjectHook = ReturnType<typeof useCreateProject>

const CreateProjectContext = createContext<CreateProjectHook | null>(null)

export const CreateProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hook = useCreateProject()
  return (
    <CreateProjectContext.Provider value={hook}>
      {children}
    </CreateProjectContext.Provider>
  )
}

export const useCreateProjectContext = (): CreateProjectHook => {
  const ctx = useContext(CreateProjectContext)
  if (!ctx) {
    throw new Error("useCreateProjectContext must be used within CreateProjectProvider")
  }
  return ctx
}
