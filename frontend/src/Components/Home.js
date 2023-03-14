import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { sliderData } from "./SliderData";
import h1 from '../Components/Assets/h1-bn1.jpg'
import h2 from '../Components/Assets/h1-bn2.jpg'
import h3 from '../Components/Assets/h1-bn3.jpg'
import slide1 from '../Components/Assets/Slide1.jpg'
import slide2 from '../Components/Assets/Slide2.jpg'
import slide3 from '../Components/Assets/Slide3.jpg'
import slide4 from '../Components/Assets/Slide4.jpg'
import slide5 from '../Components/Assets/Slide5.jpg'
import slide6 from '../Components/Assets/Slide6.jpg'
import { FaShoppingBasket } from "react-icons/fa";

import MetaData from './Layout/MetaData'
import Product from "./Product/Product";
import Loader from "./Layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../Redux/Actions/productActions' 
import { useAlert } from "react-alert";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Testimonial from "./Review/Testimonial";
import { getProductReviews, deleteReview, clearErrors } from '../Redux/Actions/productActions';



const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    products.reverse();

    useEffect(() => {
      if(error) {
        return alert.error(error)
      }

      dispatch(getProducts());

      
    }, [dispatch, alert, error ])

// -------------------------------------------------------------------------------------------------------


  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 8000;

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1);
  }

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime)
  }

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <Fragment>
      <Header/>
      {loading ? <Loader/> : (
        <Fragment>
           <MetaData title={'Buy Best Groceries Online'}/>
              <div className='container'>
              <div className='slide-main d-flex'>
              <div className="slide-img d-flex">
                    <img src={slide1}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
                <div className="slide-img d-flex">
                    <img src={slide2}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
                <div className="slide-img d-flex">
                    <img src={slide3}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
                <div className="slide-img d-flex">
                    <img src={slide4}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
                <div className="slide-img d-flex">
                    <img src={slide5}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
                <div className="slide-img d-flex">
                    <img src={slide6}/>
                    <p className="text-start ms-2 mt-2">Mangoess <br/> <span className='f-style'>Fruit Drupe</span></p>            
                </div>
              </div>
              </div>

              <div className="haed container">
              <div className="sliding">
                <div className="slider">
                    <IoIosArrowBack className="arrow prev" onClick={prevSlide}/>
                    <IoIosArrowForward className="arrow next" onClick={nextSlide} />
                    <FaShoppingBasket className="shopping-sticky-cart"/>
                    {
                      sliderData.map((slide, index) => {
                        return(
                          <div>
                            {index === currentSlide && (
                              <div className="head-slide">
                                <img src={slide.image} alt='slide'/>
                                <div className="head-content">
                                  <h5 className="text-center text-white f-style">{slide.name}</h5>
                                  <h2 className="text-center text-white">{slide.heading}</h2>
                                  <Link to='/Shop' className="text-decoration-none f-style text-white">{slide.link}</Link>
                                </div>
                              </div> 
                            )}
                          </div>
                        )
                      })
                    }
                </div>
                </div>
              <div className="d-flex gap-4 container head-caption f2-style">
                    <div className="cap-box">
                        <div className='head-caption-text'>
                        <h3 className="text-start">Green World <br/> <span className="text-color">40%</span> sale off</h3>
                        <a href='' className="caption-link">SHOP NOW</a>
                        </div>
                        <img src={h1}/>
                        <div className="cap-bg"></div>
                    </div>
                    <div className="cap-box">
                    <div className='head-caption-text'>
                        <h3 className="text-start">Green World <br/> <span className="text-color">40%</span> sale off</h3>
                        <a href='' className="caption-link">SHOP NOW</a>
                        </div>
                        <img src={h2}/>
                        <div className="cap-bg"></div>
                    </div>
                    <div className="cap-box">
                    <div className='head-caption-text'>
                        <h3 className="text-start">Green World <br/> <span className="text-color">40%</span> sale off</h3>
                        <a href='' className="caption-link">SHOP NOW</a>
                        </div>
                        <img src={h3}/>
                        <div className="cap-bg"></div>
                    </div>
                </div>
                </div>

                  <div>
                  <h1 id="products_heading ">Latest Products</h1>
                      <section id="products" className="container mt-5">
                      <div className="product-map">
                        {products && products.slice(0, 8).map(product => (
                            <Product key={products._id} product={product} />
                        ))}
                          </div>
                      </section>
                </div>
        </Fragment>
      )}

      <Footer/>
      </Fragment>
  )
}

export default Home