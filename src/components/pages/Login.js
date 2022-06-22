import React, { useState, useEffect, useRef } from 'react'
import api from '../../services/APICalls'
import { InputText } from 'primereact/inputtext'

import { Toast } from 'primereact/toast'
import LoginForm from '../utils/LoginForm'

const Login = () => {
  return (
    <div className="login-wrapper">
      <LoginForm />
    </div>
  )
}

export default Login
