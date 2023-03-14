import React from 'react'
import { Link } from 'react-router-dom'  
import success from '../Assets/success.png'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'

const Success = () => {
  return (
    <>
    <Header/>
    <div className='confirm-order success'>
      <h2 className='text-center f2-style'>Payment Successful</h2>
        <div className='success-page'>
            <img src={success} />
       </div>
       <p className='text-center mt-5'><Link to='/' className='text-white text-decoration-none success-btn'>Move back to Homepage</Link></p>
    </div>
    <Footer/>
    </>
  )
}

export default Success
