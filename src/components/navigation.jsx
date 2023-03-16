import { Link } from "react-router-dom";
import React from "react";

export const Navigation = () => {
  const [toggle, setToggle] = React.useState({});
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setToggle('collapse');
      setData('#bs-example-navbar-collapse-1')
    }
    else {
      setToggle('');
      setData('')
    }
  } , [])

  function checkForWindowResize() {
    if (window.innerWidth < 768) {
      setToggle('collapse');
      setData('#bs-example-navbar-collapse-1')
    }
    else {
      setToggle('');
      setData('')
    }
}
// set aboutButton z-index to 1
function aboutButton() {
  setTimeout(() => {
  document.querySelector('.aboutButton').style.zIndex = 99999999;
  document.querySelector('.aboutButton').style.zIndex = 0;
  document.querySelector('.aboutButton').style.transition = 'all 0.05s ease-in-out';
  }, 500)
  setTimeout(() => {
    }, 1000)
    setTimeout(() => {
      document.querySelector('.aboutButton').style.zIndex = 99999999;
      }, 1500)
      setTimeout(() => {
        document.querySelector('.aboutButton').style.zIndex = 0;
        }, 2000)
        setTimeout(() => {
          document.querySelector('.aboutButton').style.zIndex = 99999999;
          }, 2500)
          setTimeout(() => {
            document.querySelector('.aboutButton').style.zIndex = 0;
            }, 3000)
            setTimeout(() => {
              document.querySelector('.aboutButton').style.zIndex = 99999999;
              }, 3500)
              setTimeout(() => {
                document.querySelector('.aboutButton').style.zIndex = 0;
                }, 4600)

  console.log('aboutButton')
}
window.addEventListener('resize', checkForWindowResize);
  return (
    <nav id='menu' className='navbar  navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>        
          <ul className='navbar-nav navbar-left'>

            <li>
              <Link to="/">
                <h2>Dave Williams</h2>
              </Link>
            </li>
          </ul>

        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul data-toggle={toggle} data-target={data} className='nav navbar-nav navbar-right'>
            <li className="bord">
            <div className="spinner"></div>
              <a href='#about' className='page-scroll go'>
                Tech Stack
              </a>
            </li>
            <li className="bord">
            <div className="spinner"></div>
              <a onClick={() => {aboutButton()}} href='#aboutButton' className='page-scroll go'>
                About
              </a>
            </li>
            <li className="bord">
            <div className="spinner"></div>
              <a href='#testimonials' className='page-scroll go'>
                Portfolio
              </a>
            </li>
            <li className="bord">
            <div className="spinner"></div>
              <a href='#contact' className='page-scroll go'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  )
}
