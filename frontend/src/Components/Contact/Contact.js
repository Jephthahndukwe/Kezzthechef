import React, {Fragment} from 'react'
import './Contact.css'
import { Link } from 'react-router-dom'
import { FaLocationArrow, FaEnvelope } from 'react-icons/fa'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import MetaData from '../Layout/MetaData'


const Contact = () => {
  return (
    <Fragment>
      <MetaData title={'Contact Us'} />
      <Header/>
      <div className='contact-bg'>
        <div className='bg-text'>
            <h2 className='text-center'>Contact us</h2>
            <div className='d-flex gap-2 bg-link'>
                <Link to='/' className='text-decoration-none text-white'>Home</Link>
                <p className='text-white'>{'>'}</p>
                <Link to='/Contact' className='text-decoration-none text-white'>Contact</Link>
            </div>
        </div>
      </div>
      <div className='container d-sm-flex mt-5 contact-contain'>
        <div className='contact-info'>
            <h4>Store Information</h4>
            <div className='d-flex mt-4'>
                <p><FaLocationArrow className='info-icons'/></p>
                <p className='text-start ms-3'>At Galvatron <br/> United States</p>
            </div>
            <hr/>
            <div className='d-flex'>
                <p><FaEnvelope className='info-icons'/></p>
                <p className='ms-3 text-start'>Email us: <br/> demo@demo.com</p>
            </div>
        </div>
        <div className='contact-form ms-sm-5'>
            <form>
              <h4>Contact us</h4>
              <label>Subject</label>
              <select required>
                <option>Customer Service</option>
                <option>Web Master</option>
              </select><br/>
              <label className='mt-4'>Email</label>
              <input type='text' placeholder='your@email.com' required /><br/>
              <label className='mt-4'>Attachment</label>
              <label className='con-atach'>
                <input type='file'/>
                <p>CHOOSE FILE</p>
              </label><br/>
              <label className='lab-mess'>Message</label>
              <textarea placeholder='How can we help you' required /><br/>
              <button type='submit'>Send</button>
            </form>
        </div>
      </div>

      <Footer/>
    </Fragment>
  )
}

export default Contact
