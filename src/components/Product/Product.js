import { faCartPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { name, img, price, stock, seller, key, features, star, url } =
    props.product;
  const ratting = [...Array(star).keys()];
  return (
    <div className="d-block text-center text-md-start justify-content-between align-items-center d-md-flex">
      <div className="" s>
        <img src={img} alt="" className="img-fluid" />
      </div>
      <div className="product-details text-start w-100  ">
        <h3 className="product-title">
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <p>
          by:<small style={{ textTransform: "capitalize" }}> {seller}</small>
        </p>
        {!props.showCartBtn && (
          <div>
            {features.map((item) => (
              <p>
                {item.description}: {item.value}
              </p>
            ))}
          </div>
        )}
        {ratting.map((star) => (
          <FontAwesomeIcon
            style={{ color: "goldenrod" }}
            icon={faStar}
          ></FontAwesomeIcon>
        ))}
        <h3 className="product-price">${price}</h3>
        <p>only {stock} left in stock -order soon</p>
        {props.showCartBtn && (
          <button
            className="cart-button"
            onClick={() => props.addToCard(props.product)}
          >
            <FontAwesomeIcon
              style={{ marginBottom: "2px" }}
              icon={faCartPlus}
            />{" "}
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
