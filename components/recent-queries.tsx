import { Clock } from "lucide-react"

export function RecentQueries() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-medium">Quantum entanglement simulation</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>2 hours ago</span>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Simulation</div>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-medium">Mathematical proof verification</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>5 hours ago</span>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Query</div>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-medium">Literature review analysis</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>1 day ago</span>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Query</div>
        </div>
      </div>
    </div>
  )
}
