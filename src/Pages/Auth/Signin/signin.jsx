import React from 'react';
// import Snackbar from '@material-ui/core/Snackbar';
import { Snackbar } from '@mui/material';
// import MuiAlert from '@material-ui/lab/Alert';
// import Alert from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
// import {makeStyles} from '@mui/styles';
import './signin.css'
import API from '../../../Utils/api';
// import Grid from '@mui/material';
// import Button from '@mui/material';
// import { Button, div} from '@material-ui/core'
import { useState, useEffect } from 'react'
import {FaExclamationCircle, FaLeaf} from 'react-icons/fa'
import Axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { UseAppContext } from '../../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
// import { ParticlesComponent, TransparentLoader } from '../../../Components';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }
  
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: '20rem',
  //     '& > * + *': {
  //       marginTop: theme.spacing(2),
  //     },
  //     position:"absolute",
  //     top:"30%",
  //     left : "50%",
  //     transform : "translate(-50%)",
  //     zIndex : "10"
  //   },
  // }));
  

const SignIn =()=>{
    const {loading, loggedIn, currentUser, setCurrentUser, setLoggedIn} = UseAppContext()
    const [error, setError] = useState({status: false, msg :''})
    const [signedupSuccessful, setSignedupSuccessful] = useState(false)
    const [formValues, setFormValues] = useState({
        emailOrUsername : '',
        password : ""
    })

    //Snackbar Alert start
    // const classes = useStyles();
    const {activity} = useParams() 
    
  const [open, setOpen] = React.useState(false);
  
  const handleError = (status, message) => {
    setOpen(true);
    setError({status : status, msg : message})
    // setTransparentLoading(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  //Snackbar Alert ends
// console.log("new signuo", signupSuccessful)
  useEffect(()=>{
    // setTransparentLoading(false)
  },[])

    const setLoginValues =(value, loginData)=>{
        setCurrentUser(loginData)
        setLoggedIn(value)
        // setTransparentLoading(false)
    
    }
    const setValues =(e)=>{
        const name = e.target.name
        const value = e.target.value
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
    const submit = async(e)=>{
         e.preventDefault()
        // setTransparentLoading(true)
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
           
            setTimeout(()=>{
              setError({status : true, msg :"Please check your network connection"})
            },10000)
            setTimeout(()=>{
              setError({status : false, msg :""})
            },16000)
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
    }

   

//scroll to top of page
useEffect(() => {
    window.scrollTo(0, 0)
    if(activity == "signup-successful-FSGDNHFGdgoeskpagesreASFNDGFHDSAEOFVGSBFafsSDAFGIUNJimdsfgoeskpagesreASFNDGFHDSAEOFVGSBFafsndgmosagFSGDNHFGdgoeskpagesreASFNDGFHDSAEOFVGSBFafsndgmosagFSGDNHFG"){
      setSignedupSuccessful(true)
      setTimeout(() => {
        setSignedupSuccessful(false)
      }, 6000);
    }
    
  }, [])

    if(loading){
        return <div style={{width: "100%",height : "100vh", 
        display: 'div', placeItems: "center"}}>
           <LoadingIcons.Puff       stroke="#555" strokeOpacity={.9} />
       </div>
    }
    // const particlesInit = (main) => {
    //   console.log(main);
  
    //   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // };
  
    // const particlesLoaded = (container) => {
    //   // console.log(container);
    // };
    return (
    <div className='signin' >

        <div className='signin-heading' xs={12} sm={6} >
            <div className='title'>Home Workout and Analytics</div>
        </div>
        <div className='signin-form' xs={12} sm={6} >
            {
              signedupSuccessful &&
              <div >
              {/* <Alert severity="success">Signup Successfull. Please Sign-in</Alert> */}
            </div>
            }
            {
                error.status && <div >Alert
                {/* <Alert severity="error">{error.msg}</Alert> */}
              </div>
                
            }
            {/* {
              transparentLoading && <TransparentLoader />
            } */}
            <div>
                 <h3 className='sign-in-title'>Welcome Back</h3>
                <input className='signin-input' value ={formValues.emailOrUsername} onChange={setValues} 
                 type='text' name='emailOrUsername' placeholder='E-mail/Username' required/>
                <input className='signin-input' value ={formValues.password}  onChange={setValues} 
                type='password' name='password' placeholder='Password' required/>
              <div className='auth-btns'>
                <button className='auth-signin-btn2' onClick={submit}>Sign in</button>
              </div>
              <div className='auth-alt-text'>New user? <Link to='/signup' className='auth-signup-btn' >Register</Link> an account</div>
            </div>
        </div>
    </div>
)}

export default SignIn







