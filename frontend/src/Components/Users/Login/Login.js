import React, {Fragment, useState, useEffect} from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import './Login.css'

import Loader from '../../Layout/Loader'
import MetaData from '../../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../../Redux/Actions/UserActions'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [searchParams] = useSearchParams();

  const { isAuthenticated, error, loading } = useSelector(state => state.user);

  // const redirect = searchParams.get("redirect");

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {

    if(isAuthenticated) {
      navigate(redirect)
    }
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, navigate, redirect])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }
  
  return (
    <Fragment>
      <Header/>
      {loading ? <Loader/> : (
        <Fragment>
          <MetaData title={'Login'} />
           <div className='container'>
       <div className='login-head'>
             <div className='text-center'>
                 <h3>Login</h3>
             </div>
         <div className='login-details'>
             <form onSubmit={submitHandler}>
                 <label>Email Address</label><br/>
                 <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' required /><br/>
                 <label>Password</label><br/>
                 <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required /><br/>
                 <div className='d-flex 9 justify-content-between'>
                   <button type='submit'>SIGN IN</button>
                   <Link to='/password/forgot' className='mt-5'>Forgot your password?</Link>
                 </div>
                 <p><Link to='/Register' className='text-decoration-none'>No account? create one here</Link></p>
             </form>
         </div>
       </div>
    </div>
        </Fragment>
      )}

      <Footer/>
    </Fragment>
  )
}

export default Login

