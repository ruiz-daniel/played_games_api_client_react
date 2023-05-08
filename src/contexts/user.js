import { useState, useEffect, createContext } from 'react'
import api from '../services/IApi'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    const userid = localStorage.getItem('userid')
    userid && api.UserApi.getUser(userid, (response) => {
      setUser(response.data)
    })
  }, [])

  const login = (data, callback) => {
    api.UserApi.login(data, (response) => {
      setUser(response.data)
      callback && callback(response.data)
    })
  }
  const signup = (data, callback) => {
    api.UserApi.register(data, (response) => {
      login(data, callback)
    })
  }
  const update = (data, callback) => {
    api.UserApi.updateUser(data, (response) => {
      setUser(response.data)
      callback && callback(response.data)
    })
  }

  const logout = (callback) => {
    localStorage.clear()
    setUser(null)
    callback()
  }

  const sharedContent = {
    user,
    login,
    logout,
    signup,
    update
  }

  return (
    <UserContext.Provider value={sharedContent}>
      {children}
    </UserContext.Provider>
  )
}
