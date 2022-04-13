import React from "react"
import { withRouter, Link, useNavigate } from "react-router-dom"
export const Header = (props) => {
  return (
    <header id='features'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-1 intro-text'>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <Link to='/signup'>
                  <div
                    className='btn btn-custom btn-lg page-scroll'
                  >

                    Sign Up

                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
