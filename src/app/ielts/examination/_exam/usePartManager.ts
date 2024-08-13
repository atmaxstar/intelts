import { useState } from 'react'

export const usePartManager = () => {
  const [part, setPart] = useState<'part1' | 'part2' | 'part3' | 'end'>('part1')

  const gotoNextPart = () => {
    if (part === 'part1') {
      setPart('part2')
    } else if (part === 'part2') {
      setPart('part3')
    } else if (part === 'part3') {
      setPart('end')
    }
  }

  return { part, gotoNextPart }
}
