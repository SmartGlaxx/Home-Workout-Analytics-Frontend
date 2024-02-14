import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UseAppContext } from '../../Contexts/app-context'
import {Topbar, Sidebar, Backdrop} from '../../Components';
import { FaUserAlt, FaImages, FaExclamationCircle, FaPlane, FaTelegramPlane, FaWindowClose } from 'react-icons/fa'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import { Link } from 'react-router-dom';
import ProfileImage from '../../assets/profile.jpg'
import LoadingIcons from 'react-loading-icons'
import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { WorkoutData } from '../../Utils/data';
// import img5 from "../../assets/exercises/abdominalCrunches.png"
const HomePage =()=>{
    const {currentUserParsed, currentUser, loggedIn
        // loggedIn, loading, setLazyLoading, lazyLoading, currentUser,timelineposts, allUsers, postcreated, 
        // setPostCreated, currentUserParsed, fetchedUser
    } = UseAppContext()
    const {_id : userId, username : userUsername, firstname, lastname, followings, followers, 
        profilePicture , coverPicture : userCoverPicture} = currentUserParsed
    const [formValue, setFormValue] = useState('')
    const [error, setError] = useState({status : false, msg:''})
    let [page, setPage] = useState(0)
    let [incrementor, setIncrementor] = useState(1)
    const [timeline, setTimeline] = useState([])
    const [arrayofArrayList, setArrayofArrayList] = useState([])
    const [newTimeLinePostsText, setNewTimeLinePostsText] = useState([])


// const [postPicturePreview, setPostPicturePreview] = useState('')
// const [postImage, setPostImage] = useState('')
// const [postPreviewBox, setPostPreviewBox] = useState(false)

// const setValues = (e)=>{
//     setFormValue(e.target.value)
// }

// const setPostData = (value1, value2)=>{
//     setAlertMsg({status : value1, msg : value2})
//     setPostPreviewBox(false)
//     setPostCreated(true)
//     setFormValue('')
//     setTimeout(()=>{
//         setPostCreated(false)
//     }, 3000)
// }

// const setCancelValues = ()=>{
//     setPostPreviewBox(false)
//     setFormValue('')
//     setPostImage('')
    
//     // window.location.reload()
// }

//select post pic
// const selectPostPic = (e)=>{
//     e.preventDefault()
//     setPostImage(e.target.files[0])
// }


// useEffect(()=>{
//     if(postImage){
//         const fileReader = new FileReader()
//         fileReader.onloadend = ()=>{
//             setPostPicturePreview(fileReader.result)
//         }
//         fileReader.readAsDataURL(postImage)
//         setPostPreviewBox(true)
//     }else{
//         return
//     }
// },[postImage])

// const submit = async(e)=>{
//     e.preventDefault()
//     const url = `${API}/posts`
//     if(!formValue){
//         setError({status : true, msg : "Pleae enter a text to post"})
//        return setTimeout(()=>{
//             setError({status : false, msg :''})
//         }, 4000)
//     }
//         const options = {
//             url: url,
//             method : "POST",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 username : username,
//                 description : formValue
                
//             }
//         }

//         const result = await Axios(options)
//         setFormValue('')
//         const {data, response} = result.data
    
//         if(response === 'Success'){ 
//             setPostData(true, "Your post has been submited")
            
//             // return window.location.href = '/'
//         }else if(response === 'Fail'){
//             const {message} = result.data
//             setError({status : true, msg : message})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }
// }

// Enter key to submit
// const enterClicked =(e)=>{
// if(e.charCode === 13){
//     submit(e)
//     }
// }


// const submit = async(e)=>{
//     e.preventDefault()
//     const {_id , username} = currentUserParsed
  
//     const url = `${API}/posts`
//     if(postImage){    
//     // if(formValue){
//     //     setError({status : true, msg : "Pleae enter a text to post"})
//     //    return setTimeout(()=>{
//     //         setError({status : false, msg :''})
//     //     }, 4000)
//     // }

    
//     const fd = new FormData()
//     fd.append("image", postImage, postImage.name)

//     const result = await Axios.post(`${API}/posts/uploadimage/${_id}/${username}`, fd)

//     const {src : imgSrc} = result.data.image
        
//         const options = {
//             url: url,
//             method : "POST",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 username : username,
//                 firstname : firstname,
//                 lastname : lastname,
//                 description : formValue,
//                 img : imgSrc
//             }
//         }

//         const result2 = await Axios(options)
//         console.log("data now 2",result2)
//         const {response, newPost} = result2.data
   
//         if(response === 'Success' && newPost){ 
//             setPostData(true, "Your post has been submited")
//             // setPostcreated(!postcreated)
//         }else if(response === 'Fail'){
            
//             // setError({status : true, msg : message})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }
//     }else{
//         if(!formValue){
//             setError({status : true, msg : "Pleae enter a text to post"})
//            return setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }
//             const options = {
//                 url: url,
//                 method : "POST",
//                 headers : {
//                     "Accept" : "application/json",
//                     "Content-Type" : "application/json;charset=UTF-8"
//                 },
//                 data:{
//                     userId : _id,
//                     username : username,
//                     firstname : firstname,
//                     lastname : lastname,
//                     description : formValue
                    
//                 }
//             }
    
//             const result = await Axios(options)
    
//             const {data, response} = result.data
//         //    console.log("data now",result)
//             if(response === 'Success'){ 
//                 setPostData(true, "Your post has been submited")
                
//                 // return window.location.href = '/'
//             }else if(response === 'Fail'){
//                 const {message} = result.data
//                 setError({status : true, msg : message})
//                 setTimeout(()=>{
//                     setError({status : false, msg :''})
//                 }, 4000)
//             }
//     }
// }

//Pagination
//create pagination to break timelineposts which
//would be a huge array into smaller bits of 
//arrays containing arrays. That way, when you
//access an array, it'll show a specific number
//of items n a page(You choose 10 items oer page)

// const paginate = (value)=>{

//     const itemsPerPage = 4
//     const numberOfPages = Math.ceil(value.length / itemsPerPage)


//     const newArray = Array.from({length : numberOfPages},(_, index)=>{
//         const startNum = index * itemsPerPage
//         const endNum = itemsPerPage * incrementor
//         return value.slice(startNum, endNum)

//     })
//     return newArray

// }
//call the paginate to use/ break-up the timelineposts
//-paginate breaks the long array (timelineposts) down using the code above
//-it creats an array of arrays called arrayOfArrays
//-items in each page can now be accessed in the arrayOfArrays 
//by using an index (called page) which can be altered using a button to change 
//its default index from 0 to anu number  
//the page should display new items when the page number is changed

// useEffect(()=>{
//     const arrayOfArrays = paginate(timelineposts)
//     setTimeline(arrayOfArrays[page])
//     setArrayofArrayList(arrayOfArrays)
// },[timelineposts, incrementor])

//set an incrementor to increase everytime the documents total height
//plus 50 is equal to the scrollY - scrolled vertical distance plus
//the windows inner height or display height. Now use the incremented
//value as the endpoint for the new set of documents in arrayOfArrays.
//so the page remains on 0, while the start point remians on 1st array of 
//page 0, and the endpoint extends with increase in the incrementor
// useEffect(()=>{
//     const fetchItems = ()=>{
//         if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 2){
//             setLazyLoading(true)
//             setTimeout(()=>{
//                 setIncrementor(incrementor++)
//                 setLazyLoading(false)
//             },3000)
            
//         }
//     }
//     const event = window.addEventListener('scroll', fetchItems)
//     return ()=> window.removeEventListener('scroll', event)
// },[])

//scroll to top of page
// useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])

if(loggedIn == "false" || !loggedIn){
    return <Navigate to='/signin' />
}


// if(loading || allUsers.length == 0 || !currentUserParsed._id){
//     return <Loader />
// }


//     useEffect(()=>{
//         const arrayOfArrays = paginate(timelineposts)
//         setTimeline(arrayOfArrays[page])
//         setArrayofArrayList(arrayOfArrays)
//     },[timelineposts, incrementor])

    
// const paginate = (value)=>{

//         const itemsPerPage = 4
//         const numberOfPages = Math.ceil(value.length / itemsPerPage)


//         const newArray = Array.from({length : numberOfPages},(_, index)=>{
//             const startNum = index * itemsPerPage
//             const endNum = itemsPerPage * incrementor
//             return value.slice(startNum, endNum)

//         })
//         return newArray

//     }    

//     useEffect(()=>{
//         const fetchItems = ()=>{
//             if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 2){
//                 setLazyLoading(true)
//                 setTimeout(()=>{
//                     setIncrementor(incrementor++)
//                     setLazyLoading(false)
//                 },3000)
                
//             }
//         }
//         const event = window.addEventListener('scroll', fetchItems)
//         return ()=> window.removeEventListener('scroll', event)
//     },[])

//     useEffect(() => {
//         window.scrollTo(0, 0)
//       }, [])

const {exercises} = WorkoutData
const {fitnessLevel} = currentUserParsed
// if(currentUserParsed){
//     console.log(currentUserParsed)
// }

    return<>
    <Topbar />
    <Sidebar />
    <Backdrop />
    <div className='homepage div'  > 
        <h1 >WORKOUTS</h1>
        <div className='workout-category'>
        <h5>Beginner Workouts <span className='recommedation'>{fitnessLevel=="beginner" ? " (Recommended)" : ""}</span></h5>
            <Link to={`/workout-session/beginner`}><button className={fitnessLevel == "beginner" ? 'start-button-recommended': 'start-button'}>
                Start Workout
            </button></Link>
            <div className='workouts'>
            {
            exercises
                .filter(exercise => exercise.category === "Beginner")
                .map(exercise => (
                <div key={exercise.id}>
                    <Link to={`/workout/${exercise.id}`} className='workout-item'>
                    <h6>{exercise.name}</h6>
                    <div>{exercise.category}</div>
                    <div>{exercise.intensity}</div>
                    <img className="workout-image" src={exercise.image} alt={exercise.name} />
                    </Link>
                </div>
                ))
            } 
            </div>
            </div>
            
            <hr />

            <div className='workout-category'>
            <h5>Intermediate Workouts <span className='recommedation'>{fitnessLevel=="intermediate" ? " (Recommended)" : ""}</span></h5>
            <Link to={`/workout-session/intermediate`}><button className={fitnessLevel == "intermediate" ? 'start-button-recommended': 'start-button'}>
                Start Workout</button></Link>
            <div className='workouts'>
            {
            exercises
                .filter(exercise => exercise.category === "Intermediate")
                .map(exercise => (
                <div key={exercise.id}>
                    <Link to={`/workout/${exercise.id}`} className='workout-item'>
                    <h6>{exercise.name}</h6>
                    <div>{exercise.category}</div>
                    <div>{exercise.intensity}</div>
                    <img className="workout-image" src={exercise.image} alt={exercise.name} />
                    </Link>
                </div>
                ))
            }
            </div>
            </div> 
            
            <hr />
            
            <div className='workout-category'>
            <h5>Advanced Workouts <span className='recommedation'>{fitnessLevel=="advanced" ? " (Recommended)" : ""}</span></h5>
            <Link to={`/workout-session/advanced`}><button className={fitnessLevel == "advanced" ? 'start-button-recommended': 'start-button'}>
                Start Workout</button></Link>
            <div className='workouts'>
            {
            exercises
                .filter(exercise => exercise.category === "Advanced")
                .map(exercise => (
                <div key={exercise.id}>
                    <Link to={`/workout/${exercise.id}`} className='workout-item'>
                        <h6>{exercise.name}</h6>
                        <div>{exercise.category}</div>
                        <div>{exercise.intensity}</div>
                        <img className="workout-image" src={exercise.image} alt={exercise.name} />
                    </Link>
                </div>
                ))
            }
            </div>
            </div>   
    </div>
    </>
}

export default HomePage
