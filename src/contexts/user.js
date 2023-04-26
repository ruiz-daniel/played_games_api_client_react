import { useState, createContext } from 'react'
import api from '../services/IApi'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState()

  function login(data, callback) {
    api.UserApi.login(data, (response) => {
      setUser(response.data)
      callback && callback(response.data)
    })
  }
  function register(data, callback) {
    api.UserApi.register(data, (response) => {
      login(data, callback)
    })
  }
  function update(data, callback) {
    api.UserApi.updateUser(data, (response) => {
      setUser(response.data)
      callback && callback(response.data)
    })
  }

  const sharedContent = {
    user,
    login,
    register,
    update
  }

  return (
    <UserContext.Provider value={sharedContent}>
      {children}
    </UserContext.Provider>
  )
}
