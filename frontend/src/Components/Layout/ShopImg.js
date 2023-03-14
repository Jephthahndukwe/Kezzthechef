import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import backery from '../Assets/backery-product-02.avif'
import backery2 from '../Assets/backery-product-03-a.png'
import backery3 from '../Assets/backery-product-10.png'

const ShopImg = () => {
  return (
    <div className='shopImg bg-white'>
      <div className='container'>
        <div className='d-flex'>
            <div className='shopimg-box'>
                <div className='d-flex'>
                    <img src={backery}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery2}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery3}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
            </div>
            <div className='shopimg-box boxx'>
            <div className='d-flex'>
                    <img src={backery}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery2}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery3}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <img src={backery}/>
                    <div className='ms-2'>
                        <p className='f2-style'>Health cake pastry</p>
                        <p className='shopimg-price f2-style text-color'>$90.00</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='shopoimg-box2'>
                    <div className='d-flex gap-4'>
                        <div className='d-flex'>
                            <img src={backery} />
                        <div className='shoping-box mt-4'>
                            <p className='f2-style'>Health cake pastry</p>
                            <p className='shopimg-price f2-style text-color'><span>$90.00</span> $50.00</p>
                        </div>
                        </div>
                        <div className='d-flex ms-5'>
                            <img src={backery} />
                        <div className='shoping-box mt-4'>
                            <p className='f2-style'>Health cake pastry</p>
                            <p className='shopimg-price f2-style text-color'><span>$90.00</span> $50.00</p>
                        </div>
                        </div>
                    </div>
                    <div className='d-flex gap-4 boox'>
                        <div className='d-flex'>
                            <img src={backery} />
                        <div className='shoping-box mt-4'>
                            <p className='f2-style'>Health cake pastry</p>
                            <p className='shopimg-price f2-style text-color'><span>$90.00</span> $50.00</p>
                        </div>
                        </div>
                        <div className='d-flex ms-5'>
                            <img src={backery} />
                        <div className='shoping-box mt-4'>
                            <p className='f2-style'>Health cake pastry</p>
                            <p className='shopimg-price f2-style text-color'><span>$90.00</span> $50.00</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='shop-see'>
            <Link to='/Shop' className='f-style'>See More <IoIosArrowForward/></Link>
        </div>
      </div>
    </div>
  )
}

export default ShopImg
