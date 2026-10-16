import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, asChild = false, leading, trailing, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {leading && <div className="shrink-0 text-muted-foreground">{leading}</div>}
        <div className="flex-1 truncate">{children}</div>
        {trailing && <div className="shrink-0 text-muted-foreground">{trailing}</div>}
      </Comp>
    )
  }
)
Item.displayName = "Item"

export { Item }
