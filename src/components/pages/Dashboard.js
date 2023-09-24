import React from 'react'
import UserCard from '../utils/cards/UserCard'
import UserForm from '../utils/forms/UserForm'



const Dashboard = () => {
  return (
    <>
    <section className='p-8'>
      <UserCard />
    </section>
    <section className='flex justify-content-center'>
      <UserForm />
    </section>
    
    
    </>
  )
}

export default Dashboard
