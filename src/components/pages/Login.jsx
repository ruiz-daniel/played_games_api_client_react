import { useUser } from '../../hooks/useUser'
import { useNavigation } from '../../hooks/useNavigation'
import LoginForm from '../utils/forms/LoginForm'

function Login() {
  const { login } = useUser()
  const navigator = useNavigation()

  const handleLogin = (credentials) => {
    login(credentials, () => {
      navigator.goToDashboard()
    })
  }

  return (
    <section className='flex justify-content-center align-items-center' >
      <div className='mt-6' style={{boxShadow: '0 0.5rem 1rem 0 rgba(216, 118, 192, 0.3)', width: '70%'}}>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </section>
    
  )
}

export default Login
