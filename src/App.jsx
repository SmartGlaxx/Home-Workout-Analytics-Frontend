import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'
import {Signup, SignIn, HomePage, Workout, UserProfile, UserProfiling, 
  RecordHealthData, WorkoutSessions, RecordBodyMetrics, HealthReport} from './Pages/index.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Router>
       <Routes>
          <Route path='/signup' element={<Signup/>} exact/>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/profiling/:id' element={<UserProfiling/>} />
          <Route path='/record-health-data/:id' element={<RecordHealthData/>} />
          <Route path='/' element={<HomePage/>} exact/>
          <Route path='/workout/:id' element={<Workout/>} exact/>
          <Route path='/workout-session/:category' element={<WorkoutSessions/>} exact/>
          <Route path='/record-body-metrics/:id' element={<RecordBodyMetrics/>} exact/>
          <Route path='/report/:id' element={<HealthReport/>} exact/>
          

         <Route path='/userprofile/:id/:username' element={<UserProfile/>} exact/>
         {/* <Route path='*' element={<ErrorPage/>} exact/> */}
       </Routes>
    </Router>
    </>
  )
}

export default App
