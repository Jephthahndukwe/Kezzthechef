import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../Redux/Actions/productActions';
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../Redux/Constants/ProductConstants';

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
  
      const { loading, error, reviews } = useSelector(state => state.productReviews);
      const { isDeleted } = useSelector(state => state.review);
  
      useEffect(() => {
  
          if(error) {
              alert.error(error);
              dispatch(clearErrors());
          }

          if(productId !== '') {
            dispatch(getProductReviews(productId))
        }
  
          if(isDeleted) {
            alert.success('Review deleted successfully')
            dispatch({ type: DELETE_REVIEW_RESET })
          }

  
      }, [dispatch, alert, error, productId, isDeleted])

      const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
      }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(getProductReviews(productId))
    }
  
      const setReviews = () => {
          const data = {
              columns: [
                  {
                      label: 'Review ID',
                      field: 'id',
                      sort: 'asc'
                  },
                  {
                      label: 'Rating',
                      field: 'rating',
                      sort: 'asc'
                  },
                  {
                      label: 'Comment',
                      field: 'comment',
                      sort: 'asc'
                  },
                  {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                  {
                      label: 'Actions',
                      field: 'actions',
                  }
              ],
              rows: []
          }
  
          reviews.forEach(review => {
              data.rows.push({
                  id: review._id,
                  rating: review.rating,
                  comment: review.comment,
                  user: review.fullname,
                  actions: <Fragment>
                      <button className='btn btn-danger py-1 px-2 ml-2' onClick={() => deleteReviewHandler(review._id)}>
                      <i className='fa fa-trash'></i>
                      </button>
                    </Fragment>
              })
          })
  
          return data;
      }

  return (
    <Fragment>
            <MetaData title={'Product Reviews'} />
            <Header/>
            <div className='admin-product_list'>
                <div className='d-flex'>
                <Sidebar/>

                <div className='admin-box-product'>
                    <Fragment>

                <div className="mt-5">
                    <div className="review-form">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </ form>
                        </div>
            
                 </div>

                {reviews && reviews.length > 0 ? (
                    <div className='admin-review-box mt-5'>
                        <MDBDataTable 
                        data={setReviews()}
                        className="px-3 admin-products"
                        bordered
                        striped
                        hover
                    />
                    </div>
                ) : (
                    <p className='mt-5 no-review-text'>No Reviews.</p>
                )}
                   
                    </Fragment>
                </div>
                </div>
            </div>
    </Fragment>
  )
}

export default ProductReviews
