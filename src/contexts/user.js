import { useState, useEffect, createContext } from 'react'
import api from '../services/IApi'
import { useLoading } from '../hooks/useLoading'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState()
  const { setLoading } = useLoading()

  useEffect(() => {
    const userid = localStorage.getItem('userid')
    userid && api.UserApi.getUser(userid, (response) => {
      setUser(response.data)
    })
  }, [])

  const login = (data, callback) => {
    setLoading(true)
    api.UserApi.login(data, (response) => {
      setLoading(false)
      setUser(response.data)
      callback && callback(response.data)
    })
  }
  const signup = (data, callback) => {
    setLoading(true)
    api.UserApi.register(data, (response) => {
      setLoading(false)
      login(data, callback)
    })
  }
  const update = (data, callback) => {
    setLoading(true)
    api.UserApi.updateUser(data, (response) => {
      setLoading(false)
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
