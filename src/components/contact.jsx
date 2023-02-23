import { useState } from 'react'
import emailjs from 'emailjs-com'
import config from '../config'
import React from "react";
import { Fade, Flip } from 'react-awesome-reveal';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Message Sent!',
  {
    // checkmark emoji
    icon: '✅'
    ,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);

function mailAnimation() {

  return (
    <div>
      <img className='mail' src="./img/envelope.png" alt="mail" />
    </div>
  )
}



const api_key = config.API_KEY;

const initialState = {
  name: '',
  email: '',
  message: '',
}
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState)
  const [disable, setDisable] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisable(true)
    document.querySelector('.mail').classList.add('mailAnimation')
    console.log(name, email, message)
    emailjs
      .sendForm(
        'service_otasa49', 'template_8zy3hz9', e.target, api_key
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
          notify()
          setDisable(false)
        },
        (error) => {
          console.log(error.text)
          setDisable(false)
        }
      )
  }
  return (
    <div>
      <div id='contact'>
        <Toaster />
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <Fade triggerOnce direction='left'>
                  <h2>Contact</h2>
                </Fade>
                <Fade direction='left' delay={100} triggerOnce>
                  <p>
                    Please fill out the form below and I will
                    get back to you as soon as possible.
                  </p>
                </Fade>
              </div>
              <Fade triggerOnce direction='right'>
                <form name='sentMessage' validate onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <input
                          value={name}
                          type='text'
                          id='name'
                          name='name'
                          className='form-control'
                          placeholder='Name'
                          required
                          onChange={handleChange}
                        />
                        <p className='help-block text-danger'></p>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <input
                          value={email}
                          type='email'
                          id='email'
                          name='email'
                          className='form-control'
                          placeholder='Email'
                          required
                          onChange={handleChange}
                        />
                        <p className='help-block text-danger'></p>
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <textarea
                      value={message}
                      name='message'
                      id='message'
                      className='form-control'
                      rows='4'
                      placeholder='Message'
                      required
                      onChange={handleChange}
                    ></textarea>
                    <p className='help-block text-danger'></p>
                  </div>
                  <div id='success'></div>
                  {mailAnimation()}
                  <button type='submit'
                    // disable button after submit
                    disabled={disable}
                    className='btn btn-custom btn-lg'>
                    Send Message
                  </button>
                </form>
              </Fade>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <Fade triggerOnce direction='right'>
              <div className='contact-item'>
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className='fa fa-map-marker'></i> Address
                  </span>
                  Duncansville, PA
                </p>
              </div>
              <div className='contact-item'>
                <p>
                  <span>
                    <i className='fa fa-phone'></i> Phone
                  </span>{' '}
                  (814) 937-3904
                </p>
              </div>
              <div className='contact-item'>
                <p>
                  <span>
                    <i className='fa fa-envelope-o'></i> Email
                  </span>{' '}
                  DavWill@live.com
                </p>
              </div>
            </Fade>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <Fade triggerOnce delay={600} direction='down'>
                  <h4>More ways to connect</h4>
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
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p className='footerP'>
            &copy; 2022 Dev Williams. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
