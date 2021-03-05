import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])
    const [order, setOrder] = useState(0);
    const addToCard = (product) => {
        const newCart = [...cart, product];
        const sameItem = newCart.filter(pd => pd.key === product.key);
        const count = sameItem.length;
        addToDatabaseCart(product.key, count);
        setCart(newCart);
        setOrder(order + 1);
    }
    useEffect(() => {
        const carts = getDatabaseCart();
        const cartsKeys = Object.keys(carts);
        const productValues = Object.values(carts);
        const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0)

        const cartProducts = cartsKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.qty = carts[key]
            return product;
        });
        setOrder(totalOrder);
        setCart(cartProducts)
    }, [])

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        showCartBtn={true}
                        key={product.key}
                        product={product}
                        addToCard={addToCard}
                    />)
                }
            </div>
            <div className="cart-container">
                <Cart ordered={order} cart={cart} >
                    <Link to="/review"><button className="cart-button"><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;