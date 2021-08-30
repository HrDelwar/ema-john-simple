import {
  Container,
  Grid,
  Typography,
  makeStyles,
  TextField,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../App";
import coolImg from "../../images/giphy.gif";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#D85BBA",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#D85BBA",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2A9CA3",
      },
      "&:hover fieldset": {
        borderColor: "blue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D85BBA",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  container: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Shipment = () => {
  document.title = "Shipment || Ema-John-Simple";
  const classes = useStyles();
  const [loggedUser] = useContext(UserContext);
  const [ordered, setOrdered] = useState(false);
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm();
  const { handleSubmit, control, errors: fields } = methods;
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const strNumToInt = (num) => Number(num.toFixed(2));
    const cart = carts;
    const subTotal = cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * (currentValue.qty || 1),
      0
    );
    const vat = strNumToInt(subTotal / 10);
    const shippingCharge = subTotal > 35 ? 4.44 : subTotal === 0 ? 0 : 12.44;
    const total = strNumToInt(subTotal + vat + shippingCharge);
    const priceInfo = { subTotal, vat, shippingCharge, total };

    const orderInfo = {
      products: savedCart,
      priceInfo,
      shipmentInfo: data,
      orderTime: new Date(),
    };

    fetch("https://lit-ridge-69490.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) processOrder();
        if (result) setOrdered(true);
      });
  };

  useEffect(() => {
    const productCarts = getDatabaseCart();
    const productsKey = Object.keys(productCarts);
    const productValues = Object.values(productCarts);

    fetch("https://lit-ridge-69490.herokuapp.com/cartProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsKey),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((pd, index) => {
          pd.qty = productValues[index];
          return pd;
        });
        setCarts(newData);
        setIsLoading(false);
      });
  });

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Container>
          {isLoading ? (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ minHeight: "calc(100vh - 400px)" }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Grid container justify="center">
              {ordered ? (
                <Grid>
                  <Typography variant="h6" align="center" component="h2">
                    Congratulation!!
                  </Typography>
                  <div className="ordered-img">
                    <img src={coolImg} alt="" />
                  </div>
                </Grid>
              ) : (
                <Grid item xs={12} md={6} className={classes.container}>
                  <Controller
                    as={CustomTextField}
                    required
                    fullWidth
                    type="text"
                    name="name"
                    control={control}
                    defaultValue={loggedUser.displayName}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                  />
                  <Controller
                    as={CustomTextField}
                    required
                    fullWidth
                    type="email"
                    name="email"
                    control={control}
                    defaultValue={loggedUser.email}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    error={fields.email}
                    helperText={fields.email ? fields.email.message : null}
                    // helperText={info.emailError ? 'Enter correct email' : null}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter correct email address",
                      },
                    }}
                  />
                  <Controller
                    as={CustomTextField}
                    required
                    multiline
                    rows="3"
                    error={fields.courierAddress}
                    helperText={
                      fields.courierAddress
                        ? fields.courierAddress.message
                        : null
                    }
                    rules={{
                      minLength: {
                        value: 20,
                        message: "Your address must be 20 character long.",
                      },
                    }}
                    fullWidth
                    type="text"
                    name="courierAddress"
                    control={control}
                    id="outlined-basic"
                    label="Courier Address"
                    variant="outlined"
                  />
                  <Controller
                    as={CustomTextField}
                    required
                    error={fields.mobile}
                    helperText={fields.mobile ? fields.mobile.message : null}
                    rules={{
                      pattern: {
                        value: /[8]*01[3-9]\d{8}$/,
                        message: "Enter correct mobile number",
                      },
                    }}
                    fullWidth
                    type="number"
                    name="mobile"
                    control={control}
                    defaultValue=""
                    id="outlined-basic"
                    label="Mobile No."
                    variant="outlined"
                  />

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="submit-btn"
                      type="submit"
                      value="Place order"
                    />
                  </div>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </form>
    </>
  );
};

export default Shipment;
