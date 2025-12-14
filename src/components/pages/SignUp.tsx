import { useUser } from '../../hooks/useUser'
import { useNavigation } from '../../hooks/useNavigation'
import RegisterForm from '../utils/forms/RegisterForm'
import { NewUser } from '../../models/User'

function SignUp() {
  const { signup } = useUser()
  const navigator = useNavigation()

  const handleRegister = (data: NewUser) => {
    signup(data, (response) => {
      if (response)
        navigator.goToDashboard()
    })
  }

  return (
    <section className='flex justify-content-center' >
      <div className='mt-6' style={{width: '70%', boxShadow: '0 0.5rem 1rem 0 rgba(216, 118, 192, 0.3)'}}>
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </section>
    
  )
}

export default SignUp
