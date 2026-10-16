import * as React from "react"
import { cn } from "@/lib/utils"

export interface TraceStep {
  id: string
  title: string
  description?: string
  status?: "pending" | "running" | "completed" | "failed"
  timestamp?: string
  duration?: string
}

export interface TraceProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TraceStep[]
}

const statusColorMap = {
  pending: "bg-muted-foreground/30 text-muted-foreground",
  running: "bg-primary text-primary animate-pulse",
  completed: "bg-emerald-500 text-emerald-500",
  failed: "bg-destructive text-destructive",
}

const Trace = React.forwardRef<HTMLDivElement, TraceProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative space-y-4 pl-6 text-sm", className)} {...props}>
        <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border" />
        {steps.map((step, idx) => {
          const status = step.status || "completed"
          return (
            <div key={step.id || idx} className="relative flex flex-col gap-1">
              <span
                className={cn(
                  "absolute -left-6 top-1.5 h-2 w-2 rounded-full ring-4 ring-background",
                  statusColorMap[status]
                )}
              />
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">{step.title}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {step.duration && <span>{step.duration}</span>}
                  {step.timestamp && <span>{step.timestamp}</span>}
                </div>
              </div>
              {step.description && (
                <p className="text-xs text-muted-foreground leading-normal">{step.description}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
Trace.displayName = "Trace"

export { Trace }
