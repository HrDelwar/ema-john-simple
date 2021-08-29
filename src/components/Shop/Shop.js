import React, { useContext, useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Grid } from "@material-ui/core";
import TopBanner from "../TopBanner/TopBanner";
import { CartContext } from "../../App";

const Shop = () => {
  document.title = "Shop || Ema-John-Simple";
  const [products, setProducts] = useState([]);
  const { carts, setCarts } = useContext(CartContext);
  const [order, setOrder] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const addToCard = (product) => {
    const newCarts = [...carts, product];
    const sameItem = newCarts.filter((pd) => pd.key === product.key);
    const count = sameItem.length;
    addToDatabaseCart(product.key, count);
    setCarts(newCarts);
    setOrder(order + 1);
  };
  useEffect(() => {
    fetch("https://lit-ridge-69490.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const carts = getDatabaseCart();
    const cartsKeys = Object.keys(carts);
    const productValues = Object.values(carts);
    const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0);

    fetch("https://lit-ridge-69490.herokuapp.com/cartProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartsKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((pd, index) => {
          pd.qty = productValues[index];
          return pd;
        });
        setCarts(newData);
      });
    setOrder(totalOrder);
  }, []);

  return (
    <>
      <TopBanner />
      <div className="container">
        <h2 className="text-center text-capitalize mt-5">Our latest product</h2>
        <div className="container">
          {isLoading ? (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ minHeight: "calc(100vh - 200px)" }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            products.map((product) => (
              <Product
                showCartBtn={true}
                key={product.key}
                product={product}
                addToCard={addToCard}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
