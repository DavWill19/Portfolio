import { Link } from "react-router-dom";

export const Navigation = () => {
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
              <Link to="/">`
                <img alt="crewcoinlogo" className="crewcoinSm" src={'../img/crewcoinlogo.png'} />
              </Link>
            </li>
            <li>

            </li>
          </ul>

        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#feature' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                App
              </a>
            </li>
            <li>
              <a href='#testimonials' className='page-scroll'>
                Testimonials
              </a>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
