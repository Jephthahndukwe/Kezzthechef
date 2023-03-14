import React from 'react'
import './Promo.css'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const Promo = () => {
  return (
    <div>
      <Header/>
      <div className='promo-bg'>
      <div className='bg-text'>
            <h2 className='text-center'>Promo</h2>
            <div className='d-flex gap-2 bg-link'>
                <Link to='/' className='text-decoration-none text-white'>Home</Link>
                <p className='text-white'>{'>'}</p>
                <Link to='/Promo' className='text-decoration-none text-white'>Promo</Link>
            </div>
        </div>
      </div>
      <div className='container promo'>
        <h1 className='text-center mt-5 f2-style'>NO PROMO AVAILABLE</h1>
      </div>

      <Footer/>
    </div>
  )
}

export default Promo
