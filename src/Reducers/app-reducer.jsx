const CURRENTUSER = "CURRENTUSER"; const LOGGEDIN = 'LOGGEDIN' ; 
const LOADING = 'LOADING';  const SETSIDEBAR = 'SETSIDEBAR' ; const SETFETCHEDUSER = 'SETFETCHEDUSER'; 
const CURRENTUSERPARSED = 'CURRENTUSERPARSED'; const SIGNUPSUCCESSFUL = "SIGNUPSUCCESSFUL"

const reducer = (state, action)=>{
    switch(action.type){
        case SIGNUPSUCCESSFUL:
            return {...state, signupSuccessful: action.payload }
        case LOADING: 
            return {...state, loading: action.payload }
        case CURRENTUSER:
            return{...state, currentUser : action.payload}
        case LOGGEDIN:
            return{...state, loggedIn : action.payload}
        case SETSIDEBAR:
            return {...state, sidebarOpen : !state.sidebarOpen}
        case SETFETCHEDUSER:
            return {...state, fetchedUser : action.payload}
        case CURRENTUSERPARSED :
            return {...state, currentUserParsed : action.payload}      

        default:
            return {...state}
    }
    return state
}

export default reducer
