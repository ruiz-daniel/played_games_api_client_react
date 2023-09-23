import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { useForm } from 'react-hook-form'
import { useUser } from '../../../hooks/useUser'

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const { user, update } = useUser()

  const onSubmit = (data) => {
    data._id = user._id
    update(data)
  }

  return (
    <>
      {user && (
            <form onSubmit={handleSubmit(onSubmit)} className='game-form' style={{width: '100%'}}>
              <div className="game-form-item">
                <label>Username</label>
                <InputText
                  defaultValue={user.username}
                  disabled
                  {...register('username')}
                />
              </div>
              <div className="game-form-item">
                <label>Display Name</label>
                <InputText
                  defaultValue={user.display_name}
                  {...register('display_name', { required: true })}
                />
                {errors.display_name && (
                  <div className="error-message">Display Name is required</div>
                )}
              </div>
              <div className="game-form-item">
                <label>Email Address</label>
                <InputText defaultValue={user.email} {...register('email')} />
              </div>
              {errors.email && (
                <div className="error-message">Email is required</div>
              )}
              <div className="game-form-item flex flex-row-reverse">
                <Button
                  label="Save Changes"
                  type="submit"
                  className="button-span text-only-button"
                />
              </div>
            </form>
      )}
    </>
  )
}

export default UserForm
