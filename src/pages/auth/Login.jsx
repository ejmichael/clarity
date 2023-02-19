import React, {useContext, useState} from 'react'
import './auth.css'

import {Link, useNavigate} from 'react-router-dom'

//auth
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'
import { Button, Typography } from '@mui/material'

const Login = () => {

  const navigate = useNavigate();
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {dispatch} = useContext(AuthContext)

  const signIn = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError(false)

    if(email === '' || password === '') {
      alert('Please enter your email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user})
        navigate('/')
      })
    } catch (error) {
        setError(true);
        setLoading(false);
    }

  }

  return (
    <div className="login">
      <div className="heading">
        <Typography variant="h3" color="red">Login</Typography>
      </div>
      <form onSubmit={signIn}>
        <input 
          type="email" 
          name='email' required 
          placeholder="Email Address"
          onChange={(e) => {setEmail(e.target.value)}}
          value={email}
        />
        <input 
          type="password" 
          name='password' 
          placeholder="Password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <Button onClick={signIn} variant="contained" color="error">{loading ? "Logging in..." : "Login"}</Button>
          {error ? <p>You entered the wrong email or password!</p> : null}
        <Link to='/register' style={{textDecoration: 'none', marginTop: '5px'}}>
          <Button variant="outlined" color="error">Register</Button>
        </Link>
      </form>
    </div>
  )
}

export default Login