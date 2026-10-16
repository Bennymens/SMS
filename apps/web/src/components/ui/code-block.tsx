"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, showLineNumbers = false, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy code", err)
      }
    }

    const lines = code.trim().split("\n")

    return (
      <div
        ref={ref}
        className={cn(
          "relative my-4 overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400">
          <span className="font-mono lowercase">{language || "text"}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={copyToClipboard}
            className="h-7 w-7 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed">
          {showLineNumbers ? (
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div className="select-none text-right text-zinc-600">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div>
                {lines.map((line, i) => (
                  <div key={i}>{line || " "}</div>
                ))}
              </div>
            </div>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
