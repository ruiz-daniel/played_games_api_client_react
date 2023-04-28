import React from 'react'

import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'

import { useForm } from 'react-hook-form'

import weissIcon from '../../images/KUIYU.png'
import { useUserContext } from '../../hooks/useUserContext'

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const { user } = useUserContext()

  const onSubmit = (data) => {
    console.log(data)
  }

  const onUpload = () => {}

  
  return (
    <>
      <div className="grid pt-4 md:pt-8">
        <div className="dashboard-user-info flex flex-column align-items-start col-12 lg:col-5">
          <div className="pl-4 md:pl-8">
            <Avatar
              image={user?.profile_picture || weissIcon}
              className="mr-4"
              size="xlarge"
              shape="circle"
            />
            <h1>{sessionStorage.getItem('display_name')}</h1>
            <h3>@{sessionStorage.getItem('username')}</h3>
          </div>
          <div className="col-12 text-center">
            <h2>Playing Games</h2>
          </div>
        </div>
        <div className="px-3 col-12 lg:col-7">
          {user && (
            <div className="dashboard-user-details">
              <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="item flex flex-column">
                    <label>Username</label>
                    <InputText
                      defaultValue={user.username}
                      disabled
                      {...register('username')}
                    />
                  </div>
                  <div className="item flex flex-column">
                    <label>Display Name</label>
                    <InputText
                      defaultValue={user.display_name}
                      {...register('display_name', { required: true })}
                    />
                    {errors.display_name && (
                      <div className="error-message">
                        Display Name is required
                      </div>
                    )}
                  </div>
                  <div className="item flex flex-column">
                    <label>Email Address</label>
                    <InputText
                      defaultValue={user.email}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">Email is required</div>
                  )}
                  <div className="item flex flex-column">
                    <label>Profile Picture</label>
                    <FileUpload
                      customUpload
                      auto
                      mode="basic"
                      uploadHandler={onUpload}
                      accept="image/*"
                      chooseLabel="File"
                    />
                  </div>
                  <div className="item flex flex-row-reverse">
                    <Button label="Save Changes" type="submit" className='button-span text-only-button' />
                  </div>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className="col-12 flex justify-content-center">
        <div className="w-50" style={{ width: '50%' }}></div>
      </div>
    </>
  )
}

export default Dashboard
