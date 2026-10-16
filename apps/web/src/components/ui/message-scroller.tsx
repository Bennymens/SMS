"use client"

import * as React from "react"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean
}

const MessageScroller = React.forwardRef<HTMLDivElement, MessageScrollerProps>(
  ({ className, autoScroll = true, children, ...props }, ref) => {
    const bottomRef = React.useRef<HTMLDivElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isAtBottom, setIsAtBottom] = React.useState(true)

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
      bottomRef.current?.scrollIntoView({ behavior })
    }

    const handleScroll = () => {
      if (!containerRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const atBottom = scrollHeight - scrollTop - clientHeight < 50
      setIsAtBottom(atBottom)
    }

    React.useEffect(() => {
      if (autoScroll && isAtBottom) {
        scrollToBottom("instant")
      }
    }, [children, autoScroll, isAtBottom])

    return (
      <div className="relative h-full w-full">
        <div
          ref={(node) => {
            // @ts-ignore
            containerRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as any).current = node
          }}
          onScroll={handleScroll}
          className={cn("h-full w-full overflow-y-auto px-4 py-4 space-y-4", className)}
          {...props}
        >
          {children}
          <div ref={bottomRef} className="h-px" />
        </div>
        {!isAtBottom && (
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            onClick={() => scrollToBottom("smooth")}
            className="absolute bottom-4 right-4 rounded-full shadow-md"
          >
            <ArrowDown className="h-4 w-4" />
            <span className="sr-only">Scroll to bottom</span>
          </Button>
        )}
      </div>
    )
  }
)
MessageScroller.displayName = "MessageScroller"

export { MessageScroller }
