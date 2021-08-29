import { CircularProgress, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import { addToDatabaseCart } from "../../utilities/databaseManager";
import Product from "../Product/Product";
import "./ProductDetails.css";

const ProductDetails = () => {
  document.title = "Product || Ema-John-Simple";

  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { carts, setCarts } = useContext(CartContext);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetch("https://lit-ridge-69490.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, [productKey]);

  const addToCard = (product) => {
    const newCarts = [...carts, product];
    const sameItem = newCarts.filter((pd) => pd.key === product.key);
    const count = sameItem.length;
    addToDatabaseCart(product.key, count);
    setCarts(newCarts);
    setOrder(order + 1);
  };

  return (
    <div className="product-details">
      <h2>Product Details</h2>
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
        product.key && (
          <Product
            product={product}
            addToCard={addToCard}
            showCartBtn={true}
          ></Product>
        )
      )}
    </div>
  );
};

export default ProductDetails;
