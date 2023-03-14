import React, { Fragment } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.user)
    const Navigate = useNavigate();

  return (
    <Fragment>
      {loading === false && (
          <Routes>
            <Route 
              {...rest}
              render={props => {
                if(isAuthenticated === false) {
                    return <Navigate to='/login'/>
                }
                if(isAdmin === true && user.role !== 'admin') {
                  return <Navigate to='/' />
                }

                return <Component {...props} />
              }}
            />
          </Routes>
      )}
    </Fragment>
  )
}

export default ProtectedRoute
