import React from 'react';
import './userprofiling.css'
import API from '../../Utils/api';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { UseAppContext } from '../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';

const UserProfiling =()=>{
    const {loggedIn, loading} = UseAppContext()
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
    

  const handleError = (status, message) => {    
    setError({status : status, msg : message})
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

    const setValues =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setFormValues(prev => {
            return{...prev, [name] : value}
        })
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
          handleError({status: true, msg: "User information not found"})
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
           
            if(!age && !height && !weight && !medicalHistory){
              return handleError(true, "Please fill in your data")
            }
            if(!fitnessLevel){
              return handleError(true, "Please select a fitness level")
            }
            if(!weightLossChecked && !muscleGainChecked && !enduranceImprovementChecked && !functionalFitnessChecked ){
              return handleError(true, "Select one fitness goal")
            }
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

            const result = await Axios(options)
            const {response} = result.data
            if(response === 'Success'){
                return window.location.href = `/record-health-data/${id}`                
            }else if(response === 'Fail'){
                const {message} = result.data
                handleError(true, message)
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
    <div className='user-profiling' >
        <div className='user-profiling-form' xs={12} sm={6} >
            {
                error.status && <div >
                <Alert severity="error">{error.msg}</Alert>
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
                <label >
                  <input
                    type="radio"
                    value="beginner"
                    checked={fitnessLevel === 'beginner'}
                    onChange={handleFitnessLevelChange}
                    style={{ transform: 'scale(1.3)', marginRight:"0.5rem", marginRight:"0.5rem"}}
                    className='user-profiling-radio'
                 />
                  Less than 10 push-ups
                </label>
                <br/>
                <label>
                  <input
                    type="radio"
                    value="intermediate"
                    checked={fitnessLevel === 'intermediate'}
                    onChange={handleFitnessLevelChange}
                    style={{ transform: 'scale(1.3)', marginRight:"0.5rem"}}
                  />
                  10 - 20 push-ups
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="advanced"
                    checked={fitnessLevel === 'advanced'}
                    onChange={handleFitnessLevelChange}
                    style={{ transform: 'scale(1.3)', marginRight:"0.5rem"}}
                  />
                  More than 20 push-ups
                </label>
                <br /><br />
                <h3 className='user-profiling-subtitle'>Fitness Goals</h3>
                <label>
                    <input
                    type="checkbox"
                    checked={weightLossChecked}
                    onChange={() => handleCheckboxChange('weightLoss')}
                    value="weightLoss"
                    style={{transform: 'scale(1.3)', marginRight:"0.5rem"}}
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
                    style={{transform: 'scale(1.3)', marginRight:"0.5rem"}}
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
                    style={{transform: 'scale(1.3)', marginRight:"0.5rem"}}
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
                    style={{transform: 'scale(1.3)', marginRight:"0.5rem"}}
                    />
                    <span className='user-profiling-checkbox'>Functional Fitness</span>
                </label>
                
              <div className='user-profiling-btns'>
                <span className='user-profiling-btn' onClick={submit}>Save and continue</span>
              </div>
            </div>
        </div>
    </div>
)}

export default UserProfiling