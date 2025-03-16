import './LogIn.css';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillLock } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal/Modal';
import PassengerService from '../../service/PassengerService';

import showPwIcon from '../../images/show-pw.png';
import hidePwIcon from '../../images/hide-pw.png';

const LogIn = () => {
    const myContext = useContext(MyContext);

    useEffect(() => {
        myContext.onHomePage(false);
    }, [myContext]);

    const [validUser, setValidUser] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [state, setState] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setValidUser(true);
        setWrongPassword(false);
    };

    // Handle form submission
    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call API for login
            const response = await PassengerService.loginPassenger(state.email, state.password);
            
            // If login is successful, store user details in context
            if (response.data) {
                console.log("(Login.js) Response data login: ", response.data);
                myContext.addCurrUser(response.data); // ✅ Store all user details

                myContext.loggedInSetter(true);
                myContext.displayPortal(true);
                
                // ✅ Persist login state
                localStorage.setItem("loggedInUserEmail", state.email);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setWrongPassword(true);
            } else {
                setValidUser(false);
            }
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={formSubmit}>
                <h1><AiFillLock /></h1>
                {!validUser && (<h3 style={{ color: 'red', paddingTop: '50px' }}>Couldn't find your account. <Link to={'/register'}>Register here</Link>.</h3>)}
                {wrongPassword && <h3 style={{ color: 'red' }}>Wrong Password!</h3>}
                <h2>Log In</h2>
                
                {/* Email Input */}
                <input 
                    id='email' 
                    type='email' 
                    name='email' 
                    onChange={inputHandler} 
                    value={state.email} // ✅ Controlled input
                    placeholder='Email*' 
                    required 
                />

                {/* Password Input with Show/Hide Toggle */}
                <div className="password-container">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={inputHandler}
                        value={state.password} // ✅ Controlled input
                        placeholder="Password*"
                        required
                        className="password-input"
                    />
                    <img
                        src={showPassword ? showPwIcon : hidePwIcon}
                        alt="Toggle Password"
                        className="toggle-password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>

                <button id='submit' type='submit'>Log In</button>
                <Link to={'/register'}>New User? Sign Up</Link>
            </form>

            {/* Show Portal (Modal) on Login */}
            {console.log("(Login.js) Setting portal view to true")}
            {myContext.portalView && document.getElementById('portal') && createPortal(<Modal type='logIn' />, document.getElementById('portal'))}
        </div>
    );
};

export default LogIn;
