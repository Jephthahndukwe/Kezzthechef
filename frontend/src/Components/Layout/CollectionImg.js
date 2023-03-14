import React from 'react'
import menu from '../Assets/menu-banner-01.avif'
import menu2 from '../Assets/menu-banner-02.avif'
import menu3 from '../Assets/menu-banner-03.avif'
import menu4 from '../Assets/menu-banner-04.avif'
import './Navbar.css'

const CollectionImg = () => {
  return (
    <div>
      <div className='collection-bg bg-white'>
                  <div className='d-flex gap-3'>
                    <div className='menu-img'>
                    <div className='menu-dark-bg'></div>
                       <img src={menu} />
                       <h6 className='text-center f-style'>Bread</h6>
                    </div>
                    <div className='menu-img'>
                      <div className='menu-dark-bg'></div>
                       <img src={menu2} />
                       <h6 className='text-center f-style'>Cakes</h6>
                    </div>
                    <div className='menu-img'>
                    <div className='menu-dark-bg'></div>
                       <img src={menu3} />
                       <h6 className='text-center f-style'>Bun</h6>
                    </div>
                    <div className='menu-img'>
                    <div className='menu-dark-bg'></div>
                       <img src={menu4} />
                       <h6 className='text-center f-style'>Pastries</h6>
                    </div>
                  </div>
                </div>  
    </div>
  )
}

export default CollectionImg
