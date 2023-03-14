import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors, deleteProduct } from '../../Redux/Actions/productActions';
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../Redux/Constants/ProductConstants';

const ProductList = () => {

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts())

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }

        if(isDeleted) {
          alert.success('Product deleted successfully')
          navigate('/admin/products');
          dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, navigate, isDeleted])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={() => deleteProductHandler(product._id)}>
                    <i className='fa fa-trash'></i>
                    </button>
                  </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id))
    } 

  return (
    <Fragment>
      <MetaData title={'All Products'} />
        <Header/>
        <div className='admin-product_list'>
          <div className='d-flex'>
            <Sidebar/>

            <div className='admin-box-product'>
              <Fragment>
                 <h1 className='mt-4 ms-3'>ALL Products</h1>

                 {loading ? <Loader/> : (
                  <div className='admin-box'>
                      <MDBDataTable 
                      data={setProducts()}
                      className="px-3 admin-products"
                      bordered
                      striped
                      hover
                  />
                </div>
                 )}
              </Fragment>
            </div>
          </div>
        </div>
    </Fragment>
  )
}

export default ProductList
