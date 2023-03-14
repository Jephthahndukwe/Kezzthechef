import React, { Fragment } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MetaData from '../../Layout/MetaData'
import Loader from '../../Layout/Loader'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'

const Profile = () => {

    const { user, loading } = useSelector(state => state.user)

  return (
    <Fragment>
       {loading ? <Loader/> : (
        <Fragment>
            <MetaData title={'Your Profile'} />

        <Header/>
            <div className="container-container-fluid my-profile">
                <h2 className="mt-5 ms-5">My Profile</h2>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3 mt-4">
                        <figure className='avatar avatar-profile'>
                            <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.fullname} />
                        </figure>
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                            Edit Profile
                        </Link>
                    </div>
            
                    <div className="col-md-5">
                        <h4>Full Name</h4>
                        <p>{user.fullname}</p>
            
                        <h4>Email Address</h4>
                        <p>{user.email}</p>

                        <h4>Phone Number</h4>
                        <p>{user.mobile}</p>

                        <h4>Joined On</h4>
                        <p>{String(user.created_at).substring(0, 10)}</p>

                     {user.role !== 'admin' && (
                        <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                         My Orders
                        </Link>
                     )}
                        <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                            Change Password
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
       )}

       <Footer/>
    </Fragment>
  )
}

export default Profile
