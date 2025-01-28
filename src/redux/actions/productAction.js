import { ADD_TO_CART, CHANGE_PRODUCT_QUANTITY, CLEAR_CART, GET_PRODUCTS, PRODUCT_FAVORITE, REMOVE_CART_TIME, SELECT_ALL_PRODUCTS, SELECT_CART_PRODUCT } from "../types/productTypes"

export const getProduct = (products = [],cart=[]) => {
    return {
        type: GET_PRODUCTS,
        payload: {
            products,
            cart
        }
    }
}

export const addToCart = (product = {}) => {
    return {
        type: ADD_TO_CART,
        payload: {
            product
        }
    }
}


export const selectProduct = (id,value) => {
    return {
        type: SELECT_CART_PRODUCT,
        payload: {
            _id: id,
            value
        }
    }
}

export const increaseQuantityOfProduct = (id) => {
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        payload: {
            type: 'more',
            _id: id
        }
    }
}


export const decreaseQuantityOfProduct = (id) => {
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        payload: {
            type: 'less',
            _id: id
        }
    }
}

export const selectAllProduct = (value) => {
    return {
        type: SELECT_ALL_PRODUCTS,
        payload: {
            value
        }
    }
}

export const removeCartItem = (value) => {
    return {
        type: REMOVE_CART_TIME,
        payload: {
            value
        }
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const setFavorite = (id) => {
    return {
        type: PRODUCT_FAVORITE,
        payload: {
            id
        }
    }
}