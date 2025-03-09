import './Modal.css';
import React, { useContext } from 'react';
import { MyContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Modal = ({ type }) => {

    const myContext = useContext(MyContext);
    
    const navigate = useNavigate();

    const portalClose = () => {
        myContext.displayPortal(false);
        if (type !== 'logIn') {
            navigate('/');
        }
    };

    const logIn = () => {
        myContext.displayPortal(false);
        navigate('/login');
    };

    return (
        <div onClick={portalClose} className='modal-container'>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                {type === 'logIn' && (
                    <>
                        <nav className='logIn-modal'>
                            Hi <span>{myContext.currUser?.name?.split(' ')[0] ?? 'Guest'}</span>,
                        </nav>
                        <nav className='logIn-modal'>Welcome to MakeMyTrip</nav>
                    </>
                )}

                {type === 'logOut' && <div className='logOut-modal'>You have successfully logged out.</div>}

                {type === 'checkout' && <section className='checkout-modal'>Congratulations! <br /> Booking successfully completed.</section>}

                {type === 'notLogedIn' && (
                    <section className='notLogedIn-modal'>
                        You are not logged in yet.
                        <button id='login-btn' onClick={logIn}>Log In</button>
                    </section>
                )}

                <button onClick={portalClose}>Go to Home</button>
            </div>
        </div>
    );
};

export default Modal;
