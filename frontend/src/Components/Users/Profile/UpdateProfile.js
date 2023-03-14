import React, { Fragment, useState, useEffect } from 'react'
import './Profile.css'

import MetaData from '../../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile, loadUser, clearErrors } from '../../../Redux/Actions/UserActions'
import Header from '../../Layout/Header'
import { UPDATE_PROFILE_RESET } from '../../../Redux/Constants/UserConstants'
import Footer from '../../Layout/Footer'

const UpdateProfile = () => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.users)

  useEffect(() => {

    if(user) {
      setFullname(user.fullname);
      setEmail(user.email);
      setMobile(user.Mobile);
      setAvatarPreview(user.avatar.url)
    }

    // if(isAuthenticated === false) {
    //     return <Navigate to='/login'/>
    // }
    // if(isAdmin === true && user.role !== 'admin') {
    //   return <Navigate to='/' />
    // }
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if(isUpdated) {
        alert.success('User updated successfully')
        dispatch(loadUser());

        Navigate('/me')

        dispatch({
            type: UPDATE_PROFILE_RESET
        })
    }

  }, [dispatch, alert, error, Navigate, isUpdated])


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fullname", fullname)
    formData.set("email", email)
    formData.set("mobile", mobile)
    formData.set("avatar", avatar)

    dispatch(updateProfile(formData))
  }

  const onChange = e => {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])

  }

  return (
    <Fragment>
      <MetaData title={'Update Profile'} />
      <Header/>

      <div className="container-container-fluid update-user">
       <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label for="email_field">Name</label>
                            <input 
								type="text" 
								id="name_field" 
								className="form-control"
                                name='fullname'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_field">Mobile</label>
                            <input
                                type="text"
                                id="mobile_field"
                                className="form-control"
                                name='mobile'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

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
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' for='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" 
                            className="btn update-btn btn-block mt-4 mb-3" 
                            disabled={loading ? true : false}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        
    </div>

    <Footer/>
    </Fragment>
  )
}

export default UpdateProfile
