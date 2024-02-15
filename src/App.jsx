import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'
import {Signup, SignIn, HomePage, Workout, UserProfiling, 
  RecordHealthData, WorkoutSessions, RecordBodyMetrics, HealthReport,  
  ErrorPage} from './Pages/index.jsx'

function App() {
  
  return (
    <>
   <Router>
       <Routes>
          <Route path='/sign-up' element={<Signup/>} exact/>
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/profiling/:id' element={<UserProfiling/>} />
          <Route path='/record-health-data/:id' element={<RecordHealthData/>} />
          <Route path='/' element={<HomePage/>} exact/>
          <Route path='/workout/:id' element={<Workout/>} exact/>
          <Route path='/workout-session/:category' element={<WorkoutSessions/>} exact/>
          <Route path='/record-body-metrics/:id' element={<RecordBodyMetrics/>} exact/>
          <Route path='/report/:id' element={<HealthReport/>} exact/>
          
         <Route path='*' element={<ErrorPage/>} exact/>
       </Routes>
    </Router>
    </>
  )
}

export default App
