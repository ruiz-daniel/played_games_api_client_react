import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../utils/LoginForm'
import { dashboard } from '../../routes'

function Login() {
  const { login } = useUser()
  const navigator = useNavigate()

  const handleLogin = (credentials) => {
    login(credentials, () => {
      navigator(dashboard)
    })
  }

  return (
    <section className='flex justify-content-center' >
      <div className='p-4 pb-6 mt-6' style={{width: '40%', boxShadow: '0 0.5rem 1rem 0 rgba(216, 118, 192, 0.3)'}}>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </section>
    
  )
}

export default Login
