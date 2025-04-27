"use client"

import * as React from "react"
import { Check } from "lucide-react"
import {cn} from "@/utils/styles.utils";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    id: string | number
    label: string
    description?: string
  }[]
  activeStep: number
  orientation?: "horizontal" | "vertical"
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { className, steps, activeStep, orientation = "horizontal", variant = "default", size = "default", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex", orientation === "vertical" ? "flex-col space-y-4" : "space-x-4 md:space-x-8", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isCompleted = index < activeStep
          
          return (
            <React.Fragment key={step.id}>
              <div
                className={cn("flex", orientation === "vertical" ? "flex-row items-start" : "flex-col items-center")}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-center text-sm font-medium",
                      isActive && "border-primary bg-primary/10 text-primary",
                      isCompleted && "border-primary bg-primary text-primary-foreground",
                      !isActive && !isCompleted && "border-muted-foreground/20 text-muted-foreground",
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                </div>
                <div className={cn("mt-2 text-center", orientation === "vertical" && "ml-4 text-left")}>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isActive && "text-primary",
                      !isActive && !isCompleted && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && <div className="mt-1 text-xs text-muted-foreground">{step.description}</div>}
                </div>
              </div>
              {orientation === "vertical" && index < steps.length - 1 && (
                <div className={cn("ml-4 h-8 w-[2px]", isCompleted ? "bg-primary" : "bg-muted-foreground/20")} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  },
)

Stepper.displayName = "Stepper"

export { Stepper }
