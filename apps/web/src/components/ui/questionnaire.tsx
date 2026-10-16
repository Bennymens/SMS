"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface Question {
  id: string
  title: string
  description?: string
  options: { label: string; value: string }[]
}

export interface QuestionnaireProps {
  questions: Question[]
  onComplete?: (answers: Record<string, string>) => void
  className?: string
}

export function Questionnaire({
  questions,
  onComplete,
  className,
}: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined

  const handleSelect = (val: string) => {
    if (!currentQuestion) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      onComplete?.(answers)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  if (!currentQuestion) return null

  return (
    <div className={cn("mx-auto max-w-xl space-y-6 rounded-xl border bg-card p-6 shadow-xs", className)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {currentQuestion.title}
        </h3>
        {currentQuestion.description && (
          <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
        )}
      </div>

      <RadioGroup
        value={selectedValue}
        onValueChange={handleSelect}
        className="space-y-3"
      >
        {currentQuestion.options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "flex items-center space-x-3 rounded-lg border p-3.5 transition-colors cursor-pointer hover:bg-muted/50",
              selectedValue === option.value && "border-primary bg-primary/5"
            )}
            onClick={() => handleSelect(option.value)}
          >
            <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
            <Label
              htmlFor={`${currentQuestion.id}-${option.value}`}
              className="flex-1 cursor-pointer font-medium leading-none"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!selectedValue}
        >
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  )
}
