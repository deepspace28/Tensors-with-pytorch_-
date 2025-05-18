"use client"

interface MathRendererProps {
  formula: string
  display?: boolean
}

export function MathRenderer({ formula, display = false }: MathRendererProps) {
  return (
    <div className={display ? "math-display" : "math-inline"}>
      {display ? <p>{formula}</p> : <span>{formula}</span>}
    </div>
  )
}
