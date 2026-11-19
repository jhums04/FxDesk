import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />)

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('increments count when + button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.click(incrementButton)

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('decrements count when - button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const decrementButton = screen.getByRole('button', { name: 'Decrement' })
    await user.click(decrementButton)

    expect(screen.getByTestId('count')).toHaveTextContent('-1')
  })

  it('resets count to 0 when Reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    // Increment a few times
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(screen.getByTestId('count')).toHaveTextContent('3')

    // Reset
    const resetButton = screen.getByRole('button', { name: 'Reset' })
    await user.click(resetButton)

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('handles multiple operations correctly', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })

    await user.click(incrementButton)
    await user.click(incrementButton)
    expect(screen.getByTestId('count')).toHaveTextContent('2')

    await user.click(decrementButton)
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })
})
