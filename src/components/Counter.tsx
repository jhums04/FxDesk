import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Counter Demo</h2>
      <p className="text-muted-foreground">
        Current count: <span data-testid="count">{count}</span>
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCount(count - 1)}
          aria-label="Decrement"
        >
          -
        </Button>
        <Button
          onClick={() => setCount(0)}
          aria-label="Reset"
        >
          Reset
        </Button>
        <Button
          variant="outline"
          onClick={() => setCount(count + 1)}
          aria-label="Increment"
        >
          +
        </Button>
      </div>
    </div>
  )
}
