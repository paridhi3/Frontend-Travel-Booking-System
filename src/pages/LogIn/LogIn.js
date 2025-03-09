import './LogIn.css';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillLock } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal/Modal';

const LogIn = () => {
    const myContext = useContext(MyContext);

    useEffect(() => {
        myContext.onHomePage(false);
    }, [myContext]);

    const [validUser, setValidUser] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [state, setState] = useState({ email: '', password: '' });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setValidUser(true);
        setWrongPassword(false);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const userData = myContext.users[state.email];

        if (!userData) {
            setValidUser(false);
            return;
        }
        if (userData.password !== state.password) {
            setWrongPassword(true);
            return;
        }

        myContext.addCurrUser({
            name: userData.name,
            email: state.email,
        });

        myContext.loggedInSetter(true);
        myContext.displayPortal(true);
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={formSubmit}>
                <h1><AiFillLock /></h1>
                {!validUser && (<h3 style={{ color: 'red', paddingTop: '50px' }}>Couldn't find your account. <Link to={'/register'}>Register here</Link>.</h3>)}
                {wrongPassword && <h3 style={{ color: 'red' }}>Wrong Password!</h3>}
                <h2>Log In</h2>
                <input id='email' type='email' name='email' onChange={inputHandler} placeholder='Email*' required />
                <input id='password' type='password' name='password' onChange={inputHandler} placeholder='Password*' required />
                <button id='submit' type='submit'>Log In</button>
                <Link to={'/register'}>New User? Sign Up</Link>
            </form>
            {myContext.portalView && document.getElementById('portal') && createPortal(<Modal type='logIn' />, document.getElementById('portal'))}
        </div>
    );
};

export default LogIn;
