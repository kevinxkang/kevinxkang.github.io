import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="social-media-icons">

                    {/*<a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">*/}
                    {/*    <FaFacebook />*/}
                    {/*</a>*/}
                    {/*<a href="https://twitter.com/ORCA_web" target="_blank" rel="noopener noreferrer">*/}
                    {/*    <FaTwitter />*/}
                    {/*</a>*/}

                    <a href={"mailto:kevinkang1k1k@gmail.com"}>
                        <FaMailBulk />
                    </a>
                    <a href="https://www.instagram.com/kevinxkang/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.github.com/kevinxkang" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/kevin-x-kang/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
                <p className="kd"> "I'M ME, I DO ME, AND I CHILL"</p>
                <p>2022 © coded by kevin kang </p>
            </div>
        </footer>
    );
};

export default Footer;

