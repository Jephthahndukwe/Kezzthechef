import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { ProductsReducer, newProductReducer, productReducer, ProductDetailsReducer, newReviewReducer, productReviewReducer, reviewReducer } from './Reducers/ProductReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './Reducers/UserReducers';
import { cartReducer } from './Reducers/CartReducers';
import { newOrderReducer, myOrdersReducers, ordersDetailsReducer, allOrdersReducer, orderReducer } from './Reducers/OrderReducers';

const reducer = combineReducers ({
    products: ProductsReducer, 
    productDetails: ProductDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewReducer,
    review: reviewReducer,
    user: authReducer,
    users: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducers,
    orderDetails: ordersDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newReview: newReviewReducer,
})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [], 
        shippingInfo: localStorage.getItem('shippingInfo')
         ? JSON.parse(localStorage.getItem('shippingInfo'))
         : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store