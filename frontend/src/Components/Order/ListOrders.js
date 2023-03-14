import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors} from '../../Redux/Actions/OrderActions'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';


const ListOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders())

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        orders.forEach( order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                        ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: 
                    <Link to={`/order/${order._id}`} className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </Link>
            })
        })

        return data;
    }
    

  return (
    <Fragment>
      <MetaData title={'My Orders'} />

      <Header/>

    <div className='container my-orders'>
      <h1 className='my-5'>My Orders</h1>

      {loading ? <Loader/> : (
        <MDBDataTable 
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
        />
      )}
      </div>

      <Footer/>
    </Fragment>
  )
}

export default ListOrders
