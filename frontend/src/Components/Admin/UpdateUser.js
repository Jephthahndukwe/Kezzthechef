import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'

import MetaData from '../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser, getUserDetails, clearErrors } from '../../Redux/Actions/UserActions'
import Header from '../Layout/Header'
import { UPDATE_USER_RESET } from '../../Redux/Constants/UserConstants'

const UpdateUser = () => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')

  const alert = useAlert();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error, isUpdated } = useSelector(state => state.users);
  const { user } = useSelector(state => state.userDetails)

  const userId = params.id;

  useEffect(() => {

    if(user && user._id !== userId) {
        dispatch(getUserDetails(userId))
    } else {
      setFullname(user.fullname);
      setEmail(user.email);
      setMobile(user.mobile);
      setRole(user.role)
    }
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if(isUpdated) {
        alert.success('User updated successfully')

        navigate('/admin/users')

        dispatch({
            type: UPDATE_USER_RESET
        })
    }

  }, [dispatch, alert, error, navigate, isUpdated, user, userId])


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fullname", fullname)
    formData.set("email", email)
    formData.set("mobile", mobile)
    formData.set("role", role)

    dispatch(updateUser(user._id, formData))
  }
  

  return (
    <Fragment>
    <MetaData title={`Update User`} />
      <Header/>
      <div className='admin-product_list'>
        <div className='d-flex'>
          <Sidebar/>

          <div className='admin-box-product'>
          <div className="container-container-fluid">
       <div className="mt-5">
                <div className="new-product">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
								type="text" 
								id="name_field" 
								className="form-control"
                                name='name'
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
                            <label htmlFor="mobile_field">Mobile</label>
                            <input
                                type="text"
                                id="mobile_field"
                                className="form-control"
                                name='mobile'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        
    </div>
          </div>
        </div>
      </div>
  </Fragment>
  )
}

export default UpdateUser
