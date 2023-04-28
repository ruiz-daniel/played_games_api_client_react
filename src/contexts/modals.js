import { useState, createContext } from 'react'
import { useUserContext } from '../hooks/contexts/useUserContext'

import { Dialog } from 'primereact/dialog'
import LoginForm from '../components/utils/LoginForm'
import RegisterForm from '../components/utils/RegisterForm'

export const ModalsContext = createContext()

export function ModalsProvider({ children }) {
  const { login, register } = useUserContext()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (data) => {
    login(data, (response) => {
      setShowLogin(false)
    })
  }
  const handleRegister = (data) => {
    register(data, () => {
      setShowRegister(false)
    })
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }
  const toggleRegister = () => {
    setShowRegister(!showRegister)
  }

  const sharedContent = {
    toggleLogin,
    toggleRegister
  }

  return (
    <ModalsContext.Provider value={sharedContent}>
      <Dialog
        visible={showLogin}
        className="login-dialog"
        showHeader={false}
        dismissableMask
        onHide={() => {
          setShowLogin(false)
        }}
      >
        <LoginForm
          onSubmit={handleLogin}
        />
      </Dialog>
      <Dialog
        visible={showRegister}
        className="login-dialog"
        showHeader={false}
        dismissableMask
        onHide={() => {
          setShowRegister(false)
        }}
      >
        <RegisterForm
          onSubmit={handleRegister}
        />
      </Dialog>
      {children}
    </ModalsContext.Provider>
  )
}
