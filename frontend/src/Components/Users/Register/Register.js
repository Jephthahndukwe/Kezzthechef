import React, { Fragment, useState, useEffect } from 'react'
import './Register.css'
import { Link } from 'react-router-dom' 

import MetaData from '../../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, clearErrors } from '../../../Redux/Actions/UserActions'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'

const Register = () => {

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: '',
  })

  const { fullname, email, mobile, password } = user;

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isAuthenticated, error, loading } = useSelector(state => state.user);

  useEffect(() => {

    if(isAuthenticated) {
      navigate('/')
    }
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, navigate])


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fullname", fullname)
    formData.set("email", email)
    formData.set("mobile", mobile)
    formData.set("password", password)
    formData.set("avatar", avatar)

    dispatch(register(formData))
  }

  const onChange = e => {
    if(e.target.name === 'avatar') {

      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])

    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <Fragment>
      <MetaData title={'Register User'} />
      <Header/>
    <div>
     <div className='register-head'>
     <div>
            <h3 className='text-center'>Register</h3>
      </div>
        <div className='login-details'>
          <form onSubmit={submitHandler} encType='multipart/form-data'>
            <label>Full Name</label><br/>
            <input 
              type='text' 
              value={fullname} 
              onChange={onChange} 
              name= 'fullname'
              placeholder='Full Name' 
              required
            /><br/>
            <label>Email Address</label><br/>
            <input 
              type='email' 
              name= 'email'
              value={email}
              onChange={onChange}
              placeholder='Email Address' 
              required
            /><br/>
            <label>Phone Number</label><br/>
            <input 
              type='text' 
              name='mobile'
              value={mobile} 
              onChange={onChange} 
              placeholder='Phone Number' 
              required
            /><br/>
            <label>Password</label><br/>
            <input 
              type='password' 
              name='password'
              value={password} 
              onChange={onChange} 
              placeholder='Password' 
              required
            /><br/>
            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept="images/*"
                          onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
              <button 
                type='submit' 
                className='register-btn' 
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
              <Link to='/Login' className='mt-4'>Already have an account</Link>
          </div>
          </form>
        </div>
     </div>
    </div>

    <Footer/>
    </Fragment>
  )
}

export default Register
