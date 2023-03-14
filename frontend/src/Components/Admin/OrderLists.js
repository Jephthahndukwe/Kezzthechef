import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearErrors, deleteOrders } from '../../Redux/Actions/OrderActions';
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { DELETE_ORDERS_RESET } from '../../Redux/Constants/OrderConstant';

const OrderLists = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
  
      const { loading, error, orders } = useSelector(state => state.allOrders);
      const { isDeleted } = useSelector(state => state.order);
  
      useEffect(() => {
          dispatch(allOrders())
  
          if(error) {
              alert.error(error);
              dispatch(clearErrors());
          }
  
          if(isDeleted) {
            alert.success('Order deleted successfully')
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDERS_RESET })
          }
  
      }, [dispatch, alert, error, isDeleted, navigate])

      const deleteOrderHandler = (id) => {
        dispatch(deleteOrders(id))
      }
  
      const setOrders = () => {
          const data = {
              columns: [
                  {
                      label: 'Order ID',
                      field: 'id',
                      sort: 'asc'
                  },
                  {
                      label: 'No of Items',
                      field: 'numofItems',
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
                  }
              ],
              rows: []
          }
  
          orders.forEach( order => {
              data.rows.push({
                  id: order._id,
                  numofItems: order.orderItems.length,
                  amount: `$${order.totalPrice}`,
                  status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                        ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                  actions: <Fragment>
                      <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                          <i className='fa fa-eye'></i>
                      </Link>
                      <button className='btn btn-danger py-1 px-2 ml-2' onClick={() => deleteOrderHandler(order._id)}>
                      <i className='fa fa-trash'></i>
                      </button>
                    </Fragment>
              })
          })
  
          return data;
      }

  return (
    <Fragment>
    <MetaData title={'All Orders'} />
      <Header/>
      <div className='admin-product_list'>
        <div className='d-flex'>
          <Sidebar/>

          <div className='admin-box-product'>
            <Fragment>
               <h1 className='mt-4 ms-3'>ALL Orders</h1>

               {loading ? <Loader/> : (
                <div className='admin-box'>
                    <MDBDataTable 
                    data={setOrders()}
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

export default OrderLists
