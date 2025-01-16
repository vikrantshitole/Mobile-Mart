import { ADD_TO_CART, CHANGE_PRODUCT_QUANTITY, CLEAR_CART, GET_PRODUCTS, REMOVE_CART_TIME, SELECT_ALL_PRODUCTS, SELECT_CART_PRODUCT } from "../types/productTypes";

const productReducers = (state = {products: [], cart: []}, action)=>{    
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state, 
                products: action.payload.products,
                cart: action.payload.cart
            };
        case ADD_TO_CART: {
            const {product} = action.payload;
            const cart = [...state.cart.map(c=> ({...c}))];
            const prod = cart.find(p=>p._id=== product._id);
            if (!prod) {
                cart.push({title: product.title, _id: product._id, quantity: 1, image: product.image,price: product.price,checked: true})
            }
            return {
                ...state,
                cart
            }

        }
        case SELECT_CART_PRODUCT: {
            const cart = [...state.cart];
            const {_id,value} = action.payload;
            const index = cart.findIndex(c=>c._id===_id);
            cart[index].checked = value == 1 ? 0 : 1;
            return {
                ...state,
                cart
            }
        }
        case CHANGE_PRODUCT_QUANTITY: {
            const cart = [...state.cart];
            const {_id,type} = action.payload;
            const index = cart.findIndex(c=>c._id===_id);
            
            let currentQty = cart[index]['quantity'];
        
            if(type == 'more'){
                cart[index]['quantity'] = currentQty + 1;
            } else if(type == 'less'){
                cart[index]['quantity'] = currentQty > 1 ? currentQty - 1 : 1;
            }
            
            return {

                ...state,
                cart
            }   
        }
        case SELECT_ALL_PRODUCTS: {
            const newItems = [...state.cart]; // clone the array 
            
            newItems.map((item, index) => {
                newItems[index]['checked'] = action.payload.value == true ? 0 : 1; // set the new value 
            });
            return{
                ...state,
                cart: newItems
            }
        }
        case REMOVE_CART_TIME: {
            const cart = state.cart.filter(item=>item._id!==action.payload.value);
            return {
                ...state,
                cart
            }
        }
        case CLEAR_CART: 
            return {
                ...state,
                cart: []
            }
        default: 
            return state;
    }
}

export default productReducers