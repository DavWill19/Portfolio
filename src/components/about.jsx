import { Fade, Zoom, Flip, Rotate } from "react-awesome-reveal";
import { useEffect, useState, useMemo } from "react";

export const About = (props) => {
  const [width, setwidth] = useState(window.innerWidth);
  function update(e) {
    console.log(window.innerWidth);
    var x = e.clientX || e.screenX;
    var y = e.pageY - window.outerHeight - 0 || e.screenY;

    if (window.innerWidth < 800) {
      y = e.pageY - window.outerHeight + 350 || e.screenY;
    }
    else if (window.innerWidth > 800 && window.innerWidth < 900) {
      y = e.pageY - window.outerHeight + 300 || e.screenY;
    }
    else if (window.innerWidth > 900 && window.innerWidth < 1000) {
      y = e.pageY - window.outerHeight + 250 || e.screenY;
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1100) {
      y = e.pageY - window.outerHeight + 200 || e.screenY;
    }
    else if (window.innerWidth > 1100 && window.innerWidth < 1200) {
      y = e.pageY - window.outerHeight + 150 || e.screenY;
    }

    else if (window.innerWidth > 1200) {
      y = e.pageY - window.outerHeight + 50 || e.screenY;
    }



    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
    if (window.innerWidth < 768) {
      document.documentElement.style.setProperty('--cursorX', -100 + 'px')
      document.documentElement.style.setProperty('--cursorY', -100 + 'px')
    }
  }

  document.addEventListener('mousemove', update)
  document.addEventListener('touchstart', update)

  function Dave() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [complete, setComplete] = useState(false);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    });
    if (scrollPosition > 300 || window.innerWidth < 768 || complete === false) {


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
            <div>
              <h2 className="dev">DEVELOPER</h2>
            </div>
          </div>
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
    window.addEventListener('resize', () => setwidth(window.innerWidth));

    return () => {
      window.removeEventListener('scroll', scrollRotate);
    }
  }, [])
  function Html() {
    return (
      <div className='htmlImg'>
        <Fade triggerOnce cascade direction="right">
          <img className="pulse spin" alt="icon" src={'../img/htmlIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Css() {
    return (
      <div className='CssImg'>
        <Fade triggerOnce cascade delay={100} direction="right">
          <img className="pulse spin" alt="icon" src={'../img/cssIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Js() {
    return (
      <div className='JsImg'>
        <Fade triggerOnce cascade delay={200} direction="right">
          <img className="pulse spin" alt="icon" src={'../img/javascriptIcon.png'} />
        </Fade>
      </div>
    )
  }
  function Bs() {
    return (
      <div className='bsImg'>
        <Fade triggerOnce cascade direction="down">
          <img className="pulse spin" alt="icon" src={'../img/bootstrapIcon.png'} />
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
          <img className="pulse spin" alt="icon" src={'../img/electronjsIcon.png'} />
        </Fade>
      </div>
    )
  }
  function NodeJs() {
    return (
      <div className='nodeJsImg'>
        <Fade triggerOnce cascade direction="down">
          <img className="pulse spin" alt="icon" src={'../img/nodejsIcon.png'} />
        </Fade>
      </div>
    )
  }
  function MongoDb() {
    return (
      <div className='mongoDbImg'>
        <Fade triggerOnce cascade direction="left">
          <img className="pulse spin" alt="icon" src={'../img/mongodbIcon.png'} />
        </Fade>
      </div>
    )
  }

  function Message1() {
    const [scrollPosition, setScrollPosition] = useState(0);
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    });
    if (scrollPosition > 300 || window.innerWidth < 768) {
      return (
        // <Fade>
        <div className='half'>
          <div className="typewriter">
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
  function Message2() {
    return (
      // <Fade>
      <div className='half2'>
        <div className="messageText">
          <Fade cascade triggerOnce direction="right">
            <h1>Responsive websites & apps</h1>
          </Fade>
        </div>
      </div>
    )
  }
  function Image2() {
    return (
      // <Fade>
      <div className='responsive'>
        <div className="messageText">
          <Fade cascade delay={500} triggerOnce>
            <img className="responsive" alt="icon" src={'../img/responsive.png'} />
          </Fade>
        </div>
      </div>
    )
  }


  function Message3() {
    return (
      // <Fade>
      <div className='half3'>
        <div className="messageText">
          <Fade cascade delay={500} triggerOnce direction="left">
            <h1>Custom software & databases</h1>
          </Fade>
        </div>
      </div>
    )
  }
  function Image3() {
    return (
      // <Fade>
      <div className='responsive3'>
        <div class="">
          <Fade cascade delay={500} triggerOnce>
            <img className="responsive3" alt="icon" src={'../img/mern.png'} />
          </Fade>
        </div>
      </div>
    )
  }

  function Message4() {
    return (
      // <Fade>
      <div className='half4'>
        <div class="messageText">
          <Fade cascade delay={500} triggerOnce direction="right">
            <h1>and everything in between...</h1>
          </Fade>
        </div>
      </div>
    )
  }

  function ContactButton() {
    return (
      <div className='active contactButton wrap'>
        <Fade delay={2300} triggerOnce cascade direction="right">
          <a href="mailto:davwill@live.com" className="active" role="button" aria-pressed="true">CONTACT</a>
        </Fade>
      </div>
    )
  }

  function AboutButton() {
    return (
      <div>
        <div id="aboutButton" className='aboutButtonRef' />
        <div data-toggle="modal" data-target="#exampleModal2" className='aboutButtonZ' />
        <button data-toggle="modal" data-target="#exampleModal2" className='aboutButton'>Learn More</button>
      </div>
    )
  }
  function Dots() {
    return (
      <>
        <div className='dot' />
        <div className='dot2' />
        <div className='dot3' />
        <div className='dot4' />
        <div className='dot5' />
        <div className='dot6' />
        <div className='dot7' />
        <div className='dot8' />
        <div className='dot9' />
      </>
    )
  }

  return (
    // modal
    <div id="about">
      {Dots()}
      <div data-dismiss="modal" className="modal modal2 digital" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal2-content text-center">
            <div className="modal2-header">
              <div className="circuitOverlay">
                <img alt="icon" className="circuitGif" src={'../img/circuitGif.gif'} />
              </div>
              <div className="vl" />
              <h3 data-dismiss="modal" className="modal2-title" id="exampleModalLabel2">
                <span className="m1 animate-back">A</span>
                <span className="m2 animate-back">b</span>
                <span className="m3 animate-back">o</span>
                <span className="m4 animate-back">u</span>
                <span className="m5 animate-back">t</span>
                <span className="m6 animate-back"> </span>
                <span className="orange">M</span>
                <span className="orange">e</span>
                <hr className="aboutHr" />
              </h3>
            </div>
            <div className="modal2-body">
              <p data-dismiss="modal" className="grow"><span class="wave">👋</span> Hi, I'm Dave.
                <span> </span><span className="op1 m1 animate-back">I create digital experiences that exceed the </span><span className="op2 m2 animate-back">needs of clients and users. I have a </span><span className="op9 m4 animate-back">background in business and bring a </span> <span className="op2 m4 animate-back">commitment to delivering exceptional results, which is evident in my portfolio.

                  I possess a </span><span className="op2 m3 animate-back">comprehensive understanding of a wide </span><span className="op3 m3 animate-back">range of web development technologies, including</span> Bootstrap, React, Node.js, Express, MongoDB, Electron.js, <span className="op4 m5 animate-back">React-Native, and more. I am skilled in using these technologies to create<span className="op1 m1 animate-back"> highly functional websites and</span> applications.

                    I am confident in my ability to manage complex projects</span> from start to <span className="op9 m1 animate-back">finish and ensure that each </span><span className="op5 m5 animate-back">project meets the highest standards of quality. </span>

                <span className="op6 m3 animate-back">I am seeking opportunities to grow my </span><span className="op7 m1 animate-back">skills as a web developer, and to contribute my expertise to </span><span className="op8 m4 animate-back">organizations and projects that share my passion for excellence.</span>





              </p>
            </div>
          </div>
        </div>
      </div>

      <AboutButton />
      <div className="layer" />
      <Dave />
      <Message1 />
      <ContactButton />
      <Message2 />
      <Image2 />
      <Message3 />
      <Image3 />
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
      <img alt="about" className="desktopImg" src={'../img/about.png'} />
      <img alt="about" className="mobileImg" src={'../img/aboutMobile.png'} />
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
