import React from "react";
import './Footer.css';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="footer-contents">
                <div className="copyright">
                    <p>Copyright © {year} </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
