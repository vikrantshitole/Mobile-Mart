import { useReducer } from "react";
import { useDispatch } from "react-redux"

export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CLEAR_INPUT = 'CLEAR_INPUT';

const initialState = {
    first_name: "",
    last_name: "",
    address_line_1: "",
    address_line_2: "",
    state: "",
    contact_number: "",
    pincode: "",
    city: "",
    
}
const authDataRedurcer = (state = initialState, action) => {    
    switch(action.type) {
        case CHANGE_INPUT: 
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case CLEAR_INPUT: 
            return initialState;
        default:
            return state
    }
}
const useAddressData = (address) => {
const [state, dispatch] = useReducer(authDataRedurcer,address ||initialState);
    
    return [state, dispatch]
}
export default useAddressData