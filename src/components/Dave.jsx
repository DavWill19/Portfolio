import { Fade, Flip } from 'react-awesome-reveal';
import React from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
export const Dave = (props) => {

  const handleClick = event => {
    // set opacity to 0
    event.target.style.opacity = 0;
    // set transition to 0.5s
    event.target.style.transition = '0.5s';

  };

  return (
    <div id='dave'>
      <div className='container'>
        {/* <div className='row'>
          <div className='col-sm-2 text-center'>
            <img onClick={(e) => handleClick(e)} src='./img/htmlIcon.png' alt="html" className='smallIcon' />
          </div>
          <div className='col-sm-2'>
            <img onClick={(e) => handleClick(e)} src='./img/cssIcon.png' alt="html" className='smallIcon' />
          </div>
          <div className='col-sm-2'>
            <img onClick={(e) => handleClick(e)} src='./img/javascriptIcon.png' alt="html" className='smallIcon' />
          </div>
          <div className='col-sm-2'>
            <img onClick={(e) => handleClick(e)} src='./img/reactIcon.png' alt="html" className='smallIcon' />
          </div>
          <div className='col-sm-2'>
            <img onClick={(e) => handleClick(e)} src='./img/nodeJsIcon2.png' alt="html" className='smallIcon' />
          </div>
          <div className='col-sm-2'>
            <img onClick={(e) => handleClick(e)} src='./img/mongoDbIcon.png' alt="html" className='smallIcon' />
          </div>
        </div> */}
        <div className='row'>
          <div className='col-sm-6 ms-auto'>
            <img onClick={(e) => handleClick(e)} className='daveCartoon' src='./img/daveCartoon.png' alt='Dave' />
          </div>
        </div>
      </div>

    </div>
  );
}
