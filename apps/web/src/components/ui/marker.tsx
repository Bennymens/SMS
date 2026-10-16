import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const markerVariants = cva("relative inline-flex rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      destructive: "bg-destructive",
      muted: "bg-muted-foreground",
    },
    size: {
      sm: "h-2 w-2",
      default: "h-2.5 w-2.5",
      lg: "h-3 w-3",
    },
    ping: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    ping: false,
  },
})

export interface MarkerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof markerVariants> {}

const Marker = React.forwardRef<HTMLSpanElement, MarkerProps>(
  ({ className, variant, size, ping = false, ...props }, ref) => {
    return (
      <span ref={ref} className="relative inline-flex items-center justify-center" {...props}>
        {ping && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              markerVariants({ variant, size })
            )}
          />
        )}
        <span className={cn(markerVariants({ variant, size }), className)} />
      </span>
    )
  }
)
Marker.displayName = "Marker"

export { Marker, markerVariants }
