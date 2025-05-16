interface SubtleBackgroundProps {
  className?: string
}

export function SubtleBackground({ className }: SubtleBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute left-0 top-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="subtle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtle-grid)" />
      </svg>
    </div>
  )
}
