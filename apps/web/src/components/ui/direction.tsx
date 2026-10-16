"use client"

import * as React from "react"
import {
  DirectionProvider as RadixDirectionProvider,
  useDirection as useRadixDirection,
} from "@radix-ui/react-direction"

export type Direction = "ltr" | "rtl"

export interface DirectionProviderProps {
  dir: Direction
  children: React.ReactNode
}

export function DirectionProvider({ dir, children }: DirectionProviderProps) {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>
}

export function useDirection(dir?: Direction): Direction {
  return useRadixDirection(dir)
}
