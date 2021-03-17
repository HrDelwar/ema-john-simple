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
    const { handleSubmit, control, reset, errors: fields } = methods;
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
                                error={fields.email}
                                helperText={fields.email ? fields.email.message : null}
                                // helperText={info.emailError ? 'Enter correct email' : null}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Enter correct email address'
                                    }
                                }}
                            />
                            <Controller as={CustomTextField} required multiline rows="3" fullWidth type="text" name="courierAddress" control={control} id="outlined-basic" label="Courier Address" variant="outlined" />
                            <Controller as={CustomTextField} required
                                error={fields.mobile}
                                helperText={fields.mobile ? fields.mobile.message : null}
                                rules={{
                                    pattern: {
                                        value: /[8]*01[3-9]\d{8}$/,
                                        message: 'Enter correct mobile number'
                                    }
                                }}
                                fullWidth type="number" name="mobile" control={control} defaultValue="" id="outlined-basic" label="Mobile No." variant="outlined" />

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