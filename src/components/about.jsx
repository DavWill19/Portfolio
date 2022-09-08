import { Fade, Zoom, Flip, Rotate } from "react-awesome-reveal";
import { useEffect, useState, useMemo } from "react";
import ScrollTrigger from 'react-scroll-trigger';

export const About = (props) => {

  function Dave() {
    const [scrollPosition, setScrollPosition] = useState(0);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    });
    if (scrollPosition > 300) {
    return (
      <div className='daveDiv'>
        <div class="scrolling-words-container">
          <div class="scrolling-words-box">
            <ul>
              <li><h2>FULL STACK</h2></li>
              <li><h2>MOBILE APP</h2></li>
              <li><h2>WEB</h2></li>
              <li><h2>SOFTWARE</h2></li>
              <li><h2>FULL STACK</h2></li>
            </ul>
          </div>
          <div class="bgGold">
            <Fade>
              <h2 className="dev">DEVELOPER</h2>
            </Fade>
          </div>
        </div>
        <Fade>
          <Message1 />
        </Fade>
      </div>

    )
    } else {
      return (  
        null
      )
    }
  }

  function scrollRotate() {
    document.querySelector('#reactImg').style.transform = "rotate(" + window.scrollY / 2 + "deg)";
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollRotate);
    return () => {
      window.removeEventListener('scroll', scrollRotate);
    }
  }, [])

  function Html() {
    return (
      <div className='htmlImg'>
        <Fade triggerOnce cascade direction="right">
          <img className="pulse" alt="icon" src={'../img/htmlIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Css() {
    return (
      <div className='CssImg'>
        <Fade triggerOnce cascade delay={100} direction="right">
          <img className="pulse" alt="icon" src={'../img/cssIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Js() {
    return (
      <div className='JsImg'>
        <Fade triggerOnce cascade delay={200} direction="right">
          <img className="pulse" alt="icon" src={'../img/javascriptIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Bs() {
    return (
      <div className='bsImg'>
        <Fade triggerOnce cascade direction="down">
          <img className="pulse" alt="icon" src={'../img/bootstrapIcon.png'} />
        </Fade>
      </div>
    )
  }
  function React() {
    return (
      <div className='reactImg'>
        <Fade triggerOnce cascade delay={100} direction="left">
          <img id="reactImg" rotate className="reactImg" alt="icon" src={'../img/reactIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Electron() {
    return (
      <div className='electronImg'>
        <Fade triggerOnce cascade delay={200} direction="left">
          <img className="pulse" alt="icon" src={'../img/electronjsIcon.png'} />
        </Fade>
      </div>
    )
  }
  function NodeJs() {
    return (
      <div className='nodeJsImg'>
        <Fade triggerOnce cascade direction="down">
          <img className="pulse" alt="icon" src={'../img/nodejsIcon.jpg'} />
        </Fade>
      </div>
    )
  }
  function MongoDb() {
    return (
      <div className='mongoDbImg'>
        <Fade triggerOnce cascade direction="left">
          <img className="pulse" alt="icon" src={'../img/mongodbIcon.png'} />
        </Fade>
      </div>
    )
  }

  function Message1() {
    return (
      // <Fade>
      <div className='half'>
        <div class="typewriter">
          <h1>Hi, I'm Dave Williams.</h1>
        </div>
      </div>
    )
  }
  function Message2() {
    const [scrollPosition, setScrollPosition] = useState(0);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
      console.log(scrollPosition);
    });
    if (scrollPosition > 1000) {
    return (
      // <Fade>
      <div className='half2'>
        <div class="typewriter">
          <h1>I build responsive websites and apps</h1>
        </div>
      </div>
    )
    } else {
      return (  
        null
      )
    }
  }

  function Message3() {
    const [scrollPosition, setScrollPosition] = useState(0);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
      console.log(scrollPosition);
    });
    if (scrollPosition > 1300) {
    return (
      // <Fade>
      <div className='half3'>
        <div class="typewriter">
          <h1>using modern technologies.</h1>
        </div>
      </div>
    )
    } else {
      return (  
        null
      )
    }
  }

  function Message4() {
    const [scrollPosition, setScrollPosition] = useState(0);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
      console.log(scrollPosition);
    });
    if (scrollPosition > 1600) {
    return (
      // <Fade>
      <div className='half4'>
        <div class="typewriter">
          <h1>Let's build something!</h1>
        </div>
      </div>
    )
    } else {
      return (  
        null
      )
    }
  }

  function ContactButton() {
    return (
      <div className='contactButton'>
        <Fade delay={2300} triggerOnce cascade direction="right">
          <a href="mailto:davill@live.com" className="active" role="button" aria-pressed="true">CONTACT</a>
        </Fade>
      </div>
    )
  }

  // function DevImage() {
  //   return (
  //     <div className='devImg'>
  //       <Fade triggerOnce cascade direction="up">
  //         <img className="devImg pulse" alt="icon" src={'../img/dev.png'} />
  //       </Fade>
  //     </div>
  //   )
  // }

  return (
    <div id="about">
      <Dave />
      <ContactButton />
      <Message2 />
      <Message3 />
      <Message4 />
      <Html />
      <Css />
      <Js />
      <Bs />
      {React()}
      <Electron />
      <NodeJs />
      <MongoDb />
      {/* <DevImage /> */}
      <img className="about" src={'../img/about.png'} alt="about" />
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
