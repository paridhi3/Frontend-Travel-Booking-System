import './NotFound.css';
import notFoundLogo from '../../images/404.png';
import React, { useContext, useEffect } from "react";
import { MyContext } from "../../components/Context/Context";

const NotFound =()=>{
    const myContext = useContext(MyContext);
    useEffect(()=>{
        myContext.onHomePage(false);
    },[myContext])

    return(
        <div className="not-found-container">
            <div className='not-found'>
                <img className='not-found-img' src={notFoundLogo} alt="404" />
                <span>We can't seem to find the page</span>
                <span>you are looking for.</span> 
            </div>
        </div>
    )
}
export default NotFound;