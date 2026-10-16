import * as React from "react"
import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      icon = <Inbox className="h-10 w-10 stroke-[1.5]" />,
      title = "No data available",
      description = "There are no records to display at this time.",
      action,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50",
          className
        )}
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
        {title && (
          <h3 className="mt-4 text-base font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-normal">
            {description}
          </p>
        )}
        {action && <div className="mt-5">{action}</div>}
        {children}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty }
