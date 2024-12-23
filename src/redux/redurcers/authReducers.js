import { SIGNIN, SIGNUP } from "../types/authTypes";

const authReducers = (state= {token: null}, action)=>{
    console.log(action,"action");
    
    switch(action.type) {
        case SIGNIN:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
            }
        case SIGNUP:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }
        default: 
            return state;
    }
    return state;
}

export default authReducers