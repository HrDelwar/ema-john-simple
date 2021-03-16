import { Grid, makeStyles, TextField, withStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#D85BBA',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#D85BBA',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#2A9CA3',
            },
            '&:hover fieldset': {
                borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#D85BBA',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        '&  .MuiGrid-grid-xs-12': {
            padding: '0 20px 0 0',
            [theme.breakpoints.down('xs')]: {
                padding: '0',
                marginTop: '16px'
            },
        }
    },
}));



const Form = ({ newUser, setNewUser }) => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const classes = useStyles();
    const [user, setUser] = useState({
        isSignedUser: false,
        fname: '',
        lname: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
    })

    const handleBlur = (e) => {
        let isValid = true;

        if (e.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isValid = e.target.value.length >= 6;
        }

        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            newUserInfo.success = '';
            newUserInfo.error = '';
            setUser(newUserInfo);
        }
    }
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const submitForm = (e) => {
        if (newUser && user.fname && user.lname && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = 'User created successfully!';
                    setUser(newUserInfo);
                    setNewUser(!newUser);
                    const userInfo = {
                        name: `${user.fname} ${user.lname}`
                    };
                    updateUserInfo(userInfo);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = '';
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = 'User Login successfully!';
                    setUser(newUserInfo);
                    setLoggedUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = '';
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }
    const updateUserInfo = (info) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: info.name,
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"
        }).then(() => {
            // console.log('update successfully', info.name);
        }).catch(error => {
            // console.log('error', error);
        });

    }
    return (
        <>
            <form onSubmit={submitForm} className={classes.root} autoComplete="off">
                {newUser && (<Grid container >
                    <Grid item xs={12} sm={6} >
                        <CustomTextField fullWidth required onBlur={handleBlur} name="fname" type="text" id="outlined-basic" label="First name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '0' }} sm={6} >
                        <CustomTextField fullWidth required type="text" name="lname" onBlur={handleBlur} id="outlined-basic" label="Last name" variant="outlined" />
                    </Grid>
                </Grid>)}
                <CustomTextField classes={{ focused: classes.input }} name="email" onBlur={handleBlur} required type="email" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <CustomTextField required type="password" name="password" onBlur={handleBlur} fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <Grid container justify="center">
                    <CustomTextField type="submit" value={newUser ? 'Sign Up' : 'Sign In'} variant="outlined" />
                </Grid>
            </form>
            {user.success && <p style={{ color: 'green', textAlign: 'center' }}>{user.success}</p>}
            {user.error && <p style={{ color: 'red', textAlign: 'center' }}>{user.error}</p>}
        </>
    );
};

export default Form;