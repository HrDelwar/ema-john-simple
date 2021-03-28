import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetails.css';

const ProductDetails = () => {
    document.title = "Product || Ema-John-Simple"

    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        fetch('https://lit-ridge-69490.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setIsLoading(false)
            })
    }, [productKey])


    return (
        <div className="product-details">
            <h2>Product Details</h2>
            {
                isLoading ?
                    <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 400px)' }}>
                        <CircularProgress />
                    </Grid>
                    :
                    product.key && <Product product={product} showCartBtn={false}></Product>
            }
        </div>
    );
};

export default ProductDetails;