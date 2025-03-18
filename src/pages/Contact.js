import React from 'react';
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Contact.css";
const Contact = () => {
    return (
        <div className="page">

            {/* Banner Image */}
            <div
                className="banner"
                style={{
                    backgroundImage: `url("https://www.shutterstock.com/shutterstock/photos/2152122757/display_1500/stock-photo-business-intelligence-businessman-using-laptop-computer-global-network-connection-data-exchange-2152122757.jpg")`,
                }}
            >
                <div className="banner-overlay">
                    <h2 className="banner-title">Intelligent Visual Analytics Lab</h2>
                    <p className="banner-subtitle">Computer Vision Lab @ MBZUAI</p>
                </div>
            </div>

            <div className="floating-box">
                <h2 className="floating-box-title">Contacts</h2>
                <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <p>Email: example@domain.com</p>
                </div>
                <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <p>Phone: +XXX XXX XXX XXXX</p>
                </div>
                <p className="contact-address">
                    Computer Vision Lab at MBZUAI <br />
                    Masdar City, Building 1B, 2nd Floor, Abu Dhabi, UAE.
                </p>
                <p className="contact-directions">
                    Enter Building 1B close to Multipurpose Hall and take the stairs/elevator to Floor 2.
                </p>
                <p className="contact-hours">9:00 to 17:00 Monday to Friday</p>
            </div>
        </div >
    );
};

export default Contact; 