import React, { Fragment, useState } from 'react'
import './Cart.css'
// import { Link } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../Redux/Actions/CartActions'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer'


const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [popularBusStop, setPopularBusStop] = useState(shippingInfo.popularBusStop)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [state, setState] = useState(shippingInfo.state)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, popularBusStop, phoneNo, state }))
        navigate('/order/confirm')
    }

  return (
    <Fragment>
      <MetaData title={'Shipping Info'} />

       <Header/>

        <div className='shipping-info'>
       <div className="row wrapper">
       <CheckoutSteps shipping />
                <div className="col-10 col-lg-5 mt-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="PopularBusStop_field">Popular Bus Stop Around</label>
                            <input
                                type="text"
                                id="PopularBusStop_field"
                                className="form-control"
                                value={popularBusStop}
                                onChange={(e) => setPopularBusStop(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <select
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            >
                                    <option>
                                        USA
                                    </option>
                                    <option>
                                        Nigeria
                                    </option>

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
            </div>

            <Footer/>
    </Fragment>
  )
}

export default Shipping
