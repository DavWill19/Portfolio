import React from "react"
import { Flip, Fade } from "react-awesome-reveal";

export const Header = (props) => {
  function Welcome() {
      return (
        <h3 className='headerTitle'><Fade triggerOnce>Welcome!</Fade></h3>
      )

  }

  return (
    <header id='header'>
      <div className='myWrap'>
        <div className='headerOverlay' />
        <Welcome />
        <video id="video" autoPlay loop muted>
          <source src='./img/headerVideo.mp4' type='video/mp4' />
        </video>
      </div>
    </header>
  )
}


