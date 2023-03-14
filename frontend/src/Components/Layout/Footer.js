import React, { Fragment } from 'react'
import './Navbar.css'
import pay from '../Assets/pay-image.png'

const Footer = () => {
  return (
   <Fragment>
    <footer>
     <div className='contact-footer'>
    <div className='container'>
      <div className='footer mt-5'>
        <div className='footer-box'>
            <h4>Kezzthechef</h4>
            <p>WHat is Kezzthechef</p>
            <p>How it works</p>
            <p>Our mission</p>
            <p>About us</p>
        </div>
        <div className='footer-box'>
            <h4>FAQ</h4> 
            <p>Membership</p>
            <p>Ordering</p>
            <p>Delivery</p>
            <p>Return</p>
        </div>
        <div className='footer-box'>
            <h4>Legal</h4>
            <p>Return Policy</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
        </div>
        <div className='footer-box'>
            <h4>Have a question?</h4>
            <p>Help Centre</p>
            <p>help@kezzthechef.com</p>
        </div>
      </div>
      <div className='footer-pay'>
        <img src={pay}/>
      </div>
      <p className='text-center foot-p'>Copyright © 2023 <span className='text-dark fw-bold'> Kezzthechef. </span> All rights reserved. Sustainable Workspaces, 3, Salami Street Mafoluku Oshodi</p>
    </div>
    </div>
    </footer>
   </Fragment>
  )
}

export default Footer
