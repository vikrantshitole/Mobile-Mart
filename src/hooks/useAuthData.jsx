import { useReducer } from "react";
import { useDispatch } from "react-redux"

export const CHANGE_INPUT = 'CHANGE_INPUT';

const initialState = {
    emailOrNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    password: "",
    confirmPassword: "",
    
    isError: false,
    isLoginWithNumber: false,
    isSignUp: true
}
const authDataRedurcer = (state = initialState, action) => {
    console.log(action);
    
    switch(action.type) {
        case CHANGE_INPUT: 
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state
    }
}
const useAuthData = () => {
    const [state, dispatch] = useReducer(authDataRedurcer, initialState);
    
    return [state, dispatch]
}
export default useAuthData