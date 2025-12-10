import { useEffect } from "react"
import api from '../services/IApi'
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useErrorHandling } from "./useErrorHandling"
import { useLoading } from "./useLoading"
import { removerUser, setUser } from "../store/store"
import { UserCredentials } from "../models/types"
import { NewUser, User } from "../models/User"

export const useUser = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.users.user)
  const { handleError } = useErrorHandling()
  const { setLoading } = useLoading()

  const getUserData = async () => {
    const userid = localStorage.getItem('userid')
    if (userid) {
      setLoading(true)
      const response = await api.UserApi.getUser(userid)
      if ("data" in response) {
        setLoading(false)
        dispatch(setUser(response.data))
      } else {
        handleError(response)
      }
    }
  }

  const login = async (data: UserCredentials, callback: (user: User) => void) => {
    setLoading(true)
    const response = await api.UserApi.login(data)
    if ("data" in response) {
      setLoading(false)
      dispatch(setUser(response.data))
      callback && callback(response.data)
    } else {
      handleError(response)
    }
  }

  const signup = async (data: NewUser, callback: (data: User) => void) => {
    setLoading(true)
    const response = await api.UserApi.register(data);
    if ("data" in response) {
      setLoading(false);
      login(data, callback);
    } else {
      handleError(response)
    }
  }

  const update = async (data: User, callback: (user: User) => void) => {
    setLoading(true)
    const response = await api.UserApi.updateUser(data);
    if ("data" in response) {
      setLoading(false);
      dispatch(setUser(response.data))
      callback && callback(response.data);
    } else {
      handleError(response)
    }
  }

  const logout = (callback: () => void) => {
    localStorage.clear()
    dispatch(removerUser())
    callback()
  }

  useEffect(() => {
    getUserData()
  }, [])

  return {
    user,
    login,
    signup,
    update,
    logout
  }
}
