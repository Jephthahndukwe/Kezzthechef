import * as types from '../Constants/UserConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case types.LOGIN_REQUEST:
        case types.REGISTER_USER_REQUEST:
        case types.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case types.LOGIN_SUCCESS:
        case types.REGISTER_USER_SUCCESS:
        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }    

        case types.LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }    

        case types.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
            
        case types.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case types.LOGIN_FAIL:
        case types.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }    
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state
    }
}


export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case types.UPDATE_PROFILE_REQUEST:
        case types.UPDATE_PASSWORD_REQUEST:
        case types.UPDATE_USER_REQUEST:
        case types.DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.UPDATE_PROFILE_SUCCESS:
        case types.UPDATE_PASSWORD_SUCCESS:
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }    

        case types.UPDATE_PROFILE_RESET:
        case types.UPDATE_PASSWORD_RESET:
        case types.UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case types.DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            } 

        case types.UPDATE_PROFILE_FAIL:
        case types.UPDATE_PASSWORD_FAIL:
        case types.UPDATE_USER_FAIL:
        case types.DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case types.FORGOT_PASSWORD_REQUEST:
        case types.NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case types.NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        case types.FORGOT_PASSWORD_FAIL:
        case types.NEW_PASSWORD_FAIL:
            return {
               error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            }

        default:
            return state;
    }
}

//GET ALL USERS (Admin)
export const allUsersReducer = (state = { users: [] }, action) => {
    switch(action.type) {
        case types.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case types.ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
               error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            }

        default:
            return state;
    }
}

//GET USERS DETAILS (Admin)
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case types.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case types.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
               error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            }

        default:
            return state;
    }
}



