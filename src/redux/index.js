import { combineReducers } from "redux";
import authReducers from "./redurcers/authReducers";
import productReducers from "./redurcers/productReducers";

const reducer = combineReducers({
    auth: authReducers,
    product:  productReducers
})

export default reducer