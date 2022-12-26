import React from "react";
import {Link, NavLink} from "react-router-dom";
import resume from "../assets/coming-soon.pdf";

const Navbar = () => {
    return (
        <div className="nav-container">
            <Link to="/portfolio" className="brand nav-logo">
                <div className="kang-container">
                    <img className="kang" src={process.env.PUBLIC_URL + "/kang-logo.gif"} alt="logo" />
                </div>
                <div className="brand nav-title">
                    <p> KEVIN KANG </p>
                </div>
            </Link>

            <nav className="nav-bar">
                <NavLink to="/work">Portfolio</NavLink>
                <NavLink to="/about">About Me</NavLink>
                <a href={resume} target="_blank" rel="noopener noreferrer">Resume</a>
            </nav>
        </div>
    );
};

export default Navbar;