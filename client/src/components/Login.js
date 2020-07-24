import React, {Component, useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory()
  const [userinfo, setUserinfo] = useState({
    username: 'lambda',
    password: 'school'
  })

  const handleSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', userinfo)
      .then(res => {
        // console.log(res)
        localStorage.setItem('token', JSON.stringify(res.data.payload))
        history.push('/bubbles')
      })
      .catch(err => console.log(`Error at login attempt`, err))
  }

  const handleChange = e => {
    setUserinfo({
      ...userinfo,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <div>
      <h1>Bubble Bobble</h1>
    
        <form>
      <div>
          <input name='username'
           label="Username" 
           variant='outlined' 
           value={userinfo.username} 
           onChange={handleChange} />
          <br />
          <input name='password'
           label="Password" 
           variant='outlined' 
           value={userinfo.password} 
           onChange={handleChange} />
          <br />
          <button variant='contained' onClick={handleSubmit}>Login</button>
      </div>
        </form>
    </div>
  );
};

export default Login;