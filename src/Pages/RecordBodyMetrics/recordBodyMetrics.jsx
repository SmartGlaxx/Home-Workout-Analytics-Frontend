import React from 'react';
import { Snackbar } from '@mui/material';
import './recordBodyMetrics.css'
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

const RecordBodyMetrics =()=>{
    const {loggedIn, loading, 
      setCurrentUser, currentUser} = UseAppContext()
    const {id} = useParams()    
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        chestCircumference : "",
        waistCircumference : "",
        hipCircumference : "",
    })
   
  const [open, setOpen] = React.useState(false);
  
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
        
        const {waistCircumference, hipCircumference, chestCircumference } = formValues
            
            const options = {
                url: `${API}/metrics/${id}/body-metrics`,
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                data:{
                    "userId" : id,
                    "date": "2021",
                    "chestCircumference" : chestCircumference,
                    "waistCircumference" : waistCircumference,
                    "hipCircumference" : hipCircumference
                }
            }

            const result = await Axios(options)
            const {response, bodyMetrics} = result.data
            
            if(response === 'Success'){
                return window.location.href = `/report/${id}`                
            }else if(response === 'Fail'){
                const {message} = result.data
                handleError(true, message)
                setTimeout(()=>{
                    setError({status : false, msg :''})
                }, 4000)
            }
      }catch(error){
        handleError(true, "Error recording body metrics")
      }

          
        
    }
    

//scroll to top of page
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
    <Row className='user-health-data' >
       
        <div className='user-health-data-form' xs={12} sm={6} >
            
            {
                error.status && <div >
                <Alert severity="error">{error.msg}</Alert>
              </div>
            }

            <div>
                 <h3 className='user-health-data-title'>Body Metrics</h3>
                 <input className='user-health-data-input' value ={formValues.chestCircumference}  onChange={setValues} type='number' name='chestCircumference' placeholder='Chest Circumference'/>
                 <input className='user-health-data-input' value ={formValues.waistCircumference}  onChange={setValues} type='number' name='waistCircumference' placeholder='Waist Circumference'/>
                 <input className='user-health-data-input' value ={formValues.hipCircumference}  onChange={setValues} type='number' name='hipCircumference' placeholder='Hip Circumference'/>
              <div className='user-health-data-btns'>
                <span className='user-health-data-btn2' onClick={submit}>Save and continue</span>
              </div>
            </div>
        </div>
    </Row>
)}

export default RecordBodyMetrics