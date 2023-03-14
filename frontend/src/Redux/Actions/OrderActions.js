import * as types from "../Constants/OrderConstant"
import axios from "axios"


//CREATE NEW ORDER
export const newOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.CREATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type: types.CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET CURRENTLY LOGGED USER ORDERS
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: types.MY_ORDERS_REQUEST
        });

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: types.MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: types.MY_ORDERS_FAIL,
            payload: error.response.data.message

        })
    }
}

// GET ORDER DETAILS
export const ordersDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: error.response.data.message

        })
    }
}

// GET ALL ORDERS (Admin)
export const allOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: types.ALL_ORDERS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type: types.ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.ALL_ORDERS_FAIL,
            payload: error.response.data.message

        })
    }
}

// UPDATE ORDERS (Admin)
export const updateOrders = (id, orderData) => async (dispatch) => {
    try {
        dispatch({
            type: types.UPDATE_ORDERS_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: types.UPDATE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: types.UPDATE_ORDERS_FAIL,
            payload: error.response.data.message

        })
    }
}

// DELETE ORDERS (Admin)
export const deleteOrders = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_ORDERS_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: types.DELETE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: types.DELETE_ORDERS_FAIL,
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