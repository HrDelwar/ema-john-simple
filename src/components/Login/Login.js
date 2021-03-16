import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Container, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from 'react';
import Form from '../Form/Form';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
var ghProvider = new firebase.auth.GithubAuthProvider();

const CustomButton = withStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #e756bc, #1ca1a1)',
        border: 0,
        color: '#fff',
        textTransform: 'capitalize',
        marginBottom: '1rem',
        '&:hover': {
            background: 'linear-gradient(45deg, #1ca1a1, #e756bc)',
        },
    },
}))(Button);

const GreenCheckbox = withStyles({
    root: {
        color: '#e756bc',
        '&$checked': {
            color: '#1ca1a1',
        }
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyle = makeStyles(theme => ({
    h1: {
        fontSize: '2.5rem',
        margin: '.5rem 0',
        color: '#238976',
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    h2: {
        fontSize: '1.7rem',
    },
    h5: {
        fontSize: '1rem'
    },
    item: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    label: {
        color: '#1ca1a1',
        justifyContent: 'center'
    }
}));



const Login = () => {
    const classes = useStyle();
    const [newUser, setNewUser] = useState(false);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const signInWithProviders = (provider) => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setLoggedUser(user);
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    return (
        <>
            <Container
                component="section"
                maxWidth="lg"
                justify="center"
            >
                <Grid container alignItems="center" direction="column">
                    <Typography variant="h1" className={classes.h1}>
                        You need to login
                    </Typography>
                    <Typography variant="h5" className={`${classes.h1} ${classes.h5}`}>
                        Start with following option
                    </Typography>


                    <CustomButton
                        onClick={() => signInWithProviders(ghProvider)}
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                    >
                        sign-in  with github
                    </CustomButton>
                    <CustomButton
                        variant="outlined"
                        startIcon={<TwitterIcon />}
                    >
                        sign-in  with twitter
                    </CustomButton>
                    <CustomButton
                        onClick={() => signInWithProviders(googleProvider)}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faGooglePlusG} />}
                    >
                        sign-in  with google
                    </CustomButton>
                    <CustomButton
                        onClick={() => signInWithProviders(fbProvider)}
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                    >
                        sign-in  with facebook
                    </CustomButton>
                </Grid>
                <Grid container justify="center" spacing={5}>
                    <Grid className={classes.item} container direction="column" item md={6} xs={12}>
                        <FormControlLabel className={classes.label}
                            control={<GreenCheckbox onChange={() => setNewUser(!newUser)} name="checkedG" />}
                            label="Check it if you have not account."
                        />
                        <Typography variant="h2" className={`${classes.h2} ${classes.h1}`} >{newUser ? 'Sign Up' : 'Sign in'}</Typography>
                        <Form newUser={newUser} setNewUser={setNewUser} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Login;