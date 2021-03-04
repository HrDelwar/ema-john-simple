
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, qty, img, key, price} = props.product;
    const toFixed2 = (num) => num.toFixed(2);
    const priceStyle = {
        color:'#555'
    }
    return (
        <div className="product-details product-container review-item">
            <div className="product-img"><img src={img} alt="" /></div>
            <h3 className="product-title">{name}</h3>
            <div className="">
                <p>Quantity: {qty}</p>
                <p style={priceStyle}>Per price: ${price}</p>
                <p style={priceStyle}>Total price: ${toFixed2(qty * price)}</p>
            </div>
            <button onClick={() => props.deleteCartItem(key)} className="cart-button"> <FontAwesomeIcon style={{ marginBottom: '2px' }} icon={faTrash}></FontAwesomeIcon> Remove</button>
        </div>
    );
};

export default ReviewItem;