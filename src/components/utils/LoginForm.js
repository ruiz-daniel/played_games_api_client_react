import React from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'

import { useForm } from 'react-hook-form'

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    if (onLogin) onLogin(data.username, data.password)
  }

  return (
    <div>
      <Panel header="Login" className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-column login-form-content">
            <h5>Username</h5>
            <InputText
              className="p-mb-3"
              {...register('username', { required: true })}
            />
            {errors.name && (
              <div className="error-message"> Name required </div>
            )}
            <h5>Password</h5>
            <InputText
              type="password"
              className="p-mb-3"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="error-message"> Password required </div>
            )}
            <Button className="upload-button mt-4" label="Login" type="submit">
              {' '}
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  )
}

export default LoginForm
