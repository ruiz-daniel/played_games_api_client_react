import { useState, useEffect, createContext } from 'react'
import api from '../services/IApi'
import { useLoading } from '../hooks/useLoading'
import { useMessages } from '../hooks/useMessages'



export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState()
  const { setLoading } = useLoading()
  const { message } = useMessages()

  useEffect(() => {
    const userid = localStorage.getItem('userid')
    userid && api.UserApi.getUser(userid, (response) => {
      setUser(response.data)
    })
  }, [])

  const login = async (data, callback) => {
    setLoading(true)
    const response = await api.UserApi.login(data)
    setLoading(false)
    setUser(response.data)
    callback && callback(response.data)
  }
  const signup = async (data, callback) => {
    setLoading(true)
    const response = await api.UserApi.register(data);
    setLoading(false);
    login(data, callback);
  }
  const update = async (data, callback) => {
    setLoading(true)
    const response = await api.UserApi.updateUser(data);
    setLoading(false);
    setUser(response.data);
    callback && callback(response.data);
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
