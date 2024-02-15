import React from 'react';
import './recordhealthdata.css'
import API from '../../Utils/api';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { UseAppContext } from '../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';

const RecordHealthData =()=>{
    const {loading} = UseAppContext()
    const {id} = useParams()
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        systolicPressure : "",
        diastolicPressure : "",
        restingHeartRate : '',
    })

  const handleError = (status, message) => {
    setOpen(true);
    setError({status : status, msg : message})
  };

  const setValues =(e)=>{
      let name = e.target.name
      let value = e.target.value

      setFormValues(prev => {
          return{...prev, [name] : value}
      })
  }



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

            const result = await Axios(options)
            const {response} = result.data
            if(response === 'Success'){
                return window.location.href = '/'
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
    <div className='user-health-data' >
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
    </div>
)}

export default RecordHealthData