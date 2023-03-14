import React from 'react'
// import './Home.css'
import Slider from "react-slick";


const Testimonial = ({reviews}) => {


  return (
    <div className='test-bg mt-5'>
        <div className='container test-contain'>
          <h2 className='f2-style text-center'>Loved by thousands of Kezz</h2>
          <div className='line line2 align-items-center'></div>
          <div className='mt-5'>
            {reviews && reviews.map(review => (
              <div className='testi-box' key={review._id}>
              <div className='d-flex'>
                {/* <img src={review.image} /> */}
                <div className='ms-3 mt-3'>
                  <p className='test-name'>{review.fullname}</p>
                  <div className="rating-outer">
                      <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
                <p className='mt-4 test-text'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Testimonial
