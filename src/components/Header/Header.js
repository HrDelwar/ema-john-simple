import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul>
                    <li><a href="/shop">shop</a></li>
                    <li><a href="/review">order review</a></li>
                    <li><a href="/manage">manage inventory here</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;