interface QueueCounterProps {
  count: number
}

export function QueueCounter({ count }: QueueCounterProps) {
  return (
    <section className="w-full max-w-2xl mx-auto border border-border rounded-lg p-6 bg-background">
      <h2 className="text-sm font-medium text-foreground mb-1">Patients in Queue</h2>
      <p className="text-5xl font-bold text-foreground">{count}</p>
    </section>
  )
}
