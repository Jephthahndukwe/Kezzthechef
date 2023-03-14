import React, { Fragment, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import './Navbar.css'


const Search = () => {

  const navigate = useNavigate();

    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
          navigate(`/search/${keyword}`)
        }
        else {
          navigate('/shop')
        }
    }

  return (
    <Fragment>
        <form onSubmit={searchHandler}>
          <div className='search-input'>
            <input type='text' placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} />
          </div>
        </form>
    </Fragment>
  )
}

export default Search
