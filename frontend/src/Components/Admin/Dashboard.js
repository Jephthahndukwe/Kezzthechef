import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../Redux/Actions/productActions';
import { allOrders } from '../../Redux/Actions/OrderActions'
import { allUsers } from '../../Redux/Actions/UserActions'
import Header from '../Layout/Header'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if(product.stock === 0)
         outOfStock += 1
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])
    

  return (
    <Fragment>
        <Header/>
       <div className='admin-dashboard'>
        <div className='d-flex'>
            <Sidebar/>

            <div className="dash mt-2">
                    <h1 className="my-4">Dashboard</h1>

                        {loading ? <Loader/> : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="dash-amount">
                                <div className=" mb-3 ">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='dashboard-box'>
                                <div className='text-white bg-success dash-box'>
                                    <h4 className='text-center card-font-size'>Products <br/> {products && products.length}</h4>
                                 <div className='mt-5 card-footer'>
                                 <Link className=' text-white small' to='/admin/products'>
                                    <span className='float-left'>View Details</span>
                                    <span className='float-right'>
                                        <i className='fa fa-angle-right'></i>
                                    </span>
                                 </Link>
                                 </div>
                                </div>
                                <div className='text-white bg-danger dash-box'>
                                    <h4 className='text-center card-font-size'>Orders <br/> {orders && orders.length}</h4>
                                <div className='mt-5 card-footer'>
                                <Link className=' text-white small z-1' to='/admin/orders'>
                                    <span className='float-left'>View Details</span>
                                    <span className='float-right'>
                                        <i className='fa fa-angle-right'></i>
                                    </span>
                                 </Link>
                                </div>
                                </div>
                                <div className='text-white bg-info dash-box'>
                                    <h4 className='text-center card-font-size'>Users <br/> {users && users.length}</h4>
                                 <div className='mt-5 card-footer'>
                                 <Link className=' text-white small z-1' to='/admin/users'>
                                    <span className='float-left'>View Details</span>
                                    <span className='float-right'>
                                        <i className='fa fa-angle-right'></i>
                                    </span>
                                 </Link>
                                 </div>
                                </div>
                                <div className='text-white bg-warning dash-box'>
                                    <h4 className='text-center card-font-size'>Out of Stock <br/> {outOfStock}</h4>
                                </div>
                            </div>   

                            </Fragment>
                        )}
                </div>
        </div>
       </div>
    </Fragment>
  )
}

export default Dashboard
