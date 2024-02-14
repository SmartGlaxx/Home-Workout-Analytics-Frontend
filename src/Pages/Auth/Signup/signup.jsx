import React from 'react';
import { Snackbar } from '@mui/material';
import './signup.css'
import API from '../../../Utils/api';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import {FaExclamationCircle, FaWindowClose} from 'react-icons/fa'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UseAppContext } from '../../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import { Row, Col } from 'react-bootstrap';

const Signup =()=>{
    const {loggedIn, loading, 
      setCurrentUser, currentUser} = UseAppContext()
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        firstname : "",
        lastname : "",
        username : '',
        email : '',
        password1 : "",
        password2 : "",
    })
    const navigate = useNavigate()

    //Snackbar Alert start
   
  const [open, setOpen] = React.useState(false);
  
  const handleError = (status, message) => {
    setOpen(true);
    setError({status : status, msg : message})
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  //Snackbar Alert ends

  const setSignupValues =(data)=>{
    setCurrentUser(data) 
    // setTransparentLoading(false)
  }


  //close alert box
//   const closeAlertBox = ()=>{
//     setAlertMsg(false)
// }

    const setValues =(e)=>{
        let name = e.target.name
        let value = e.target.value
        if(name=='username'){
            value = value.replace(/\s+/g, '')
        }
        setFormValues(prev => {
            return{...prev, [name] : value}
        })
    }

     // Enter key to submit
     const enterClicked =(e)=>{
        if(e.charCode === 13){
            submit(e)
          }
    }
    const signedup= "signup-successful-FSGDNHFGdgoeskpagesreASFNDGFHDSAEOFVGSBFafsSDAFGIUNJimdsfgoeskpagesreASFNDGFHDSAEOFVGSBFafsndgmosagFSGDNHFGdgoeskpagesreASFNDGFHDSAEOFVGSBFafsndgmosagFSGDNHFG"

    const submit = async(e)=>{
      
      e.preventDefault()
      const { firstname, lastname, username, email, password1, password2} = formValues
     
        if(!firstname){
          setError({status : true, msg : "Please enter Your first name"})
          setTimeout(()=>{
             return setError({status : false, msg :''})
          }, 4000)
       }else if(!lastname){
          setError({status : true, msg : "Please enter Your last name"})
          setTimeout(()=>{
              setError({status : false, msg :''})
          }, 4000)
      }else if(!username){
          setError({status : true, msg : "Please enter Your Username"})
          setTimeout(()=>{
              setError({status : false, msg :''})
          }, 4000)
      }else if(!email){
          setError({status : true, msg : "Please enter Your E-mail"})
          setTimeout(()=>{
              setError({status : false, msg :''})
          }, 4000)
      }else if(password2.length == 0 || password1.length == 0){
          setError({status : true, msg : "Please enter and comfirm your password"})
          setTimeout(()=>{
              setError({status : false, msg :''})
          }, 4000)
      } else if(password2.length < 8 || password1.length < 8){
        // handleError(true, "Password Must be 8 characters long")
        setTimeout(()=>{
            setError({status : false, msg :''})
        }, 4000)
    }else{
            if(password2 !== password1){
              // handleError(true, "Password Mismatch")
              // setTimeout(()=>{
              //     setError({status : false, msg :''})
              // }, 4000)
           }else{
          // setTransparentLoading(true)
            const options = {
                url: `http://localhost:5000/auth/sign-up`,
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                data:{
                    firstname : firstname, 
                    lastname : lastname,
                    username : username,
                    email : email,
                    password : password1
                }
            }

            setTimeout(()=>{
              setError({status : true, msg :"Please check your network connection"})
            },10000)
            setTimeout(()=>{
              setError({status : false, msg :""})
            },16000)
            const result = await Axios(options)
            const {response, user} = result.data
            const id = user._id
            if(response === 'Success'){
                // setSignupValues(singupdData)
                return window.location.href = `/profiling/${id}`
                // setAlertMsg({status : true, msg : "Please check your email to verify your account"})
                
            }else if(response === 'Fail'){
                const {message} = result.data
                handleError(true, message)
                setTimeout(()=>{
                    setError({status : false, msg :''})
                }, 4000)
            }

          }
        }
    }
//scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0)
        // setTransparentLoading(false)
      }, [])
    
    if(loading){
        return <div style={{width: "100%",height : "100vh", 
        display: 'div', placeItems: "center"}}>
           <LoadingIcons.Puff       stroke="#555" strokeOpacity={.9} />
       </div>
    }


    return (
    <div className='signup' >
        <div className='signup-heading' xs={12} sm={6}>
            <h2 className='title'>Home Workout and Analytics</h2>
        </div>
        <div className='signup-form' xs={12} sm={6} >
            
            {
                error.status && <div >alert
                {/* <Alert severity="error">{error.msg}</Alert> */}
              </div>
            }
            <div>
                 <h3 className='sign-up-title'>Sign Up</h3>
                 <input className='signup-input' value ={formValues.firstname}  onChange={setValues} type='text' name='firstname' placeholder='Firstname'/>
                 <input className='signup-input' value ={formValues.lastname}  onChange={setValues} type='text' name='lastname' placeholder='Lastname'/>
                <input className='signup-input' value ={formValues.username}  onChange={setValues} type='text' name='username' placeholder='Username'/>
                <input className='signup-input' value ={formValues.email}  onChange={setValues} type='email' name='email' placeholder='E-Mail'/>
                <input className='signup-input' value ={formValues.password1}  onChange={setValues} type='password' name='password1' placeholder='Password'/>
                <input className='signup-input' value ={formValues.password2}  onChange={setValues} type='password' name='password2' placeholder='Comfirm Password'/>
                {/* <Button className='btn'  onClick={submit}>Sign up</Button> */}
              <div className='auth-btns'>
                <span className='auth-signup-btn2' onClick={submit}>Sign up</span>
                
              </div>
              <div className='auth-alt-text'>Already have an account? <br/><Link to='/signin' className='auth-signup-btn' >Sign in</Link></div>
            </div>
        </div>
    </div>
)}

export default Signup