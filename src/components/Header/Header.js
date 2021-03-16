import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        background: '#349da2',
        marginLeft: '1rem',
        '&:hover': {
            background: '#1b895a'
        }
    },
}));

const Header = () => {
    const activeStyle = {
        background: 'rgba(209, 190, 190, 0.5)'
    }
    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const classes = useStyles();
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
                    {loggedUser.email && (loggedUser.displayName || loggedUser.success) && <li><Button onClick={() => setLoggedUser({})} className={classes.root}>Log Out</Button></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;