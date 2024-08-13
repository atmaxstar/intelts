import { useState } from 'react'

export const usePartManager = () => {
  const [part, setPart] = useState<'exam' | 'end'>('exam')

  const gotoNextPart = () => {
    if (part === 'exam') {
      setPart('end')
    }
  }

  return { part, gotoNextPart }
}
