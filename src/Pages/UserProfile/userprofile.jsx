import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import './userprofile.css'
import axios from 'axios'
import API from '../../Utils/api'
// import { Grid } from '@material-ui/core'
import { Grid } from '@mui/material'

import { FaUserAlt, FaUsers, FaImages, FaExclamationCircle, FaHome, FaUser, FaCamera,
    FaTelegramPlane, FaEllipsisH, FaWindowClose, FaChevronCircleDown } from 'react-icons/fa'
import {Topbar, Sidebar, Backdrop} from '../../Components';
import { UseAppContext } from '../../Contexts/app-context'
import {Link, useNavigate} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import OtherUsers from '../../Components/OtherUsers/otherUsers'
import LoadingIcons from 'react-loading-icons'
import { Loader } from '../../Components'
import ProfileImage from '../../assets/profile.jpg'
import CoverImage from '../../assets/coverpic.jpg'
// import Button from '@restart/ui/esm/Button'
import { Button } from '@mui/material'
// import Profile from "../../assets/profile.jfif"
// import { Timeline, Update } from '@material-ui/icons'
// import MuiAlert from '@material-ui/lab/Alert';
import MuiAlert from '@mui/material/Alert'
// import { makeStyles } from '@material-ui/core/styles';
// import Popover from '@material-ui/core/Popover';
import { Popover } from '@mui/material'
// import Typography from '@material-ui/core/Typography';
import { Typography } from '@mui/material'


const UserProfile =()=>{
const {setLoggedIn, loggedIn, setLoading, loading, setLazyLoading, lazyLoading, currentUser, currentUserParsed, allUsers, 
    postcreated, setPostCreated, tempAllUsers, setNewCurrentUser, setUserClicked, userClicked, setFetchedUser, 
    fetchedUser, setTestValue, testValue} = UseAppContext()
const [formValue, setFormValue] = useState('')
const [error, setError] = useState({status : false, msg:''})
// const [alert, setAlert] = useState({status : false, msg:''})
const {_id : userId, username : userUsername, firstname, lastname, followings, followers, 
    profilePicture : userProfilePicture, coverPicture : userCoverPicture, email, phone, 
    aboutMe, country, state, city, employment} = fetchedUser

const [alertMsg, setAlertMsg] = useState({status : false, msg : ''})
const [successMsg, setSuccessMsg] = useState({status : false, msg : ''})
const followurl = `${API}/user/follow`
const unFollowurl = `${API}/user/unfollow`
const getUserurl = `${API}/user/${userId}/${userUsername}`
const posturl = `${API}/posts`
// const [userClicked, setUserClicked] = useState(false)
const [newPage, setNewPage] = useState(false)
// const [timelineposts, setTimelinePosts] = useState([])
const [profilePicture, setProfilePicture] = useState('')
const [timelineposts, setTimelinePosts] = useState([])
const [coverImage, setCoverImage] = useState('')
const [profileImage, setProfileImage] = useState('')
const [postImage, setPostImage] = useState('')
const [coverPicturePreview, setCoverPicturePreview] = useState('')
const [profilePicturePreview, setProfilePicturePreview] = useState('')
const [postPicturePreview, setPostPicturePreview] = useState('')
// const [profilereviewBox, setProfilereviewBox] = useState(false)
const [coverPreviewBox, setCoverPreviewBox] = useState(false)
const [profilePreviewBox, setProfilePreviewBox] = useState(false)
const [postPreviewBox, setPostPreviewBox] = useState(false)
const [userEditBox, setUserEditBox] = useState(false)
const [deleteBox, setDeleteBox] = useState(false)
const [showPasswordBox, setShowPasswordBox] = useState(false)
const [deleteValue, setDeleteValue] = useState("")
const [editUserValues, setEditUserValues] = useState({
    firstname : "",
    lastname : "",
    username : "",
    email : "",
    oldpassword : "",
    newpassword : "",
    comfirmpassword : "",
    phone : "",
    aboutme : "",
    country : "",
    state : "",
    city : "",
    employment : ""    
})

// const [imageValue, setProfilePicture] = useState('')

//pagination constants
let [page, setPage] = useState(0)
let [incrementor, setIncrementor] = useState(1)
const [timeline, setTimeline] = useState([])
const [arrayofArrayList, setArrayofArrayList] = useState([])


const setValues = (e)=>{
    setFormValue(e.target.value)
}

const setUserCoverPicture = (value)=>{
    setCoverPreviewBox(false)
    setTestValue(value)
    setCoverImage('')
}

const setUserProfilePicture = (value)=>{
    setProfilePreviewBox(false)
    setTestValue(value)
    setProfileImage('')
}

//Alert function

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
//   const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '20rem',
//       '& > * + *': {
//         marginTop: theme.spacing(2),
//       },
//       position:"absolute",
//       top:"30%",
//       left : "50%",
//       transform : "translate(-50%)"
//     },
//     typography: {
//       padding: theme.spacing(2),
//     },
//   }));
  

//Popover starts 

// const useStyles = makeStyles((theme) => ({
    // typography: {
    //     padding: theme.spacing(2),
    //   },
//   }));
  

// const classes = useStyles();
// const [anchorEl, setAnchorEl] = React.useState(null);

// const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
// };

// const handleClose = () => {
//     setAnchorEl(null);
// };

// const open = Boolean(anchorEl);
// const popOverId = open ? 'simple-popover' : undefined;

//     //Popover ends

// //close edit user  
// const closeEditBox = ()=>{
//     setUserEditBox(false)
// }

// //edit user 
// const openEditBox=()=>{
//     setDeleteBox(false)
//     setUserEditBox(true)
// }

// //close delete box
// const closeDeleteBox=()=>{
//     setDeleteBox(false)
// }
// //open delete account comfirmation
// const openDeleteBox=()=>{
//     setUserEditBox(false)
//     setDeleteBox(true)
// }

// const showPasswordBoxFunc =()=>{
//     setShowPasswordBox(!showPasswordBox)
// }

// const setEditValues =(e)=>{
//     const name = e.target.name;
//     const value = e.target.value;

//     setEditUserValues(prev =>{
//         return {...prev, [name]: value}
//     })
// }

// //fill edit user input values on page load
// useEffect(()=>{
//     setEditUserValues({
//         firstname : currentUserParsed.firstname,
//         lastname : currentUserParsed.lastname,
//         username : currentUserParsed.username,
//         email : currentUserParsed.email,
//         oldpassword : "",
//         newpassword : "",
//         comfirmpassword : "",
//         phone : currentUserParsed.phone,
//         aboutme : currentUserParsed.aboutMe,
//         country : currentUserParsed.country,
//         state : currentUserParsed.state,
//         city : currentUserParsed.city,
//         employment : currentUserParsed.employment 
//     })
// },[currentUserParsed])

// const setResponseData =()=>{
//     closeEditBox()
//     setSuccessMsg({status : true, msg : "Profile updated"})
//     return setTimeout(()=>{
//         setSuccessMsg({status : false, msg : ""})
//     },5000)
// }


// //delete user function
// const deleteUser = async(e)=>{
//     console.log("result")
//     e.preventDefault()
//         const {_id : id, username} = currentUserParsed 

//         if(!deleteValue ){
//             setError({status : true, msg : "Please enter your username" })
//             return setTimeout(()=>{
//                 setError({status : false, msg : "" })
//             },5000)
//             return
//         }
//         if(deleteValue.toLowerCase() !== username.toLowerCase()){
//             setError({status : true, msg : "Incorrect username. Please try again" })
//             return setTimeout(()=>{
//                 setError({status : false, msg : "" })
//             },5000)
//             return
//         }
//         const options ={
//             url : `${API}/user/delete/${id}/${username}`,
//             method : "DELETE",
//             headers : {
//                 "Accept" : "Application/json",
//                 "Content-Type" : "Application/json;charset=utf-8"
//             },
//             data :{
//                 userId : id,
//                 username : username
//             }
//         }
//         const result = await axios(options)
//         const {response} = result.data 
//         if(response == 'Success'){
//             setLoggedIn(false)
//             window.location.href = '/signup'
//         }else{
//             const {response, message} = result.data
//             setError({status : true, msg : message })
//             return setTimeout(()=>{
//                 setError({status : false, msg : "" })
//             },5000)
//         }
// }

// //update user fundtion
// const updateUser = async(e)=>{
//     e.preventDefault()
//     const {firstname, lastname, oldpassword, newpassword, comfirmpassword,
//         phone, aboutme, country, state, city, employment} = editUserValues
//         const {_id, username, email} = currentUserParsed

        
//         if(newpassword.length && comfirmpassword.length){
            
//             if(!firstname || !lastname || !oldpassword || !newpassword || !comfirmpassword || !phone || !aboutme || !country || !state || !city || !employment){
//                 setAlertMsg({status : true, msg : "Please provide all required fields"})
//                 return setTimeout(()=>{
//                     setAlertMsg({status : false, msg : ""})
//                 },5000)

//             }
//             if(newpassword != comfirmpassword){
//                 setAlertMsg({status : true, msg : "Password comfirmation mismatch"})
//                 return setTimeout(()=>{
//                     setAlertMsg({status : false, msg : ""})
//                 },5000)
//             }
//                 const options ={
//                     url : `${API}/user/update/${_id}/${username}`,
//                     method : "PATCH",
//                     headers : {
//                        "Accept" : "Application/json",
//                        "Content-Type" : "Application/json;charset=utf-8"
//                     },
//                     data :{
//                         userId : _id,
//                         firstname : firstname,
//                         lastname : lastname,
//                         username : username,
//                         email : email,
//                         password : oldpassword,
//                         newpassword : newpassword,
//                         phone : phone,
//                         aboutMe : aboutme,
//                         country : country,
//                         state : state,
//                         city : city,
//                         employment : employment,
//                     }
//                 }
//                 const result = await axios(options)
//                 const {response} = result.data 
//                 console.log(response)
//                 if(response == 'Success'){
//                     setResponseData(true, "Profile updated")
//                 }else{
//                     const {response, message} = result.data
//                     setError({status : true, msg : message })
//                     return setTimeout(()=>{
//                         setError({status : false, msg : "" })
//                     },5000)
//                 } 
//         }else{
//             if(!firstname || !lastname || !phone || !aboutme || !country || !state || !city || !employment){
//                 setAlertMsg({status : true, msg : "Please provide all required fields"})
//                 return setTimeout(()=>{
//                     setAlertMsg({status : false, msg : ""})
//                 },5000)
//             }
//                 const options ={
//                 url : `${API}/user/update/${_id}/${username}`,
//                 method : "PATCH",
//                 headers : {
//                    "Accept" : "Application/json",
//                    "Content-Type" : "Application/json;charset=utf-8"
//                 },
//                 data :{
//                     userId : _id,
//                     firstname : firstname,
//                     lastname : lastname,
//                     username : username,
//                     email : email,
//                     phone : phone,
//                     aboutMe : aboutme,
//                     country : country,
//                     state : state,
//                     city : city,
//                     employment : employment,
//                 }
//             }
//             const result = await axios(options)
//             const {response} = result.data
//             console.log(response)
//             if(response == 'Success'){
//                 setResponseData(true, "Profile updated")
//             }else{
//                 setError({status : true, msg : "Failed to update post"})
//                 return setTimeout(()=>{
//                     setError({status : false, msg : ""})
//                 },5000)
//             }        
//         }
// }


// //upload cover image and return url 

// const uploadCoverPicture = async(value)=>{
//     const  url =`${posturl}/uploadprofileimage/${userId}/${username}`

//     const fd = new FormData()
//     fd.append("image", value, value.name)

//     const result = await axios.post(`${API}/user/uploadcoverimage/${userId}/${username}`, fd)
    
//     const {src : imgSrc} = result.data.image
    
//   const options = {
//         url: `${API}/user/createimage/${userId}/${username}`,
//         method : "PATCH",
//         headers : {
//             "Accept" : "application/json",
//             "Content-Type" : "application/json;charset=UTF-8"
//         },
//         data : {
//             userId : userId,
//             username : username,
//             coverPicture : imgSrc
//         }
//     }

//     const result2 = await Axios(options)

//     const {response, message} = result2.data
    
//     if(response == 'Success' && message){
//         setUserCoverPicture(message)
//     }else if(response == 'Fail'){
//        setError({status : true, msg : "Fialed to upload profile image"})
//        return setTimeout(()=>{
//             setError({status : false, msg :''})
//     }, 4000)
//     }
// }

// //upload profile image and return url 
// const uploadProfilePicture = async(value)=>{
//     const  url =`${posturl}/uploadprofileimage/${userId}/${username}`

//     const fd = new FormData()
//     fd.append("image", value, value.name)

//     const result = await axios.post(`${API}/user/uploadprofileimage/${userId}/${username}`, fd)

//     const {src : imgSrc} = result.data.image
    
//   const options = {
//         url: `${API}/user/createimage/${userId}/${username}`,
//         method : "PATCH",
//         headers : {
//             "Accept" : "application/json",
//             "Content-Type" : "application/json;charset=UTF-8"
//         },
//         data : {
//             userId : userId,
//             username : username,
//             profilePicture : imgSrc
//         }
//     }

    
//     const result2 = await Axios(options)

//     const {response, message} = result2.data
    
//     if(response == 'Success' && message){
//         setUserProfilePicture(message)
//     }else if(response == 'Fail'){
//        setError({status : true, msg : "Fialed to upload profile image"})
//        return setTimeout(()=>{
//             setError({status : false, msg :''})
//     }, 4000)
//     }
// }


// //select cover pic
// const selectCoverPic = (e)=>{
//     e.preventDefault()
//     setCoverImage(e.target.files[0])
// }

// //select profile picture
// const selectProfilePic = (e)=>{
//     e.preventDefault()
//     setProfileImage(e.target.files[0])
// }

// //select post pic
// const selectPostPic = (e)=>{
//     e.preventDefault()
//     setPostImage(e.target.files[0])
// }

// useEffect(()=>{
//     if(coverImage){
//         const fileReader = new FileReader()
//         fileReader.onloadend = ()=>{
//             setCoverPicturePreview(fileReader.result)
//         }
//         fileReader.readAsDataURL(coverImage)
//         setCoverPreviewBox(true)
//         setProfilePreviewBox(false)
//         setPostPreviewBox(false)
//     }else{
//         return
//     }
// },[coverImage])

// useEffect(()=>{
//     if(profileImage){
//         const fileReader = new FileReader()
//         fileReader.onloadend = ()=>{
//             setProfilePicturePreview(fileReader.result)
//         }
//         fileReader.readAsDataURL(profileImage)
//         setProfilePreviewBox(true)
//         setCoverPreviewBox(false)
//         setPostPreviewBox(false)
//     }else{
//         return
//     }
// },[profileImage])


// useEffect(()=>{
//     if(postImage){
//         const fileReader = new FileReader()
//         fileReader.onloadend = ()=>{
//             setPostPicturePreview(fileReader.result)
//         }
//         fileReader.readAsDataURL(postImage)
//         setPostPreviewBox(true)
//         setCoverPreviewBox(false)
//         setProfilePreviewBox(false)
//     }else{
//         return
//     }
// },[postImage])




// // if(followings == undefined){
// //     followings = currentUser.followings    
// // }



// const {id, username} = useParams()

// const fetchUser = async(fetchurl)=>{
//     setLoading(true)
//     const result = await axios(fetchurl)
//     const fetchedUserVal = result.data.data 
    
//     setFetchedUser(fetchedUserVal)
//     setLoading(false)
// }

// useEffect(()=>{
//     fetchUser(`${API}/user/${id}/${username}`)
// },[postcreated, id, username, testValue])


// // let lastUrl = window.location.href; 
// // new MutationObserver(() => {
// //   const url = window.location.href;
// //   if (url !== lastUrl) {
// //     lastUrl = url;
// //     onUrlChange();
// //   }
// // }).observe(document, {subtree: true, childList: true});


// function onUrlChange() {
//   setNewPage(true)
//   setTimeout(()=>{
//     setNewPage(false)
//   },1000)
// }



// ///forget these

//     // if(userId != id && username != userUsername){ 
//     //     fetchUser(`${API}/user/${id}/${username}`)
//     // }


//     const fetchTimelinePosts = async(url)=>{
//         const options = {
//             url: url,
//             method : "GET",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             }
//         }
//        // dispatch({type : LOADING, payload : true})
    
//         const result = await Axios(options)

//         const {response, allPosts} = result.data
//         if(response == 'Success' && allPosts){
            
//            const newTimelinePosts = allPosts.sort((a,b)=>{
//                return new Date(b.createdAt) - new Date(a.createdAt)
//            })
//            setTimelinePosts(newTimelinePosts)
//         }else if(response == 'Fail'){
//            setError({status : true, msg : "Fialed to fetch timeline posts"})
//            return setTimeout(()=>{
//                 setError({status : false, msg :''})
//         }, 4000)
//         }
        
//     }

// useEffect(()=>{
//     fetchTimelinePosts(`${posturl}/${id}/${username}/timeline`)

// },[id, username, userClicked, postcreated])



// const setPostData = (value1, value2)=>{
//     setAlertMsg({status : value1, msg : value2})
//     setPostPreviewBox(false)
//     setPostCreated(true)
//     setFormValue('')
//     setPostImage('')
//     setTimeout(()=>{
//         setPostCreated(false)
//     }, 3000)
// }

// const setPostCancelValues = ()=>{
//     setPostPreviewBox(false)
//     setFormValue('')
//     setPostImage('')
// }

// const setCoverCancelValues = (value) =>{
//     setCoverPreviewBox(value)
//     setCoverImage('')
// }

// const setProfileCancelValues = (value) =>{
//     setProfilePreviewBox(value)
//     setProfileImage("")
// }

// const setDataValues = (value, data)=>{
//     setNewCurrentUser(data)
//     setLoading(value)
// }
// let newUserFollowings  = []
// if(currentUserParsed){
//      newUserFollowings = currentUserParsed.followings
// }

// let newUserFollowers  = []
// if(currentUserParsed){
//     newUserFollowers = currentUserParsed.followers
// }

// //FOLLOW USER
// const follow =async(e, id, followedUsername)=>{
//     e.preventDefault()
//     const {_id , username} = JSON.parse(currentUser)
   
//         const options = {
//             url: `${followurl}/${id}/${followedUsername}`,
//             method : "PATCH",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 username : username                
//             }
//         } 
       
//         const result = await axios(options)
        
//         if(result.data.response == "Success"){
          
//             const reponse_2 = await axios(getUserurl)
//             const {data} = reponse_2.data
            
//             if(data){
//                 // window.location.href='/' 
//                 // setValues(true, data)

//                 setTestValue(!testValue)
//                 setPostCreated(true)
//                 setTimeout(()=>{
//                     setPostCreated(false)
//                 }, 3000)
//             } 
//         }else{
//             setAlertMsg({status : true, msg : 'An error occured while following'})  
//         }       
        
//     // }

// }



// //UNFOLLOW USER
// const unfollow =async(e, id, followedUsername)=>{
//     e.preventDefault()
//     const {_id , username} = currentUserParsed
   
//         const options = {
//             url: `${unFollowurl}/${id}/${followedUsername}`,
//             method : "PATCH",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 userUsername : username                
//             }
//         } 
       
//         const result = await axios(options)
//         console.log(result)
//         if(result.data.response == "Success"){
//             const reponse_2 = await axios(getUserurl)
//             const {data} = reponse_2.data
//             if(data){
//                 setTestValue(!testValue)
//                 setPostCreated(true)
//                 setTimeout(()=>{
//                     setPostCreated(false)
//                 }, 3000)
//             } 
//         }else{
//             setAlertMsg({status : true, msg : 'An error occured while following'})  
//         }       
        
//     // }

// }


// //CONNECTION REQUEST TO USER
// const connectRequest =async(e, value1, value2)=>{
//     e.preventDefault()
    
//     const {_id , username} = currentUserParsed
   
//         const options = {
//             url : `${API}/user/connectrequest/${value1}/${value2}`,
//             method : "PATCH",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 username : username                
//             }
//         } 
        
//         const result = await axios(options)      
//         if(result.data.response == "Success"){
//             const reponse_2 = await axios(getUserurl)
//             const {data} = reponse_2.data
//             if(data){
//                 setTestValue(!testValue)
//                 // window.location.href=`/userprofile/${_id}/${username}`
//                 // setDataValues(true, data)
//             } 
//         }else{
//             setAlertMsg({status : true, msg : 'Failed to send request from user'})  
//         }       
        
//     // }

// }



// //DISCONNECTION REQUEST TO USER
// const disconnectRequest =async(e, value1, value2)=>{
//     e.preventDefault()
    
//     const {_id , username} = currentUserParsed
   
//         const options = {
//             url : `${API}/user/disconnectrequest/${value1}/${value2}`,
//             method : "PATCH",
//             headers : {
//                 "Accept" : "application/json",
//                 "Content-Type" : "application/json;charset=UTF-8"
//             },
//             data:{
//                 userId : _id,
//                 username : username                
//             }
//         } 
        
//         const result = await axios(options)
      
//         if(result.data.response == "Success"){
//             const reponse_2 = await axios(getUserurl)
//             const {data} = reponse_2.data
//             if(data){
//                 setTestValue(!testValue)
//                 // window.location.href=`/userprofile/${_id}/${username}`
//                 // setDataValues(true, data)
//             } 
//         }else{
//             setAlertMsg({status : true, msg : 'Failed to disconnect from user'})  
//         }       
        
//     // }

// }


// const submit = async(e)=>{
//     e.preventDefault()
//     const {_id , username} = currentUserParsed
//     const url = `${API}/posts`
//     if(postImage){    
  
//     const fd = new FormData()
//     fd.append("image", postImage, postImage.name)

//     const result = await axios.post(`${API}/posts/uploadimage/${userId}/${username}`, fd)

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


// //Pagination
// //create pagination to break timelineposts which
// //would be a huge array into smaller bits of 
// //arrays containing arrays. That way, when you
// //access an array, it'll show a specific number
// //of items n a page(You choose 10 items oer page)

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
// //call the paginate to use/ break-up the timelineposts
// //-paginate breaks the long array (timelineposts) down using the code above
// //-it creats an array of arrays called arrayOfArrays
// //-items in each page can now be accessed in the arrayOfArrays 
// //by using an index (called page) which can be altered using a button to change 
// //its default index from 0 to anu number  
// //the page should display new items when the page number is changed

// useEffect(()=>{
//     const arrayOfArrays = paginate(timelineposts)
//     setTimeline(arrayOfArrays[page])
//     setArrayofArrayList(arrayOfArrays)
// },[timelineposts, incrementor])

// //set an incrementor to increase everytime the documents total height
// //plus 50 is equal to the scrollY - scrolled vertical distance plus
// //the windows inner height or display height. Now use the incremented
// //value as the endpoint for the new set of documents in arrayOfArrays.
// //so the page remains on 0, while the start point remians on 1st array of 
// //page 0, and the endpoint extends with increase in the incrementor
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

// //scroll to top of page
// useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])
 
// if(loggedIn == "false" || !loggedIn){
//     return <Navigate to='/login' />
// }


// if(loading || allUsers.length == 0 || !username && !timelineposts || !fetchedUser.followings || !currentUserParsed._id){
//     return <Loader />
// }



const {_id : idCurrent , username : usernameCurrent} = currentUserParsed

// const firstLetter = username[0]
// const otherLettes = username.slice(1)
// const usernameCapitalized = firstLetter.toUpperCase() + otherLettes
    return <>
    <Topbar />
    <Sidebar />
    <Backdrop />
    <Grid className='profile' container > 
    </Grid>
    </>
}

export default UserProfile






