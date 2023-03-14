import axios from 'axios';
import * as types from '../Constants/ProductConstants'

// Get All Products
export const getProducts = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({
            type: types.ALL_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`) 

        dispatch({
            type: types.ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: types.ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


//Get Product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/product/${id}`) 

        dispatch({
            type: types.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    }
    catch (error) {
        dispatch({
            type: types.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: types.NEW_REVIEW_REQUEST
        })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config) 

        dispatch({
            type: types.NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: types.NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get Admin Product
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: types.ADMIN_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/products`) 

        dispatch({
            type: types.ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    }
    catch (error) {
        dispatch({
            type: types.ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//New Product
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: types.NEW_PRODUCT_REQUEST
        })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config) 

        dispatch({
            type: types.NEW_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: types.NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete Product (admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_PRODUCT_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`) 

        dispatch({
            type: types.DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: types.DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update Product (Admin)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: types.UPDATE_PRODUCT_REQUEST
        })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config) 

        dispatch({
            type: types.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: types.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get Product Reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.GET_REVIEWS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`) 

        dispatch({
            type: types.GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    }
    catch (error) {
        dispatch({
            type: types.GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delte Product Reviews
export const deleteReview = (id, productId) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_REVIEW_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`,) 

        dispatch({
            type: types.DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: types.DELETE_REVIEW_FAIL,
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