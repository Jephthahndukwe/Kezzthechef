import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ordersDetails, updateOrders, clearErrors } from '../../Redux/Actions/OrderActions'
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { UPDATE_ORDERS_RESET } from '../../Redux/Constants/OrderConstant';

const ProcessOrder = () => {

    const [status, setStatus] = useState('')

    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    // const { loading, order = {} } = useSelector(state => state.getOrderDetails);
    // const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    // const { error, isUpdated } = useSelector(state => state.order);

    const orderDetails = useSelector(state => state.ordersDetails || {});
    const { loading, order = {} } = orderDetails;
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order);
    

    const orderId = params.id;

    useEffect(() => {

        dispatch(ordersDetails(orderId))

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated) {
          alert.success('Order updated Successfully')
          dispatch({ type: UPDATE_ORDERS_RESET })
        }
    }, [dispatch, alert, error, isUpdated, orderId])

   

    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set("status", status)
    
        dispatch(updateOrders(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.popularBusStop}, ${shippingInfo.state}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

  return (
    <Fragment>
    <MetaData title={`Process Order # ${order && order._id}`} />
      <Header/>
      <div className='admin-product_list'>
        <div className='d-flex'>
          <Sidebar/>

          <div className='admin-box-product'>
            <Fragment>
                {loading ? <Loader/> : (
                     <div className="container container-fluid">
	
                     <div className="row d-flex justify-content-around">
                                 <div className="col-12 col-lg-7 order-details">
             
                                     <h2 className="my-5">Order # {order._id}</h2>
             
                                     <h4 className="mb-4">Shipping Info</h4>
                                     <p><b>Name:</b> {user && user.fullname}</p>
                                     <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                     <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                     <p><b>Amount:</b> ${totalPrice}</p>
             
                                     <hr />
             
                                     <h4 className="my-4">Payment</h4>
                                     <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>

                                     <h4 className="my-4">Stripe ID</h4>
                                     <p className=''><b>{paymentInfo && paymentInfo.id}</b></p>


                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>
                                     
                          
                                     <h4 className="my-4">Order Items:</h4>
             
                                     <hr />
                                     <div className="cart-item my-1">
                                     {orderItems && orderItems.map(item => {
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.Price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    })}
                                     </div>
                                     <hr />
                                 </div>
                                 
                                 <div className="col-12 col-lg-3 mt-5">
                                                 <h4 className="my-4">Status</h4>
             
                                                 <div className="form-group">
                                                     <select
                                                         className="form-control"
                                                         name='status'
                                                         value={status}
                                                         onChange={(e) => setStatus(e.target.value)}
                                                     >
                                                         <option value="Processing">Processing</option>
                                                         <option value="Delivered">Delivered</option>
                                                     </select>
                                                 </div>
             
                                                 <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                                     Update Status
                                             </button>
                                             </div>
                                 
                             </div>
                     
                 </div>
                )}
            </Fragment>
          </div>
        </div>
      </div>
  </Fragment>
  )
}

export default ProcessOrder
