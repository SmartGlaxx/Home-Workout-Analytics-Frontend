import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WorkoutData } from '../../Utils/data';
import { DummyWorkoutData } from '../../Utils/data';
import { UseAppContext } from '../../Contexts/app-context';
import "./workoutSessions.css"

const WorkoutSessions = () => {
    const { category } = useParams();
    const { exercises } = WorkoutData;
    const [currentWorkouts, setCurrentWorkouts] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [timer, setTimer] = useState(0);
    const [preparationTimer, setPreparationTimer] = useState(0);
    const {currentUserParsed} = UseAppContext()
    const {id} = currentUserParsed

    useEffect(() => {
        const mainCurrentWorkouts = exercises.filter(exercise => exercise.category.toLowerCase() === category)
        setCurrentWorkouts([DummyWorkoutData,...mainCurrentWorkouts]);
    }, [category, exercises]);

    useEffect(() => {
        if (currentWorkouts.length > 0) {
            setCurrentExercise(currentWorkouts[currentExerciseIndex]);
            setPreparationTimer(currentWorkouts[currentExerciseIndex].preparationTime);
        } else {
            setCurrentExercise(null);
        }
    }, [currentWorkouts, currentExerciseIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreparationTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (preparationTimer === 0 && currentWorkouts[currentExerciseIndex]) {
            setTimer(currentWorkouts[currentExerciseIndex].duration);
        }
    }, [preparationTimer, currentExerciseIndex, currentWorkouts]);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            const nextExerciseIndex = currentExerciseIndex + 1;
            if (nextExerciseIndex < currentWorkouts.length) {
                setCurrentExerciseIndex(nextExerciseIndex);
                setPreparationTimer(currentWorkouts[nextExerciseIndex].preparationTime);
                setTimer(currentWorkouts[nextExerciseIndex].duration);
            } else {
                setCurrentExercise(null);
            }
        }
    }, [timer, currentExerciseIndex, currentWorkouts]);

//    console.log(currentUserParsed)
    return (
        <div>
            {currentExercise ? (
                <div>
                    <h3>{currentExercise.name}</h3>
                    <img className="workout-image" src={currentExercise.image} alt={currentExercise.name} />
                    <p>{currentExercise.description}</p>
                    <h3>
                    {preparationTimer > 0 ? (
                        <span>Preparation Time: {preparationTimer} seconds</span>
                    ) : (
                        <span>Duration: {timer} seconds</span>
                    )}</h3>
                    <iframe
                    width="auto"
                    height="auto"
                    src={currentExercise.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
                    allowfullscreen
                    autoPlay
                    ></iframe>
                </div>
            ) : (  
                <div>
                    <h4>Workout Completed</h4>
                    <Link to={`/record-body-metrics/${id}`} ><button className="competed-button">Record Body Metrics</button></Link>
                </div>
            )}
            {/* <div className='workout-complete'>
                <div>
                    <h4>Workout Completed</h4>
                    <Link to={`/record-body-metrics/${id}`} ><button className="competed-button">Record Body Metrics</button></Link>
                </div>
            </div> */}
        </div>
    );
};

export default WorkoutSessions;
