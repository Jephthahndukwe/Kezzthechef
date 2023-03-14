import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Layout/Footer';
import Home from './Components/Home'
import About from './Components/About/About'
import Promo from './Components/Promo/Promo'
import Contact from './Components/Contact/Contact'
import store from './Redux/Store'
import axios from 'axios';

//Product Imports
import ProductDetails from './Components/Product/ProductDetails'
import Shop from './Components/Store/Shop'


//User Imports
import Login from './Components/Users/Login/Login';
import Register from './Components/Users/Register/Register';
// import ProtectedRoute from './Components/Route/ProtectedRoute';
import Profile from './Components/Users/Profile/Profile';
import UpdateProfile from './Components/Users/Profile/UpdateProfile';
import { loadUser } from './Redux/Actions/UserActions';
import UpdatePassword from './Components/Users/Profile/UpdatePassword';
import ForgotPassword from './Components/Users/Profile/ForgotPassword';
import NewPassword from './Components/Users/Profile/NewPassword';

//Cart Imports
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping'
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import Success from './Components/Cart/Success';

// Order Imports
import ListOrders from './Components/Order/ListOrders';
import OrderDetails from './Components/Order/OrderDetails';


// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


//Admin Imports
import Dashboard from './Components/Admin/Dashboard';
import ProductList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderLists from './Components/Admin/OrderLists';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UserList from './Components/Admin/UserList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';






function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
  store.dispatch(loadUser())

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapi');
    setStripeApiKey(data.stripeApiKey)
  }

  getStripeApiKey();

  }, [])

  

  return (
    <div className="App">
        <Routes>
          
          {/* PAGES */}
          <Route path='/' element={ <Home/> } exact />
          <Route path='/About' element={ <About/> } />
          <Route path='/Contact' element={ <Contact/> } />
          <Route path='/Promo' element={ <Promo/> } />


          {/* PRODUCTS */}
          <Route path="/Product/:id" element={ <ProductDetails/> } exact />
          <Route path='/Shop' element={ <Shop/> } exact />
          <Route path='/search/:keyword' element={ <Shop/> } />


          {/* USER  */}
          <Route path='/Login' element={ <Login/> } />
          <Route path='/Register' element={ <Register/> } />
          <Route path='/me' element={ <Profile/> } exact />
          <Route path='/me/update' element={ <UpdateProfile/> } />
          <Route path='/password/update' element={ <UpdatePassword/> } exact />
          <Route path='/password/forgot' element={ <ForgotPassword/> } exact />
          <Route path='/password/reset/:token' element={ <NewPassword/> } exact />

        {/* CART */}
          <Route path='/Cart' element={ <Cart/> } exact />
          <Route path='/shipping' element={ <Shipping/> } exact />
          <Route path='/order/confirm' element={ <ConfirmOrder/> } />
          {stripeApiKey && 
            <Route path='/payment' element={ <Elements stripe={loadStripe(stripeApiKey)}>
               <Payment/>
            </Elements> } />
          }
          <Route path='/success' element={ <Success/> } />


          {/* ORDERS */}
          <Route path='/orders/me' element={ <ListOrders/> } exact />
          <Route path='/order/:id' element={ <OrderDetails/> } />


          {/* ADMIN */}
          <Route path='/Dashboard' isAdmin={true} element={ <Dashboard/> } exact />
          <Route path='/admin/products' isAdmin={true} element={ <ProductList/> } exact />
          <Route path='/admin/product' isAdmin={true} element={ <NewProduct/> } exact />
          <Route path='/admin/product/:id' isAdmin={true} element={ <UpdateProduct/> }  exact />
          <Route path='/admin/orders' isAdmin={true} element={ <OrderLists/> }  exact />
          <Route path='/admin/order/:id' isAdmin={true} element={ <ProcessOrder/> }  exact />
          <Route path='/admin/users' isAdmin={true} element={ <UserList/> }  exact />
          <Route path='/admin/user/:id' isAdmin={true} element={ <UpdateUser/> }  exact />
          <Route path='/admin/reviews' isAdmin={true} element={ <ProductReviews/> }  exact />

        </Routes>
    </div>
      
  );
}

export default App;
