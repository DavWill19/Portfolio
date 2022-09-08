import React from "react"
import { withRouter, Link, useNavigate } from "react-router-dom"
export const Header = (props) => {
  return (
    <header id='header'>
        <div className='myWrap'>
          <video id="video" autoPlay loop muted>
            <source src='./img/headerVideo.mp4' type='video/mp4' />
          </video>
        </div>
    </header>
  )
}
