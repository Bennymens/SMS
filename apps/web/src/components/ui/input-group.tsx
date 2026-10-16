import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-center rounded-md border border-input bg-transparent shadow-xs focus-within:ring-1 focus-within:ring-ring focus-within:border-ring",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "left" | "right"
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, placement = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center px-3 text-sm text-muted-foreground select-none",
          placement === "left" ? "border-r border-input" : "border-l border-input",
          className
        )}
        {...props}
      />
    )
  }
)
InputAddon.displayName = "InputAddon"

export { InputGroup, InputAddon }
