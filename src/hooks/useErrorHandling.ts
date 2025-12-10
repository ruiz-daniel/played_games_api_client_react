import { AxiosError } from "axios"
import { useLoading } from "./useLoading"
import { useMessages } from "./useMessages"
import { useNavigation } from "./useNavigation"

export const useErrorHandling = () => {
  const { message } = useMessages()
  const { goToLogin } = useNavigation()
  const { setLoading } = useLoading()

  const handleError = (error: AxiosError) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      setLoading(false)
      message('warn', 'Session Expired. Please Login')
      localStorage.clear()
      sessionStorage.clear()
      goToLogin()
      return
    } else {
      setLoading(false)
      message('error', error.response?.data || error.message)
    }
  }

  return {
    handleError
  }
}