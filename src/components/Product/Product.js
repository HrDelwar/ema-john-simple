import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';

const Product = (props) => {
    const { name, img, price, stock, seller } = props.product;
    return (

        <div className='product'>
            <div className="product-img"><img src={img} alt="" /></div>
            <div className="product-details">
                <h3 className="product-title">{name}</h3>
                <p>by:<small style={{ textTransform: 'capitalize' }}> {seller}</small></p>
                <h3 className="product-price">${price}</h3>
                <p>only {stock} left in stock -order soon</p>
                <button
                    className="cart-button"
                    onClick={() => props.addToCard(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} />
                  add to cart
                 </button>
            </div>
        </div>
    );
};

export default Product;