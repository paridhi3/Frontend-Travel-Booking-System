import './Register.css';
import React, { useContext, useEffect, useState } from 'react';
import { GiArchiveRegister } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';
import PassengerService from "../../service/PassengerService"; 

import showPwIcon from '../../images/show-pw.png';
import hidePwIcon from '../../images/hide-pw.png';

// const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const validName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const validContact = /^\d{10}$/;  
const validAge = /^(1[89]|[2-9]\d)$/;  

const Register = () => {
    const myContext = useContext(MyContext);

    useEffect(() => {
        myContext.onHomePage(false);
    }, [myContext]);

    const [uniqueUser, setUniqueUser] = useState(true);
    const [success, setSuccess] = useState(false);
    // const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidAge, setInvalidAge] = useState(false);
    const [invalidContact, setInvalidContact] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        contact: '',
    });

    const inputHandler = (e) => {
        setUniqueUser(true);
        setSuccess(false);
        // setInvalidPassword(false);
        setInvalidName(false);
        setInvalidAge(false);
        setInvalidContact(false);

        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!validName.test(state.name)) {
            setInvalidName(true);
            return;
        }
        // if (!validPassword.test(state.password)) {
        //     setInvalidPassword(true);
        //     return;
        // }
        if (!validAge.test(state.age)) {
            setInvalidAge(true);
            return;
        }
        if (!validContact.test(state.contact)) {
            setInvalidContact(true);
            return;
        }

        // Prepare user object
        const user = {
            fullName: state.name,
            email: state.email,
            password: state.password,
            gender: state.gender,
            age: parseInt(state.age),
            contact: state.contact
        };

        try {
            const response = await PassengerService.registerPassenger(user);

            if (response.status === 201) {  // Check if registration was successful
                setSuccess(true);
                setState({ name: '', email: '', password: '', gender: '', age: '', contact: '' });
            } else {
                setUniqueUser(false);
            }
        } catch (error) {
            if (error.response) {
                console.error("Backend Response Data:", error.response.data);
                console.error("Backend Response Status:", error.response.status);
                console.error("Backend Response Headers:", error.response.headers);
        
                if (error.response.status === 400 && error.response.data === "Email already exists") {
                    setUniqueUser(false);
                } else {
                    console.error("Unexpected error:", error.response.data);
                }
            } else {
                console.error("Network or server issue", error);
            }
        }
               
    };

    return (
        <div className='register-container'>
            <form className='register' onSubmit={formSubmit}>

                <h1><GiArchiveRegister/></h1>

                <h2>Register</h2>

                {success && <h2 style={{color: 'green'}}>Register Successful. Go to <Link to={'/login'}>Log In.</Link></h2>}
                {!uniqueUser && <h3 style={{color:'red'}}>! This Email is already taken. Try another.</h3>}

                <input name='name' type='text' onChange={inputHandler} value={state.name} placeholder='Full Name*' required />
                {invalidName && <span style={{color:'red'}}>Please enter your full name (first & last name), ex. John Doe</span>}

                <input name='email' type='email' onChange={inputHandler} value={state.email} placeholder='Email*' required />

                {/* <input name='password' type={showPassword ? "text" : "password"} onChange={inputHandler} value={state.password} placeholder='Password*' required /> */}
                <div className="password-container">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={inputHandler}
                        value={state.password}
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
                {/* {invalidPassword && <span style={{color:'red'}}>Password must be at least 8 characters, with a symbol, uppercase & lowercase letter, and a number</span>} */}

                {/* <input name='gender' type='text' onChange={inputHandler} value={state.gender} placeholder='Gender*' required /> */}
                <select 
                    name="gender" 
                    onChange={inputHandler} 
                    value={state.gender} 
                    required 
                    className="gender-select"
                >
                    <option value="" disabled>Gender*</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input name='age' type='number' onChange={inputHandler} value={state.age} placeholder='Age*' required />
                {invalidAge && <span style={{color:'red'}}>Age should be 18 or greater.</span>}

                <input name='contact' type='text' onChange={inputHandler} value={state.contact} placeholder='Contact*' required />
                {invalidContact && <span style={{color:'red'}}>Contact must contain 10 digits.</span>}

                <button type='submit' id="submit">Register</button>
                <Link to={'/login'}>Already have an account? Log In</Link>
            </form>
        </div>
    );
};

export default Register;
