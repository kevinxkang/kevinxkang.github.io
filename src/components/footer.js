import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="social-media-icons">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com/ORCA_web" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com/oceans.orcas/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.github.com/astonishedorca14" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/company/orcasindia/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
                <p className="kd"> "I'M ME, I DO ME, AND I CHILL"</p>
                <p>2022 © designed by orca </p>
            </div>
        </footer>
    );
};

export default Footer;

