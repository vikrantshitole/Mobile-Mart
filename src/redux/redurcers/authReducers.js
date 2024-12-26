import { SIGNIN, SIGNOUT, SIGNUP } from "../types/authTypes";

const initialState =  {
    token: null,
    firstName: "",
    lastName: "",
    username: ""
}
const authReducers = (state= initialState, action)=>{
    console.log(action,"action");
    
    switch(action.type) {
        case SIGNIN:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                _id: action.payload._id
            }
        case SIGNUP:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                _id: action.payload._id
            }
        case SIGNOUT: 
            return initialState
        default: 
            return state;
    }
    return state;
}

export default authReducers