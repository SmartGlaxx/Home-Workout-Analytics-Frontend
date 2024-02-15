import React from 'react';
import './signin.css'
import API from '../../../Utils/api';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { UseAppContext } from '../../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import Alert from '@mui/material/Alert';

const SignIn =()=>{
    const {loading, loggedIn, setCurrentUser, setLoggedIn} = UseAppContext()
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        emailOrUsername : '',
        password : ""
    })
  
  const handleError = (status, message) => {
    setError({status : status, msg : message})
  };


    const setLoginValues =(value, loginData)=>{
        setCurrentUser(loginData)
        setLoggedIn(value)    
    }
    const setValues =(e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormValues(prev => {
            return{...prev, [name] : value}
        })
    }

    if(loggedIn == "true"){
      return window.location.href = `/`
    }

    const submit = async(e)=>{

        try{
          e.preventDefault()
          const {emailOrUsername, password} = formValues
          
          if(!emailOrUsername || !password){
              setError({status : true, msg : "Please enter E-mail or Username and Password"})
              setTimeout(()=>{
                  setError({status : false, msg :''})
              }, 4000)
          }
              const options = {
                  url: `${API}/auth/sign-in`,
                  method : "POST",
                  headers : {
                      "Accept" : "application/json",
                      "Content-Type" : "application/json;cjarset=UTF-8"
                  },
                  data:{
                      emailOrUsername : emailOrUsername,
                      password : password
                  }
              }


              const result = await Axios(options)
              
              const requestResponse = result.data.response
              if(requestResponse === 'Success'){
                  const {loginData} = result.data
                  
                  setLoginValues(true, loginData)
                  return window.location.href = '/'
              }else if(requestResponse === 'Fail'){
                  const {message} = result.data
                  handleError(true, message)
                  setTimeout(()=>{
                      setError({status : false, msg :''})
                  }, 4000)
              }
        }catch(error){
          handleError(true, "Error signing in")
          setTimeout(()=>{
            setError({status : false, msg :''})
        }, 4000)
        }
    }

   
useEffect(() => {
    window.scrollTo(0, 0)    
  }, [])

    if(loading){
        return <div style={{width: "100%",height : "100vh", 
        display: 'div', placeItems: "center"}}>
           <LoadingIcons.Puff       stroke="#555" strokeOpacity={.9} />
       </div>
    }

    return (
    <div className='signin' >
          {
              error.status && <div className='alert' style={{position:"absolute"}}>
              <Alert severity="error">{error.msg}</Alert>
            </div>
              
          }
        <div className='signin-heading' >
            <div className='title'>Home Workout and Analytics</div>
        </div>
        <div className='signin-form' >
            <div>
                 <h4 className='sign-in-title'>Welcome Back</h4>
                <input className='signin-input' value ={formValues.emailOrUsername} onChange={setValues} 
                 type='text' name='emailOrUsername' placeholder='E-mail/Username' required/>
                <input className='signin-input' value ={formValues.password}  onChange={setValues} 
                type='password' name='password' placeholder='Password' required/>
              <div className='auth-btns'>
                <button className='auth-signin-btn-main' onClick={submit}>Sign in</button>
              </div>
              <div className='auth-alt-text'>New user? <Link to='/sign-up' className='auth-signin-btn' >Register</Link> an account</div>
            </div>
        </div>
    </div>
)}

export default SignIn







