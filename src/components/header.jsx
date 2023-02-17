import React from "react"
import { Flip, Fade } from "react-awesome-reveal";

export const Header = (props) => {

  return (
    <header id='header'>
      <div className='myWrap'>
        <div className='headerOverlay' />
        <div
          dangerouslySetInnerHTML={{
            __html: `<video id="video" autoPlay loop muted>
          <source src='./img/portfoliocode.mp4' type='video/mp4' />
        </video>`,
          }}
        />
        <div className='social'>
          <Fade direction='right' delay={100}>
            <hr />
          </Fade>

          <ul>
            <Fade triggerOnce direction='up' delay={100}>
              <li>
                <a href="mailto:davwill@live.com?subject=Developer Inquiry">
                  <i className='fa fa-envelope spin'></i>
                </a>
              </li>
            </Fade>
            <Fade triggerOnce direction='up' delay={200}>
              <li>
                <a href="https://www.linkedin.com/in/david-williams-62ba0b102/">
                  <i className='fa fa-linkedIn spin'></i>
                </a>
              </li>
            </Fade>
            <Fade triggerOnce direction='up' delay={300}>
              <li>
                <a href="https://github.com/DavWill19">
                  <i className='fa fa-github spin'></i>
                </a>
              </li>
            </Fade>
          </ul>
        </div>
        <img className="headerPhoto" src='./img/daveCartoon2.png' alt='header' />
        <h2><Fade direction="down">Hi, I'm Dave</Fade></h2>
        <h1><Fade direction="left" >The Developer.</Fade></h1>
      </div>
    </header>
  )
}


