import './Inventory.css';
import { Button, Container, Grid, Typography, makeStyles, TextField, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";


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

    container: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
}));

const Inventory = () => {
    const classes = useStyles();
    document.title = "Inventory || Ema-John-Simple"
    const [insertedInfo, setInsertedInfo] = useState(null);
    const [image, setImage] = useState("");
    const [product, setProduct] = useState({});


    const methods = useForm();
    const { handleSubmit, control, register, reset, errors: fields } = methods;
    const onSubmit = data => {
        const newData = { ...data, img: image }
        setProduct(newData);
        // handleAddProducts();
    };



    const handleAddProducts = () => {

        fetch('https://lit-ridge-69490.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => setInsertedInfo({ insertedCount: data, error: '', err: null }))
            .catch(err => setInsertedInfo({ insertedCount: 0, err, error: "Document don't inset. Try again!" }))
    }

    const previewFile = () => event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            setImage(reader.result);
        }

        if (file)
            reader.readAsDataURL(file);
        else
            setImage('');
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h2 className="inventory-title">Inventory</h2>
                </Grid>
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)} >
                    <Container>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6} className={classes.container}>
                                <Controller as={CustomTextField} required fullWidth type="text" name="name" control={control} id="outlined-basic" label="Name" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="text" name="category" control={control} id="outlined-basic" label="Category" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="text" name="seller" control={control} id="outlined-basic" label="Seller" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="number" name="Price" control={control} id="outlined-basic" label="Price" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="number" name="stock" control={control} id="outlined-basic" label="Stock" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="number" name="star" control={control} id="outlined-basic" label="Star" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="number" name="starCount" control={control} id="outlined-basic" label="Star Count" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="number" name="shipping" control={control} id="outlined-basic" label="Shipping" variant="outlined" />
                                <Controller as={CustomTextField} required fullWidth type="text" name="url" control={control} id="outlined-basic" label="Web url" variant="outlined" />

                                <input
                                    color="primary"
                                    accept="image/*"
                                    type="file"
                                    name='img'
                                    // ref={register}
                                    onChange={previewFile()}
                                    id="icon-button-file"
                                    className="imageInput"
                                    hidden
                                />
                                <Grid item>
                                    <label htmlFor="icon-button-file">
                                        <Button component="span" className={classes.image} >
                                            <img className={classes.img} alt="Image" src={image} />
                                        </Button>
                                    </label>
                                </Grid>
                                <label htmlFor="icon-button-file">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        size="small"
                                        color="primary"
                                    >
                                        Upload image
                                    </Button>
                                </label>

                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                    <Button type="submit" variant="contained" >Add Data</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </form >
            </Grid>
            {
                insertedInfo !== null && <>
                    {insertedInfo.insertedCount && <Typography align="center" style={{ marginTop: '1rem' }} variant="h5">Your inserted data {insertedInfo.insertedCount} documents.</Typography>}
                    {insertedInfo.error && <Typography align="center" color="error" variant="body1" >{insertedInfo.error}</Typography>}
                </>
            }
        </>
    );
};

export default Inventory;