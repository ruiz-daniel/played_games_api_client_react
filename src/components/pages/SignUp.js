import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../utils/forms/RegisterForm'
import { dashboard } from '../../routes'

function SignUp() {
  const { signup } = useUser()
  const navigator = useNavigate()

  const handleRegister = (data) => {
    signup(data, () => {
      navigator(dashboard)
    })
  }

  return (
    <section className='flex justify-content-center' >
      <div className='p-4 pb-6 mt-6' style={{width: '40%', boxShadow: '0 0.5rem 1rem 0 rgba(216, 118, 192, 0.3)'}}>
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </section>
    
  )
}

export default SignUp
