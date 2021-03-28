import React, { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import { removeFromDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { CircularProgress, Grid } from '@material-ui/core';

const Review = () => {
    document.title = "Review || Ema-John-Simple"
    const [carts, setCarts] = useState([]);
    const [orderedItem, setOrderedItem] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        updateCart();
    }, []);

    const deleteCartItem = id => {
        removeFromDatabaseCart(id);
        updateCart();
    }

    const history = useHistory();
    const orderProcess = () => {
        if (orderedItem > 0) history.push('/shipment')
        else history.push('/shop');
    }
    const updateCart = () => {
        const productCarts = getDatabaseCart();
        const productsKey = Object.keys(productCarts);
        const productValues = Object.values(productCarts);
        const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0)

        fetch('https://lit-ridge-69490.herokuapp.com/cartProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsKey)
        })
            .then(res => res.json())
            .then(data => {
                const newData = data.map((pd, index) => {
                    pd.qty = productValues[index];
                    return pd;
                })
                setCarts(newData)
                setIsLoading(false)
            })
        setOrderedItem(totalOrder);
    }
    return (
        <div className="review">
            <div className="product-container">
                <h2 className="ordered-title">Ordered item: {orderedItem}</h2>
                <div className="">
                    {
                        isLoading ?
                            <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 400px)' }}>
                                <CircularProgress />
                            </Grid>
                            :
                            carts.map(pd => <ReviewItem
                                product={pd}
                                key={pd.key}
                                deleteCartItem={deleteCartItem}
                            ></ReviewItem>)
                    }
                </div>

            </div>
            <div className="cart-container">
                <Cart ordered={orderedItem} cart={carts}>
                    <button onClick={orderProcess} className="cart-button"><FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon> Order Process</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;