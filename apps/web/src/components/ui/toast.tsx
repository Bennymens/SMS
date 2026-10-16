"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

export const toast = sonnerToast

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  }
}

export { Toaster } from "@/components/ui/sonner"
