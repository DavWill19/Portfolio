import React from "react";
import { withRouter, Link, useNavigate } from "react-router-dom";
import { Input, } from 'reactstrap'
import { Navigation } from "./navigation";
import { Button } from "bootstrap";


export function Signup() {

    const navigate = useNavigate();

    const [formData, setData] = React.useState({});
    const [user, setUser] = React.useState({});

    const portalId = () => {
        if (formData.siteNumber) {
            return formData.organization[0].toUpperCase() + formData.organization[1].toUpperCase() + formData.organization[2].toUpperCase() + formData.siteNumber;
        } else {
            return (
                formData.organization[0].toUpperCase() + formData.organization[1].toUpperCase() + formData.organization[2].toUpperCase() + formData.phone.substring(formData.phone.length - 4)
            )
        }

    }

    function handleForm() {
        fetch("https://crewcoin.herokuapp.com/crewuser/signup", {
            method: "POST",
            headers: {
                authorization: "jwt",
                credentials: "same-origin",
                Accept: "application/json, text/html, */*",
                "Content-Type": "application/json",
                mode: "cors"
            },
            body: JSON.stringify({
                "admin": true,
                "username": formData.username,
                "password": formData.password,
                "firstname": formData.firstName[0].toUpperCase() + formData.firstName.substring(1),
                "lastname": formData.lastName[0].toUpperCase() + formData.lastName.substring(1),
                "phone": formData.phone,
                "organization": formData.organization[0].toUpperCase() + formData.organization.substring(1),
                "portalId": formData.siteNumber,
                type: formData.type,
            }),
        })

            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setUser(res.user);
                    localStorage.setItem("token", res.token);
                    navigate('/dashboard', { state: { user: res.user } });

                } else {
                    if (res.message) {
                        alert(res.message + ". Please try another 4 digit number.");
                    } else {
                        alert(res.err.message);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong")
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
                                <Link to="/">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    App
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
                            <img alt="crewcoinlogo" className="crewcoinMd2" src={'../img/crewcoinlogo.png'} />
                            <h2 className='gold'>Setup a new organization</h2>
                            <p className='lead'>
                                Create a new organization to get started with Crew Coin.
                            </p>
                            <form action='/signup' method='POST'>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>First Name</label>
                                            <Input
                                                type='text'
                                                className='form-control'
                                                placeholder='First Name'
                                                name='firstName'
                                                required
                                                onChange={(value) => setData({ ...formData, firstName: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>Last Name</label>
                                            <Input
                                                type='text'
                                                className='form-control'
                                                placeholder='Last Name'
                                                name='lastName'
                                                required
                                                onChange={(value) => setData({ ...formData, lastName: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>Username</label>
                                            <Input
                                                type='email'
                                                className='form-control'
                                                placeholder='Email'
                                                name='username'
                                                required
                                                onChange={(value) => setData({ ...formData, username: value.target.value.toLowerCase() })}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>Organization Name</label>
                                            <Input
                                                type='text'
                                                className='form-control'
                                                placeholder='Organization Name'
                                                name='organization'
                                                required
                                                onChange={(value) => setData({ ...formData, organization: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>Phone Number</label>
                                            <Input
                                                type='phone'
                                                className='form-control'
                                                placeholder='Phone Number'
                                                name='phone'
                                                required
                                                onChange={(value) => setData({ ...formData, phone: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <label>Portal Id</label>
                                            <Input
                                                type='text'
                                                className='form-control'
                                                maxLength={4}
                                                placeholder='4 digit alpha-numeric'
                                                name='siteNumber'
                                                onChange={(value) => setData({ ...formData, siteNumber: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <Input
                                                type='password'
                                                className='form-control'
                                                placeholder='Password'
                                                name='password'
                                                required
                                                onChange={(value) => setData({ ...formData, password: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='form-group'>
                                            <Input
                                                type='password'
                                                className='form-control'
                                                placeholder='Confirm Password'
                                                name='confirmPassword'
                                                required
                                                onChange={(value) => setData({ ...formData, confirmpassword: value.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-8 col-sm-offset-2'>
                                        <div className='form-group'>
                                            <Input
                                                type='select'
                                                className='form-control'
                                                required
                                                onChange={(value) => setData({ ...formData, type: value.target.value })}
                                            >
                                                <option value="" disabled selected>Select Your Organization Type</option>
                                                <option value='restaurant'>Restaurant</option>
                                                <option value='retail'>Retail</option>
                                                <option value='manufacturing'>Manufacturing</option>
                                                <option value='other'>Other</option>
                                            </Input>

                                        </div>
                                    </div>
                                </div>

                            </form>


                            <button onClick={
                                () => {

                                    if (formData.password === formData.confirmpassword && formData.password.length > 7 && /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(formData.password)) {
                                        if (/.+@.+\.[A-Za-z]+$/.test(formData.username)) {
                                            handleForm()
                                        } else {
                                            alert("Please enter valid email");
                                        }
                                    } else {
                                        alert(
                                            "Passwords do not match. Password Must be at least 8 characters long and contain at least one number and one special character",
                                        );
                                    }
                                }
                            }
                                className='btn btn-custom btn-lg page-scroll mb-5' >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


