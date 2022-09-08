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
              <Link to="/">
                <h2>Dave Williams</h2>
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
            <li className="bord">
            <div className="spinner"></div>
              <a href='#tech' className='page-scroll go'>
                Tech
              </a>
            </li>
            <li className="bord">
            <div className="spinner"></div>
              <a href='#about' className='page-scroll go'>
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
