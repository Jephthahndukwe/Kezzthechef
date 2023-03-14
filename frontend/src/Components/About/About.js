import React, { Fragment, useState } from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import { BsBriefcase, BsTags } from 'react-icons/bs'
import { HiOutlineUsers } from 'react-icons/hi'
import company from './Assets/our-company.webp'
import team from './Assets/Team-work.webp'
import mission from './Assets/mission.avif'
import vision from './Assets/vision.avif'
import idea from './Assets/idea.avif'
import chika from './Assets/Chika.jpeg'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

import MetaData from '../Layout/MetaData'
// import Loader from "../Layout/Loader";

// import { useSpring, animated } from 'react-spring'


// function Number({ n }) {
//     const { number } = useSpring({
//         from: { number: 0 },
//         number: n,
//         delay: 1000,
//         config: { mass: 1, tension: 20, friction: 10 },
//     });
//     return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
// }

const About = () => {
  return (
    <Fragment>
        <MetaData title={'About Us'} />

        <Header/>
      <div className='about-bg'>
      <div className='bg-text'>
            <h2 className='text-center text-white'>About us</h2>
            <div className='d-flex gap-2 bg-link'>
                <Link to='/' className='text-decoration-none text-white'>Home</Link>
                <p className='text-white text-center'>{'>'}</p>
                <Link to='/About' className='text-decoration-none text-white'>About</Link>
            </div>
        </div>
      </div>
      <div className='container'>
      <div className='about-company'>
        <div className='d-sm-flex'>
            <img src={company} />
            <div className='about-company-text'>
                <h6 className='f2-style'>Our company</h6>
                <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
            </div>
        </div>
      </div>

      <div className='about-team'>
        <div className='d-sm-flex'>
            <div className='about-team-text'>
                <h6 className='f2-style'>Team work</h6>
                <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
            </div>
            <img src={team} />
        </div>
      </div>
      </div>

      <div className='about-vision'>
        <div className='d-flex gap-4 container'>
            <div>
                <img src={mission} />
                <div className='mt-3'>
                    <h6 className='text-center f2-style'>Our mission</h6>
                    <p className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
            <div>
                <img src={vision} />
                <div className='mt-3'>
                    <h6 className='text-center f2-style'>Our vision</h6>
                    <p className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
            <div>
                <img src={idea} />
                <div className='mt-3'>
                    <h6 className='text-center f2-style'>Our idea</h6>
                    <p className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='about-years d-flex gap-4'>
            <div className='years-bg'>
                <div className='years-sec-bg'>
                    <h5 className='text-center d-flex'>10+</h5>
                    <h6 className='text-center'>Years</h6>
                </div>
                <div className='years-icon'>
                    <div className='year-icon-bg'>
                       <BsBriefcase/>
                    </div>
                </div>
            </div>
            <div className='years-bg'>
                <div className='years-sec-bg'>
                    <h5 className='text-center d-flex'>100+</h5>
                    <h6 className='text-center'>Clients</h6>
                </div>
                <div className='years-icon icon2'>
                    <div className='year-icon-bg'>
                       <HiOutlineUsers/>
                    </div>
                </div>
            </div>
            <div className='years-bg'>
                <div className='years-sec-bg'>
                    <h5 className='text-center d-flex'>10+</h5>
                    <h6 className='text-center'>Years</h6>
                </div>
                <div className='years-icon icon3'>
                    <div className='year-icon-bg'>
                       <BsBriefcase/>
                    </div>
                </div>
            </div>
            <div className='years-bg'>
                <div className='years-sec-bg'>
                    <h5 className='text-center d-flex'>500K+</h5>
                    <h6 className='text-center'>Sales</h6>
                </div>
                <div className='years-icon icon4'>
                    <div className='year-icon-bg'>
                       <BsTags/>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='container'>
        <div className='about-our-team'>
            <h4 className='text-color'>STRONG MISSION</h4>
            <h3>Our team</h3>
            <div className='d-sm-flex mt-5'>
                <div>
                    <img src={chika}/>
                    <div className='mt-3'>
                        <h5 className='f2-style text-start'>Jephthah Ndukwe</h5>
                        <h6 className='text-start'>Web Developer</h6>
                    </div>
                </div>
                <div>
                    <img src={chika}/>
                    <div className='mt-3'>
                        <h5 className='f2-style text-start'>Jephthah Ndukwe</h5>
                        <h6 className='text-start'>Web Developer</h6>
                    </div>
                </div>
                <div>
                    <img src={chika}/>
                    <div className='mt-3'>
                        <h5 className='f2-style text-start'>Jephthah Ndukwe</h5>
                        <h6 className='text-start'>Web Developer</h6>
                    </div>
                </div>
                <div>
                    <img src={chika}/>
                    <div className='mt-3'>
                        <h5 className='f2-style text-start'>Jephthah Ndukwe</h5>
                        <h6 className='text-start'>Web Developer</h6>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default About
