import React from 'react'
import { useParams } from 'react-router-dom'
import { WorkoutData } from '../../Utils/data';

const Workout = () => {
  const {id} = useParams()
  const {exercises} = WorkoutData
  const exercise = exercises.filter(workout => workout.id == id)
  
 const {name, category, intensity, duration, caloriesBurnt,
   equipment, description, image, video} = exercise[0]
 
  return (
    <div> 
      <h5>{name}</h5>
      <div>{category}</div>
      <div>{intensity}</div>
      <div>{description}</div>
      <img className="workout-image" src={image} alt={name} />
      <iframe
      width="auto"
      height="auto"
      src={video}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
    </div>
  )
}

export default Workout