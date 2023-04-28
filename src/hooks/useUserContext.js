import { useContext } from 'react'
import { UserContext } from '../contexts/user'

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('User context is missing the provider and cannot be accessed')
  }
  return context
}
