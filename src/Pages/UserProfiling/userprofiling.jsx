import React from 'react';
import { Snackbar } from '@mui/material';
import './userprofiling.css'
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

const UserProfiling =()=>{
    const {loggedIn, loading, 
      setCurrentUser, currentUser} = UseAppContext()
    const {id} = useParams()
    const [userData, setUserData] = useState({})
    const [selectedGender, setSelectedGender] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [weightLossChecked, setWeightLossChecked] = useState(false);
    const [muscleGainChecked, setMuscleGainChecked] = useState(false);
    const [enduranceImprovementChecked, setEnduranceImprovementChecked] = useState(false);
    const [functionalFitnessChecked, setFunctionalFitnessChecked] = useState(false)
      const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        age : "",
        height : "",
        weight : '',
        medicalHistory : ''
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

  const handleCheckboxChange = (sport) => {
    switch (sport) {
      case 'weightLoss':
        setWeightLossChecked(!weightLossChecked);
        break;
      case 'muscleGain':
        setMuscleGainChecked(!muscleGainChecked);
        break;
      case 'enduranceImprovement':
        setEnduranceImprovementChecked(!enduranceImprovementChecked);
        break;
    case 'functionalFitness':
        setFunctionalFitnessChecked(!functionalFitnessChecked);
        break;
      default:
        break;
    }
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

    const handleSelectChange = (e) => {
        setSelectedGender(e.target.value);
    };
    const handleFitnessLevelChange = (event) => {
      setFitnessLevel(event.target.value);
    };
    
    const getUser = async()=>{
        const result = await Axios(`${API}/user/${id}/profile`)
        const {data} = result
        if(data){
            setUserData(data)
        }else{
            // const {message} = result.data
            // handleError(true, message)
            // setTimeout(()=>{
            //     setError({status : false, msg :''})
            // }, 4000)
        }
    }

    useEffect(()=>{
        getUser()
    },[])
 

    const submit = async(e)=>{
      
      e.preventDefault()

      const selectedSports = [];

        if (weightLossChecked) {
        selectedSports.push('Weight Loss');
        }
        if (muscleGainChecked) {
        selectedSports.push('Muscle Gain');
        }
        if (enduranceImprovementChecked) {
        selectedSports.push('Endurance Improvement');
        }
        if (functionalFitnessChecked) {
        selectedSports.push('Functional Fitness');
        }

        const {age, height, weight, medicalHistory} = formValues
        const {age: storedAge, gender: storedGender, height: storedHeight, 
            weight: storedWeight, medicalHistory: storedMedicalHistory, 
            fitnessLevel :storedFitnessLevel, fitnessGoals: storedFitnessGoals} = userData
            console.log(selectedSports)
            const options = {
                url: `${API}/user/${id}/profile`,
                method : "PATCH",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                data:{
                    "age": age ? age : storedAge,
                    "gender" : selectedGender ? selectedGender : storedGender,
                    "height" : height ? height : storedHeight,
                    "weight" : weight ? weight : storedWeight,
                    "medicalHistory" : medicalHistory ? medicalHistory : storedMedicalHistory,
                    "fitnessLevel" : fitnessLevel ? fitnessLevel : storedFitnessLevel,
                    "fitnessGoals" : selectedSports.length > 0 ? selectedSports : storedFitnessGoals
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
                return window.location.href = `/record-health-data/${id}`
                // setAlertMsg({status : true, msg : "Please check your email to verify your account"})
                
            }else if(response === 'Fail'){
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
        // setTransparentLoading(false)
      }, [])
    
    if(loading){
        return <div style={{width: "100%",height : "100vh", 
        display: 'div', placeItems: "center"}}>
           <LoadingIcons.Puff       stroke="#555" strokeOpacity={.9} />
       </div>
    }


    return (
    <Row className='user-profiling' >
       
        <div className='user-profiling-form' xs={12} sm={6} >
            
            {
                error.status && <div >alert
                {/* <Alert severity="error">{error.msg}</Alert> */}
              </div>
            }

            <div>
                 <h3 className='user-profiling-title'>Set up Profile</h3>
                 <input className='user-profiling-input' value ={formValues.age}  onChange={setValues} type='number' name='age' placeholder='Age'/>
                <select
                    className='user-profiling-input' 
                    value={selectedGender}
                    onChange={handleSelectChange}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input className='user-profiling-input' value ={formValues.height}  onChange={setValues} type='number' name='height' placeholder='Height'/>
                <input className='user-profiling-input' value ={formValues.weight}  onChange={setValues} type='number' name='weight' placeholder='Weight'/>
                <textarea className='user-profiling-input' value ={formValues.medicalHistory}  onChange={setValues} type='text' name='medicalHistory' placeholder='Medical History'></textarea>
                
                
                <h3 className='user-profiling-subtitle'>Select Fitness Level</h3>
                <label>
                  <input
                    type="radio"
                    value="beginner"
                    checked={fitnessLevel === 'beginner'}
                    onChange={handleFitnessLevelChange}
                  />
                  Less than 10 push-ups
                </label>

                <label>
                  <input
                    type="radio"
                    value="intermediate"
                    checked={fitnessLevel === 'intermediate'}
                    onChange={handleFitnessLevelChange}
                  />
                  10 - 20 push-ups
                </label>

                <label>
                  <input
                    type="radio"
                    value="advanced"
                    checked={fitnessLevel === 'advanced'}
                    onChange={handleFitnessLevelChange}
                  />
                  More than 20 push-ups
                </label>

                
                
                
                <h3 className='user-profiling-subtitle'>Fitness Goals</h3>
                <label>
                    <input
                    type="checkbox"
                    checked={weightLossChecked}
                    onChange={() => handleCheckboxChange('weightLoss')}
                    value="weightLoss"
                    />
                    <span className='user-profiling-checkbox'>Weight Loss</span>
                </label>
                <br/>
                <label>
                    <input
                    type="checkbox"
                    checked={muscleGainChecked}
                    onChange={() => handleCheckboxChange('muscleGain')}
                    value="muscleGain"
                    />
                    <span className='user-profiling-checkbox'>Muscle Gain</span>
                </label>
                <br/>
                <label>
                    <input
                    type="checkbox"
                    checked={enduranceImprovementChecked}
                    onChange={() => handleCheckboxChange('enduranceImprovement')}
                    value="enduranceImprovement"
                    />
                    <span className='user-profiling-checkbox'>Endurance Improvement</span>
                </label>
                <br/>
                <label>
                    <input
                    type="checkbox"
                    checked={functionalFitnessChecked}
                    onChange={() => handleCheckboxChange('functionalFitness')}
                    value="functionalFitness"
                    />
                    <span className='user-profiling-checkbox'>Functional Fitness</span>
                </label>
                
              <div className='user-profiling-btns'>
                <span className='user-profiling-btn2' onClick={submit}>Save and continue</span>
              </div>
            </div>
        </div>
    </Row>
)}

export default UserProfiling