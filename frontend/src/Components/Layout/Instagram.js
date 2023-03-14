import React from 'react'
import backery from './Assets/backery-slider-01.webp'
import backery2 from './Assets/backery-slider-02.webp'
import backery3 from './Assets/backery-slider-03.webp'

const Instagram = () => {
  return (
    <div className=' mt-5'>
      <h5 className='text-center text-color f2-style'>@Kezz_thechef</h5>
      <h1 className='text-center f-style mt-4 fw-bold'>Follow on instagram</h1>
      <div className='d-flex gap-4 insta-img'>
        <img src={backery} />
        <img src={backery2} />
        <img src={backery3} />
        <img src={backery3} />
        <img src={backery2} />
      </div>
    </div>
  )
}

export default Instagram
