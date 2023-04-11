import React from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'

import { useForm } from 'react-hook-form'

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <div>
      <Panel header="Register" className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-column login-form-content">
            <h5>Username*</h5>
            <InputText
              className="p-mb-3"
              {...register('username', { required: true })}
            />
            {errors.username && (
              <div className="error-message"> Name required </div>
            )}
            <h5>Display Name*</h5>
            <InputText
              className="p-mb-3"
              {...register('display_name', { required: true })}
            />
            {errors.display_name && (
              <div className="error-message"> Display Name required </div>
            )}
            <h5>Email</h5>
            <InputText
              className="p-mb-3"
              {...register('email')}
            />
            <h5>Password*</h5>
            <InputText
              type="password"
              className="p-mb-3"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="error-message"> Password required </div>
            )}
            <h5>Confirm Password*</h5>
            <InputText
              type="password"
              className="p-mb-3"
              {...register('password_confirm', {
                required: true,
                validate: (value) => {
                  return watch('password') === value || "Passwords should match!"
                }
              })}
            />
            {errors.password_confirm && (
              <div className="error-message"> Passwords don't match</div>
            )}
            <Button
              className="upload-button mt-4"
              label="Register"
              type="submit"
            />
          </div>
        </form>
      </Panel>
    </div>
  )
}

export default RegisterForm
