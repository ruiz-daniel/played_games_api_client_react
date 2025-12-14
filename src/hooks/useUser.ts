import { useEffect } from "react"
import api from '../services/IApi'
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useErrorHandling } from "./useErrorHandling"
import { useLoading } from "./context hooks/useLoading"
import { removerUser, setUser } from "../store/store"
import { ComponentCallBackFunction, UserCredentials } from "../models/types"
import { NewUser, User } from "../models/User"
import { useNavigation } from "./useNavigation"

export const useUser = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.users.user)
  const { handleError } = useErrorHandling()
  const { setLoading } = useLoading()
  const { goHome } = useNavigation()

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

  const login = async (data: UserCredentials, callback: ComponentCallBackFunction) => {
    setLoading(true)
    const response = await api.UserApi.login(data)
    if ("data" in response) {
      setLoading(false)
      dispatch(setUser(response.data))
      callback(true)
    } else {
      handleError(response)
      callback(false)
    }
  }

  const signup = async (data: NewUser, callback: ComponentCallBackFunction) => {
    setLoading(true)
    const response = await api.UserApi.register(data);
    if ("data" in response) {
      setLoading(false);
      login(data, callback);
    } else {
      handleError(response)
      callback(false)
    }
  }

  const update = async (data: User, callback?: ComponentCallBackFunction) => {
    setLoading(true)
    const response = await api.UserApi.updateUser(data);
    if ("data" in response) {
      setLoading(false);
      dispatch(setUser(response.data))
      callback?.(true);
    } else {
      handleError(response)
      callback?.(false)
    }
  }

  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    dispatch(removerUser())
    goHome()
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
