import React from "react";
import { withRouter, Link, useNavigate } from "react-router-dom";
import { Input, } from 'reactstrap'
import { Navigation } from "./navigation";

export function Login() {
    const navigate = useNavigate();
    const [formData, setData] = React.useState({});
    const [user, setUser] = React.useState({});


    function handleForm(e) {
        e.preventDefault();
        fetch("https://crewcoin.herokuapp.com/crewuser/login", {
            method: "POST",
            headers: {
                authorization: "jwt",
                credentials: "same-origin",
                Accept: "application/json",
                "Content-Type": "application/json",
                mode: "cors"
            },
            body: JSON.stringify({
                "username": formData.username.toLowerCase(),
                "password": formData.password
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    navigate('/dashboard', { state: { user: data.user } });
                } else {
                    alert("Invalid username or password");
                    console.log(data)
                }

            })
            .catch(err => {
                alert("Invalid username or password");
            }
            );
    }

    return (
        <div>
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
                                <Link to="/">Features</Link>
                            </li>
                            <li>
                                <Link to="/">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    Testimonials
                                </Link>
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
            <div id='signup'>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-6 col-md-offset-3 text-center'>
                            <Link to="/">
                                <img alt="crewcoinlogo" className="crewcoinMd2" src={'../img/crewcoinlogo.png'} />
                            </Link>
                            <h2 className='gold'>Login</h2>
                            <p className='lead'>
                                Sign in to your account
                            </p>
                            <form>
                                <div className='row' >
                                    <div className='col-xs-6 col-xs-offset-3'>
                                        <div className='form-group'>
                                            <input
                                                type='email'
                                                className='form-control'
                                                placeholder='Email'
                                                name='username'
                                                required
                                                onChange={(value) => setData({ ...formData, username: value.target.value })}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='password'
                                                className='form-control'
                                                placeholder='Password'
                                                name='password'
                                                required
                                                onChange={(value) => setData({ ...formData, password: value.target.value })}
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <button onClick={
                                                (e) => {

                                                    handleForm(e)
                                                }
                                            }
                                                className='btn btn-custom btn-lg page-scroll mb-5' >
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}