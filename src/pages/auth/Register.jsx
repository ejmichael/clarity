import React, {useState} from 'react'
import './auth.css'

import {Link, useNavigate} from 'react-router-dom'

//auth
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Button, Typography } from '@mui/material'

const Register = () => {

    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const registerAccount = async(e) => {
        e.preventDefault();
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password, displayName).then(() => {
          updateProfile(auth.currentUser, {
            displayName: displayName
          })
        }).then((s) => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
            setError(err.message);
            setLoading(false);
        })
    }


  return (
    <div className="login">
      <div className='heading'>
        <Typography variant="h3" color="red">Register</Typography>
      </div>
      <form onSubmit={registerAccount}>
        <input 
          type="name" 
          name='name' 
          required 
          placeholder="Enter your name"
          onChange={(e) => { setDisplayName(e.target.value)}}
          value={displayName}
        />
        <input 
          type="email" 
          name='email' required 
          placeholder="Email Address"
          onChange={(e) => { setEmail(e.target.value)}}
          value={email}
        />
        <input 
          type="password" 
          name='password' 
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value)}}
        />
        <Button onClick={registerAccount} variant="contained" color="error">{loading ? "Registering account..." : "Register"}</Button>
          {error ? <p>{error}</p> : null}
        <Link to='/Login' style={{textDecoration: 'none', marginTop: '5px'}}>
          <Button variant="outlined" color="error">Have an account?</Button>
        </Link>
      </form>
    </div>
  )
}

export default Register