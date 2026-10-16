import * as React from "react"
import { FileIcon, Paperclip, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: string
  url?: string
  onRemove?: () => void
  onDownload?: () => void
}

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  ({ className, name, size, url, onRemove, onDownload, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg border bg-card p-2.5 text-card-foreground shadow-xs transition-colors hover:bg-muted/50",
          className
        )}
        {...props}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Paperclip className="h-4 w-4" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <span className="truncate text-sm font-medium leading-none">{name}</span>
          {size && <span className="mt-1 text-xs text-muted-foreground">{size}</span>}
        </div>
        <div className="flex items-center gap-1">
          {onDownload && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onDownload}
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          )}
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onRemove}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)
Attachment.displayName = "Attachment"

export { Attachment }
