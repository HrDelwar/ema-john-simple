import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import { removeFromDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';

const Review = () => {
    const [carts, setCarts] = useState([]);
    const [orderedItem, setOrderedItem] = useState(0);
    useEffect(() => {
        updateCart();
    }, []);

    const deleteCartItem = id => {
        removeFromDatabaseCart(id);
        updateCart();
    }

    const updateCart = () => {
        const productCarts = getDatabaseCart();
        const productsKey = Object.keys(productCarts);
        const productValues = Object.values(productCarts);
        const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0)

        const products = productsKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.qty = productCarts[key];
            return product;
        });
        setCarts(products);
        setOrderedItem(totalOrder);
    }
    return (
        <div className="review">
            <div className="product-container">
                <h2 className="ordered-title">Ordered item : {orderedItem}</h2>
                <div className="">
                    {
                        carts.map(pd => <ReviewItem
                            product={pd}
                            key={pd.key}
                            deleteCartItem={deleteCartItem}
                        ></ReviewItem>)
                    }
                </div>
            </div>
            <div className="cart-container">
                <Cart ordered={orderedItem} cart={carts} />
            </div>
        </div>
    );
};

export default Review;