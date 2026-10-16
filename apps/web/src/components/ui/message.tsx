import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  sender?: {
    name: string
    avatar?: string
    initials?: string
  }
  timestamp?: string
  isOwn?: boolean
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, sender, timestamp, isOwn = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 text-sm leading-relaxed",
          isOwn ? "flex-row-reverse text-right" : "flex-row text-left",
          className
        )}
        {...props}
      >
        {sender && (
          <Avatar className="h-8 w-8 shrink-0">
            {sender.avatar && <AvatarImage src={sender.avatar} alt={sender.name} />}
            <AvatarFallback>{sender.initials || sender.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        <div className={cn("flex flex-col gap-1", isOwn ? "items-end" : "items-start")}>
          {(sender?.name || timestamp) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {sender?.name && <span className="font-medium text-foreground">{sender.name}</span>}
              {timestamp && <span>{timestamp}</span>}
            </div>
          )}
          <div className="max-w-[85%]">{children}</div>
        </div>
      </div>
    )
  }
)
Message.displayName = "Message"

export { Message }
