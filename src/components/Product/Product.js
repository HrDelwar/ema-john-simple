import { faInfoCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const { name, img, price, stock, seller, key, features, star, url } = props.product;
    const ratting = [...Array(star).keys()];
    return (

        <div className='product'>
            <div className="product-img"><img src={img} alt="" /></div>
            <div className="product-details">
                <h3 className="product-title"><Link to={'/product/' + key}>{name}</Link></h3>
                <p>by:<small style={{ textTransform: 'capitalize' }}> {seller}</small></p>
                {
                    !props.showCartBtn && <div>
                        {features.map(item =>
                            <p>{item.description}: {item.value}</p>
                        )}
                    </div>
                }
                {
                    ratting.map(star => <FontAwesomeIcon style={{color:'goldenrod'}} icon={faStar}></FontAwesomeIcon>)
                }
                <h3 className="product-price">${price}</h3>
                <p>only {stock} left in stock -order soon</p>
                {props.showCartBtn ? <button
                    className="cart-button"
                    onClick={() => props.addToCard(props.product)}
                ><FontAwesomeIcon style={{ marginBottom: '2px' }} icon={faShoppingCart} /> add to cart
                 </button> : <button className="cart-button"><a href={url} target="_blank" style={{ color: '#333',outline: 'none',textDecoration:'none' }}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> more info</a></button>}
            </div>
        </div>
    );
};

export default Product;