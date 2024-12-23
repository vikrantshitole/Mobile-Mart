import { SIGNIN, SIGNUP } from "../types/authTypes"

export const signin = (username, password) => {
    return {
        type: SIGNIN,
        payload: {
            username,
            password
        }
    }
}

export const signup = (username, firstName,lastName, token) => {
    return {
        type: SIGNUP,
        payload: {
            username,
            firstName,
            lastName,
            token
        }
    }
}