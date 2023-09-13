import React from "react";
import {Link, NavLink} from "react-router-dom";
import resume from "../assets/KevinKang_NewGrad_2023.pdf";

const Navbar = () => {
    return (
        <div className="nav-container">
            <Link to="/home" className="brand nav-logo">
                <div className="kang-container">
                    <img className="kang" src={process.env.PUBLIC_URL + "/home/kang-logo.gif"} alt="logo" />
                </div>
                <div className="brand nav-title">
                    <p> KEVIN KANG </p>
                </div>
            </Link>

            <nav className="nav-bar">
                <NavLink to="/home"> Home </NavLink>
                <NavLink to="/work"> Portfolio</NavLink>
                {/*<NavLink to="/about">About Me</NavLink>*/}
                <a href={resume} target="_blank" rel="noopener noreferrer">Resume</a>
            </nav>
        </div>
    );
};

export default Navbar;