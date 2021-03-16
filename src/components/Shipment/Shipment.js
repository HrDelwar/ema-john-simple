import { Container, Grid, makeStyles, TextField, withStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css';


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
        marginTop: '2rem',
    },
    container: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Shipment = () => {
    const classes = useStyles();
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [info, setInfo] = useState({});


    const methods = useForm();
    const { handleSubmit, control, reset } = methods;
    const onSubmit = data => {
        setInfo(data)
    };

    return (
        <>
            <Container>
                <Grid container justify="center">
                    <Grid item>
                        {info.name && <p><strong>Name:</strong> {info.name}</p>}
                        {info.email && <p><strong>Email:</strong> {info.email}</p>}
                        {info.courierAddress && <p><strong>Courier Address:</strong> {info.courierAddress}</p>}
                        {info.mobile && <p><strong>Mobile.No:</strong> {info.mobile}</p>}
                    </Grid>
                </Grid>
            </Container>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)} >
                <Container>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} className={classes.container}>
                            <Controller as={CustomTextField} required fullWidth type="text" name="name" control={control} defaultValue={loggedUser.displayName} id="outlined-basic" label="Name" variant="outlined" />
                            <Controller as={CustomTextField} required fullWidth type="email" name="email" control={control} defaultValue={loggedUser.email} id="outlined-basic" label="Email" variant="outlined"
                                error={info.emailError}
                                helperText={info.emailError ? 'Enter correct email' : null}
                                rules={{
                                    validate: value => {
                                        let validEmail = /\S+@\S+\.\S+/.test(value);
                                        let emailError = true;
                                        if (validEmail) {
                                            emailError = false;
                                        }
                                        let newInfo = { ...info };
                                        newInfo.emailError = emailError;
                                        setInfo(newInfo);
                                        return validEmail;
                                    }
                                }}
                            />
                            <Controller as={CustomTextField} required multiline rows="3" fullWidth type="text" name="courierAddress" control={control} id="outlined-basic" label="Courier Address" variant="outlined" />
                            <Controller as={CustomTextField} required
                                error={info.numError}
                                helperText={info.numError ? 'Enter correct number' : null}
                                rules={{
                                    validate: value => {
                                        let validNum = /[8]*01[3-9]\d{8}$/.test(value);
                                        let numError = true;
                                        if (validNum) {
                                            numError = false;
                                        }
                                        let newInfo = { ...info }
                                        newInfo.numError = numError;
                                        setInfo(newInfo)
                                        return validNum;
                                    }
                                }}
                                fullWidth type="number" name="mobile" control={control} defaultValue="" id="outlined-basic" label="Mobile" variant="outlined" />

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <input className="submit-btn" type="submit" value="Place order" />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </form >
        </>
    );
};

export default Shipment;