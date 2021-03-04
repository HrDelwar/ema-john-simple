import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetails.css';
const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div className="product-details">
            <h2>Product Details</h2>
            <Product product={product} showCartBtn={false}></Product>
        </div>
    );
};

export default ProductDetails;