import * as types from '../Constants/OrderConstant'



export const newOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case types.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case types.CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case types.CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

            default:
                return state
    }
}

export const myOrdersReducers = (state = {orders: []}, action) => {
    switch(action.type) {
        case types.MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case types.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case types.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const ordersDetailsReducer = (state = {order: {} }, action) => {
    switch(action.type) {
        case types.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case types.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case types.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const allOrdersReducer = (state = {orders: [] }, action) => {
    switch(action.type) {
        case types.ALL_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case types.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case types.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

//Update Product
export const orderReducer = (state = {}, action ) => {
    switch(action.type) {
        case types.UPDATE_ORDERS_REQUEST:
        case types.DELETE_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.UPDATE_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }

        case types.DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }

        case types.UPDATE_ORDERS_FAIL:
        case types.DELETE_ORDERS_FAIL:
            return {
             ...state,
             error: action.payload
            } 
        case types.UPDATE_ORDERS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case types.DELETE_ORDERS_RESET:
            return {
                ...state,
                isDeleted: false
            }    

        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: 
            return state
    }
}