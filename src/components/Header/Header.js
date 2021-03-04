import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const activeStyle = {
        background: 'rgba(209, 190, 190, 0.5)'
    }
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/shop" activeStyle={activeStyle}>shop</NavLink></li>
                    <li><NavLink to="/review" activeStyle={activeStyle} >order review</NavLink></li>
                    <li><NavLink to="/inventory" activeStyle={activeStyle}>manage inventory </NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;