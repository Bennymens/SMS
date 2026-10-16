import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bubbleVariants = cva(
  "relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-all",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground rounded-bl-sm",
        primary: "bg-primary text-primary-foreground rounded-br-sm",
        outline: "border bg-card text-card-foreground rounded-bl-sm shadow-xs",
        ghost: "bg-transparent text-foreground",
      },
      placement: {
        left: "mr-auto",
        right: "ml-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      placement: "left",
    },
  }
)

export interface BubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, variant, placement, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bubbleVariants({ variant, placement, className }))}
        {...props}
      />
    )
  }
)
Bubble.displayName = "Bubble"

export { Bubble, bubbleVariants }
