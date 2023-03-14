import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Store.css'

import Pagination from 'react-js-pagination'

import MetaData from '../Layout/MetaData'
import Loader from "../Layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../Redux/Actions/productActions';
import { useAlert } from "react-alert";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';


const Shop = () => {

  const [currentPage, setCurrentPage] = useState(1)

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();


    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const keyword = params.keyword

      products.reverse()


    useEffect(() => {
      if(error) {
        return alert.error(error)
      }

      dispatch(getProducts(keyword, currentPage));

      
    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
    }

  return (
    <Fragment>
      <Header/>
      {loading ? <Loader/> : (
        <Fragment>
            <MetaData title={'Shop with us at Kezzthechef'} />
            <div className='All-store'>
                  <h1 id="products_heading ">Latest Products</h1>
                      <section id="products" className="container mt-5">
                      <div className="product-map">
                        {products && products.map(product => (
                            <div key={product._id} product={product}>
                                <div className="card p-3 rounded">
                                    <img className="card-img-top mx-auto" src={product.images[0].url} />
                                    <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">
                                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                                    </h5>
                                    <div className="ratings mt-auto">
                                        <div className="rating-outer">
                                        <div className="rating-inner" style={{width: `${(product.ratings / 5) * 100}%`}}></div>
                                        </div>
                                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                    </div>
                                    <p className="card-text">{product.price}</p>
                                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                          </div>
                      </section>
                </div>
        </Fragment>
      )}
      {resPerPage <= productsCount && (
        <div className='d-flex justify-content-center mt-5'>
            <Pagination 
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText= {'Next'}
            prevPageText= {'Prev'}
            firstPageText= {'First'}
            lastPageText= {'Last'}
            itemClass='page-item'
            linkClass='page-link'
            />
        </div>
       )}  

       <Footer/>
        
    </Fragment>
  )
}

export default Shop
