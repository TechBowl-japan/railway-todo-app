import { useState } from 'react'

export const useId = () => {
  const [id] = useState(() => {
    return Math.random().toString(32).substring(2)
  })

  return id
}
