import React from 'react'
import UserCard from '../utils/cards/UserCard'
import UserForm from '../utils/forms/UserForm'



const Dashboard = () => {
  return (
    <>
    <section className='p-8'>
      <UserCard />
    </section>
    <section className='p-4 flex justify-content-center' style={{width: '70%', margin: '0 auto'}}>
      <UserForm />
    </section>
    
    
    </>
  )
}

export default Dashboard
