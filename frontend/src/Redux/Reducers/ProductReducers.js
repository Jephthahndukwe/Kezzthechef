import * as types from '../Constants/ProductConstants'


export const ProductsReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case types.ALL_PRODUCTS_REQUEST:
        case types.ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case types.ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage
            }

        case types.ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case types.ALL_PRODUCTS_FAIL:
        case types.ADMIN_PRODUCTS_FAIL:
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
                return state;
    }
}


//Get productDetails
export const ProductDetailsReducer = (state = { product: {} }, action ) => {
    switch(action.type) {
        case types.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case types.PRODUCT_DETAILS_FAIL:
            return {
             ...state,
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

//New Review
export const newReviewReducer = (state = {}, action ) => {
    switch(action.type) {
        case types.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case types.NEW_REVIEW_FAIL:
            return {
             loading: false,
             error: action.payload
            }
        case types.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
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

//ADMIN

//Add New Product
export const newProductReducer = (state = { product: {} }, action ) => {
    switch(action.type) {
        case types.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case types.NEW_PRODUCT_FAIL:
            return {
             ...state,
             error: action.payload
            } 
        case types.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
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

//Delete Product
export const productReducer = (state = {}, action ) => {
    switch(action.type) {
        case types.DELETE_PRODUCT_REQUEST:
        case types.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
            
            case types.UPDATE_PRODUCT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload,
                }

        case types.DELETE_PRODUCT_FAIL:
        case types.UPDATE_PRODUCT_FAIL:
            return {
             ...state,
             error: action.payload
            } 
        case types.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }

            case types.UPDATE_PRODUCT_RESET:
                return {
                    ...state,
                    isUpdated: false
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

// Get Product Review
export const productReviewReducer = (state = { review: [] }, action ) => {
    switch(action.type) {
        case types.GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        case types.GET_REVIEWS_FAIL:
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

// Delete Product Review
export const reviewReducer = (state = {}, action ) => {
    switch(action.type) {
        case types.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case types.DELETE_REVIEW_FAIL:
            return {
             ...state,
             error: action.payload
            }
        case types.DELETE_REVIEW_RESET:
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