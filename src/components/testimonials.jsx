import { Fade, Flip } from 'react-awesome-reveal';
import React from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
export const Testimonials = (props) => {
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [gitUrl, setgitUrl] = React.useState('');
  const [desktop, setDesktop] = React.useState('');
  const [type, setType] = React.useState('');

  function appStore() {
    if (type === 'phone') {
      // document.querySelector('.modal-content').style.height = '70%';
      return (
        <div className='row mt-3'>
          <div className='col-xs-3 col-xs-offset-3'>
            <a href="https://apps.apple.com/us/app/crew-coin/id1611964163" target='_blank' rel='noreferrer'>
              <img className='smallLogo' src="./img/appStore.png" alt={type} />
            </a>
          </div>
          <div className='col-xs-3'>
            <a href="https://play.google.com/store/apps/details?id=com.davwill19.crewcoin" target='_blank' rel='noreferrer'>
              <img className='smallLogo' src="./img/playStore.png" alt={type} />
            </a>
          </div>
        </div>
      );
    } else {
      // document.querySelector('.modal-content').style.height = '85%';
      return null;
    }
  }

  return (
    <div id='testimonials'>
      <div className="modal fade rotateIn" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <p data-dismis="modal" className='red' aria-label="Close"> <span className='red' aria-hidden="true">&times;</span></p>
        <div className="modal-dialog" role="document">
          <div className="modal-content text-center">
            <i className="fa fa-times" data-dismiss="modal" aria-hidden="true"></i>
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">{title}</h3>
              <hr />
              {appStore()}
            </div>
            <div className="modal-body">
              <img rel="preload" src={image} alt='chipLarge' className={`modalImage ${type}`} />
            </div>
            <div className="modal-footer text-center">
              <div className='row'>
                <div className='col text-center'>
                  <a href={gitUrl}>
                    <i className='icon fa fa-github hoverGold'></i>
                  </a>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12'>
                  <hr />
                </div>
              </div>
              <div className='row'>
                <div className='col social'>
                  <a href={url} target='_blank' rel='noreferrer'>
                    <p>{text}</p>
                  </a>
                  <a href={gitUrl} target='_blank' rel='noreferrer'>
                    <p>{desktop}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        {/* <Fade direction='up' duration={1000} distance='20px'> */}
        <h2>
          <span>P</span>
          <span>o</span>
          <span>r</span>
          <span>t</span>
          <span>f</span>
          <span>o</span>
          <span>l</span>
          <span>i</span>
          <span>o</span>
        </h2>
      </div>

      <div className=' dashed row'>
        <Fade triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType(''); setDesktop(''); setgitUrl('https://github.com/DavWill19/crewcoinweb');
                setImage('./img/crewcoinPreview.png'); setTitle('Crew Coin Web Preview'); setUrl(`https://www.crewcoin.app/`); setText('www.crewcoin.app');
              }}
                className='previewImg' src={'../img/crewcoinPreviewSmall.png'} alt='testimonial' />
              <h3 className='text-center'>Crew Coin - Web</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={500} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType('phone'); setDesktop(''); setgitUrl('https://github.com/DavWill19/crewcoin');
                setImage('./img/phone2.gif'); setTitle('Crew Coin App Preview'); setUrl(`https://www.crewcoin.app/`); setText('www.crewcoin.app');
              }}
                className='previewImg' src={'../img/crewcoinappPreview2Small.png'} alt='testimonial' />
              <h3 className='text-center'>Crew Coin - Mobile App</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={100} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType(''); setDesktop(''); setgitUrl('https://github.com/DavWill19/chiplocked');
                setImage('./img/chiplockedPreview.png'); setTitle('Chip-locked Preview'); setUrl(`https://www.chiplocked.com/`); setText('www.chiplocked.com');
              }}
                className='previewImg' src={'../img/chiplockedPreviewSmall.png'} alt='testimonial' />
              <h3 className='text-center'>Chip Locked Web</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={200} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType(''); setDesktop(''); setgitUrl('https://github.com/DavWill19/Wenventure');
                setImage('./img/wenventurePreview.png'); setTitle('Wenventure Inc Preview'); setUrl(`https://davwill19.github.io/Wenventure/`); setText('www.wenventureinc.com');
              }}
                className='previewImg' src={'../img/wenventurePreviewSmall.png'} alt='testimonial' />
              <h3 className='text-center'>Wenventure Inc Web</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={300} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType(''); setDesktop(''); setgitUrl('https://github.com/DavWill19/PaddleApp');
                setImage('./img/paddlePreview.png'); setTitle('Paddle Pa Preview'); setUrl(`https://www.paddle-pa.com/`); setText('www.paddle-pa.com');
              }}
                className='previewImg' src={'../img/paddlePreviewSmall.png'} alt='testimonial' />
              <h3 className='text-center'>Paddle Web App</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={400} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType(''); setDesktop(''); setgitUrl('https://github.com/DavWill19/foxlandscaping');
                setImage('./img/foxPreview2.png'); setTitle('Fox Landscaping Preview'); setUrl(`https://fox-landscaping.netlify.app/`); setText('www.fox-landscaping.com');
              }}
                className='previewImg' src={'../img/foxPreviewSmall.png'} alt='testimonial' />
              <h3 className='text-center'>Fox Landscaping Web</h3>
            </div>
          </div>
        </Fade>

        <Fade delay={600} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType('desktop'); setgitUrl('https://github.com/DavWill19/borrowloan');
                setDesktop('Borrow and Loan Inventory Control App / Electron');
                setImage('./img/borrowVid.gif'); setTitle('Inventory Control Preview'); setUrl(`#testimonials`); setText('');
              }}
                className='previewImg' src={'../img/borrowLoan.png'} alt='testimonial' />
              <h3 className='text-center'>Inventory Control Desktop App</h3>
            </div>
          </div>
        </Fade>

        <Fade delay={700} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType('desktop');
                setDesktop('Employee Performance Tracking App / Electron');
                setImage('./img/reviewVid.gif'); setTitle('Review Scheduling App Preview'); setUrl(`#testimonials`); setText('');
              }}
                className='previewImg' src={'../img/reviewScheduler.png'} alt='testimonial' />
              <h3 className='text-center'>Employee Review Desktop App</h3>
            </div>
          </div>
        </Fade>
        <Fade delay={800} triggerOnce cascade>
          <div className='col-md-4 col-sm-6 col-xs-6 noPad'>
            <div className='testimonial-image'>
              <img data-toggle="modal" data-target="#exampleModal" onClick={() => {
                setType('desktop'); setgitUrl('https://github.com/DavWill19/moralesurveyreact');
                setDesktop('Employee Morale Tracking App');
                setImage('./img/morale.png'); setTitle('Employee Morale App Preview'); setUrl(`#testimonials`); setText('');
              }}
                className='previewImg' src={'../img/morale.png'} alt='testimonial' />
              <h3 className='text-center'>Employee Morale Survey Web</h3>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

