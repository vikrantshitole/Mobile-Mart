import { SIGNIN, SIGNOUT, SIGNUP } from "../types/authTypes"

export const signin = (token, user) => {
    return {
        type: SIGNIN,
        payload: {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
    }
}

export const signup = (token, user) => {
    return {
        type: SIGNUP,
        payload: {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
    }
}

export const signout = () => ({
    type: SIGNOUT
})