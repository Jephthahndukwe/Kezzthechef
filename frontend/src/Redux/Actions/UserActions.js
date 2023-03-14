import axios from 'axios'
import * as types from '../Constants/UserConstants'

//LOGIN A USER
export const login = (email, password) => async (dispatch) => {
    try {
        

        dispatch({ type: types.LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        dispatch({ 
            type: types.LOGIN_SUCCESS,
            payload: data.user,
         })

    } catch (error) {
        dispatch({
            type: types.LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


//REGISTER A USER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({ 
            type: types.REGISTER_USER_SUCCESS,
            payload: data.user,
         })

    } catch (error) {
        dispatch({
            type: types.REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: types.LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({ 
            type: types.LOAD_USER_SUCCESS,
            payload: data.user,
         })

    } catch (error) {
        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE PROFILE
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update',  userData, config)

        dispatch({ 
            type: types.UPDATE_PROFILE_SUCCESS,
            payload: data.success,
         })

    } catch (error) {
        dispatch({
            type: types.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE PASSWORD
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update',  passwords, config)

        dispatch({ 
            type: types.UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
         })

    } catch (error) {
        dispatch({
            type: types.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: types.FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot',  email, config)

        dispatch({ 
            type: types.FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
         })

    } catch (error) {
        dispatch({
            type: types.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//RESET PASSWORD
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: types.NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`,  passwords, config)

        dispatch({ 
            type: types.NEW_PASSWORD_SUCCESS,
            payload: data.success,
         })

    } catch (error) {
        dispatch({
            type: types.NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


//LOGOUT USER
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')

        dispatch({ 
            type: types.LOGOUT_SUCCESS,
         })

    } catch (error) {
        dispatch({
            type: types.LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


//GET ALL USER (ADMIN)
//LOAD USER
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({ type: types.ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({ 
            type: types.ALL_USERS_SUCCESS,
            payload: data.users
         })

    } catch (error) {
        dispatch({
            type: types.ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE USER (Admin)
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)

        dispatch({ 
            type: types.UPDATE_USER_SUCCESS,
            payload: data.success
         })

    } catch (error) {
        dispatch({
            type: types.UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//GET USER DETAILS (Admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({ 
            type: types.USER_DETAILS_SUCCESS,
            payload: data.user
         })

    } catch (error) {
        dispatch({
            type: types.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//DELETE USER DETAILS (Admin)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({ 
            type: types.DELETE_USER_SUCCESS,
            payload: data.success
         })

    } catch (error) {
        dispatch({
            type: types.DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}



// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch ({
        type: types.CLEAR_ERRORS
    })
}