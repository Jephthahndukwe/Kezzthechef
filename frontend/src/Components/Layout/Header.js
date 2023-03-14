import React, { Fragment, useState } from 'react'
import './Navbar.css'
import { FaPhone, FaUserCog, FaShoppingBasket, FaSearch, FaLock, FaUser, FaHeart } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { RiLogoutCircleRLine, RiShoppingBag3Fill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import CollectionImg from './CollectionImg'
import ShopImg from './ShopImg'
import Search from './Search'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../Redux/Actions/UserActions'

const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully')
  }


  const [show2, setShow2] = useState(false)


  return (
    <Fragment> 
        <div className='navbar'>
      <div className='container d-flex justify-content-between align-items-center nav-user'>
        <p>Free Shipping on all orders!</p>
        <div className='d-flex align-items-center nav-acc'>
          <p className='mt-1'><a href='tel:09079889747' className='text-decoration-none'><FaPhone className='me-2 nav-icon'/>(+234) 9079889747</a></p>
          <p className='ms-4 nav-account'><FaUserCog className='me-2 nav-icon'/>Account
            <div className='account-box'>
              {
              user ? (
                <div>
                   <p><Link to='/me' className='text-decoration-none text-white'><FaUser/> <span className='ms-3'>Profile</span> </Link></p>
                   {user && user.role === 'admin' && (
                     <p><Link to='/Dashboard' className='text-decoration-none text-white'><RxDashboard/><span className='ms-3'>Dashboard</span></Link></p>
                   )}
                   <p><Link to='/orders/me' className='text-decoration-none text-white'><RiShoppingBag3Fill/><span className='ms-3'>Orders</span></Link></p>
                   <p><Link to='/' onClick={logoutHandler} className='text-decoration-none text-white'><RiLogoutCircleRLine/><span className='ms-3'>Logout</span></Link></p>
                 </div>
              ) : !loading && <p><Link to='/Login' className='text-decoration-none text-white'><FaLock/> <span    className='ms-3'>Sign in</span></Link></p>
              }
            </div>
          </p>
        </div>
      </div>
      <div className='nav-main'>
      <div className='container'>
        <div className='main-nav f-style d-flex justify-content-between align-items-center'>
           <nav>
            <ul className='d-flex align-items-center list-unstyled'>
              <li><Link to='/' className='text-decoration-none text-dark'>Home</Link></li>
              <li className='shopHover'><Link to='/Shop' className='text-decoration-none text-dark'>Shop <IoIosArrowDown className='rotate'/></Link>
              {/* <ShopImg/> */}
              </li>
              <li><Link to='/About' className='text-decoration-none text-dark'>About</Link></li>
              <li><Link to='/Promo' className='text-decoration-none text-dark'>Promo</Link></li>
              <li><Link to='/Contact' className='text-decoration-none text-dark'>Contact</Link> </li>
              <li className='collect'><Link to='/Shop' className='text-decoration-none text-dark'>Collection <IoIosArrowDown className='rotate '/>
                </Link>           
                {/* <CollectionImg/> */}
              </li>
            </ul>
           </nav>
           <div className='d-flex nav-cart '>
             <p><Link to='/Cart' className='text-decoration-none text-white'><FaShoppingBasket className='cart'/><span>{cartItems.length}</span></Link></p>
             <div className='ms-5 mt-2 nav-search' >
              <FaSearch className='search-icon' onClick={() => setShow2(true)}/>
             </div>
           </div>
           {show2 ? <div>
                      <p className='search-time' onClick={() => setShow2(false)}>
                      <span>X</span>
                      </p>
                       <Search/>
                    </div>:null
              }
        </div>
      </div>
      </div>
    </div>
    </Fragment>
  )
}

export default Header
