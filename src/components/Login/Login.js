import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  div,
  Typography,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import Form from "../Form/Form";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  fbProviderFirebase,
  firebaseInitialize,
  googleProviderFirebase,
  ghProviderFirebase,
  signInWithProvidersFirebase,
  twitterProviderFirebase,
} from "./login.manager";

firebaseInitialize();

const googleProvider = googleProviderFirebase();
const fbProvider = fbProviderFirebase();
const ghProvider = ghProviderFirebase();
const twitterProvider = twitterProviderFirebase();

const CustomButton = withStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #e756bc, #1ca1a1)",
    border: 0,
    color: "#fff",
    textTransform: "capitalize",
    marginBottom: "1rem",
    "&:hover": {
      background: "linear-gradient(45deg, #1ca1a1, #e756bc)",
    },
  },
}))(Button);

const GreenCheckbox = withStyles({
  root: {
    color: "#e756bc",
    "&$checked": {
      color: "#1ca1a1",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyle = makeStyles((theme) => ({
  h1: {
    fontSize: "2.5rem",
    margin: ".5rem 0",
    color: "#238976",
    fontWeight: "500",
    textAlign: "center",
    textTransform: "capitalize",
  },
  h2: {
    fontSize: "1.7rem",
  },
  h5: {
    fontSize: "1rem",
  },
  item: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  label: {
    color: "#1ca1a1",
    justifyContent: "center",
  },
}));

const Login = () => {
  document.title = "Login || Ema-John-Simple";
  const classes = useStyle();
  const [newUser, setNewUser] = useState(false);
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const signInWithProviders = (provider) => {
    signInWithProvidersFirebase(provider)
      .then((res) => {
        const newUser = { ...res };
        newUser.success = "User login success";
        setLoggedUser(newUser);
        history.replace(from);
      })
      .catch((err) => {
        setLoggedUser(err);
      });
  };

  return (
    <>
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" className={classes.h1}>
          You need to login
        </Typography>
        <div className="row mt-5">
          <div className="col-md-6 text-center">
            <Typography variant="h5" className={`${classes.h1} ${classes.h5}`}>
              Start with following option
            </Typography>
            <br />
            <CustomButton
              onClick={() => signInWithProviders(ghProvider)}
              variant="outlined"
              startIcon={<GitHubIcon />}
            >
              sign-in with github
            </CustomButton>
            <br />
            <CustomButton
              onClick={() => signInWithProviders(googleProvider)}
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faGooglePlusG} />}
            >
              sign-in with google
            </CustomButton>
            <br />
            <CustomButton
              onClick={() => signInWithProviders(fbProvider)}
              variant="outlined"
              startIcon={<FacebookIcon />}
            >
              sign-in with facebook
            </CustomButton>
          </div>
          <div className="col-md-6 ">
            <div
              className={classes.item}
              container
              direction="column"
              item
              md={6}
              xs={12}
            >
              <FormControlLabel
                className={classes.label}
                control={
                  <GreenCheckbox
                    onChange={() => setNewUser(!newUser)}
                    name="checkedG"
                  />
                }
                label="Check it if you have not account."
              />
              <Typography
                variant="h2"
                className={`${classes.h2} ${classes.h1}`}
              >
                {newUser ? "Sign Up" : "Sign in"}
              </Typography>
              <Form newUser={newUser} setNewUser={setNewUser} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
