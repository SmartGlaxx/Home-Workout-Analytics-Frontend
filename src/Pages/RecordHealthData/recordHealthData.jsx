import React from 'react';
import { Snackbar } from '@mui/material';
import './recordhealthdata.css'
import API from '../../Utils/api';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import {FaExclamationCircle, FaWindowClose} from 'react-icons/fa'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UseAppContext } from '../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import { Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';

const RecordHealthData =()=>{
    const {loggedIn, loading, 
      setCurrentUser, currentUser} = UseAppContext()
    const {id} = useParams()
    // const [userData, setUserData] = useState({})
    const [selectedGender, setSelectedGender] = useState('');
    const [weightLossChecked, setWeightLossChecked] = useState(false);
    const [muscleGainChecked, setMuscleGainChecked] = useState(false);
    const [enduranceImprovementChecked, setEnduranceImprovementChecked] = useState(false);
    const [functionalFitnessChecked, setFunctionalFitnessChecked] = useState(false)
      const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        systolicPressure : "",
        diastolicPressure : "",
        restingHeartRate : '',
    })
    const navigate = useNavigate()

    //Snackbar Alert start
   
  const [open, setOpen] = React.useState(false);
  
  const handleError = (status, message) => {
    setOpen(true);
    setError({status : status, msg : message})
  };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  
  //Snackbar Alert ends

  // const setSignupValues =(data)=>{
  //   setCurrentUser(data) 
  //   // setTransparentLoading(false)
  // }


  //close alert box
//   const closeAlertBox = ()=>{
//     setAlertMsg(false)
// }

    const setValues =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setFormValues(prev => {
            return{...prev, [name] : value}
        })
    }

     // Enter key to submit
    //  const enterClicked =(e)=>{
    //     if(e.charCode === 13){
    //         submit(e)
    //       }
    // }

    // const handleSelectChange = (e) => {
    //     setSelectedGender(e.target.value);
    //   };
    
    // const getUser = async()=>{
    //     const result = await Axios(`${API}/user/${id}/profile`)
    //     const {data} = result
    //     if(data){
    //         setUserData(data)
    //     }else{
    //         // const {message} = result.data
    //         // handleError(true, message)
    //         // setTimeout(()=>{
    //         //     setError({status : false, msg :''})
    //         // }, 4000)
    //     }
    // }

    // useEffect(()=>{
    //     getUser()
    // },[])
 

    const submit = async(e)=>{
      
      e.preventDefault()
      try{
        
        const {systolicPressure, diastolicPressure, restingHeartRate} = formValues
        
            
            const options = {
                url: `${API}/health/${id}/health-assessment`,
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                data:{
                    "userId" : id,
                    "date": "2021",
                    "systolicPressure" : systolicPressure,
                    "diastolicPressure" : diastolicPressure,
                    "restingHeartRate" : restingHeartRate
                }
            }

            // setTimeout(()=>{
            //   setError({status : true, msg :"Please check your network connection"})
            // },10000)
            // setTimeout(()=>{
            //   setError({status : false, msg :""})
            // },16000)
            const result = await Axios(options)
            const {response} = result.data
            if(response === 'Success'){
                // setSignupValues(singupdData)
                return window.location.href = '/'
                // setAlertMsg({status : true, msg : "Please check your email to verify your account"})
                
            }else if(response === 'Fail'){
                const {message} = result.data
                handleError(true, message)
                setTimeout(()=>{
                    setError({status : false, msg :''})
                }, 4000)
            }
      }catch(error){
        handleError(true, "Error recording health data")
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
    <Row className='user-health-data' >
       
        <div className='user-health-data-form' xs={12} sm={6} >
            
            {
                error.status && <div >
                <Alert severity="error">{error.msg}</Alert>
              </div>
            }

            <div>
                 <h3 className='user-health-data-title'>Health Data</h3>
                 <input className='user-health-data-input' value ={formValues.systolicPressure}  onChange={setValues} type='number' name='systolicPressure' placeholder='Systolic Pressure'/>
                 <input className='user-health-data-input' value ={formValues.diastolicPressure}  onChange={setValues} type='number' name='diastolicPressure' placeholder='Diastolic Pressure'/>
                 <input className='user-health-data-input' value ={formValues.restingHeartRate}  onChange={setValues} type='number' name='restingHeartRate' placeholder='Resting Heart Rate'/>
              <div className='user-health-data-btns'>
                <span className='user-health-data-btn2' onClick={submit}>Save and continue</span>
              </div>
            </div>
        </div>
    </Row>
)}

export default RecordHealthData