import { faDollarSign, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../App";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";

const SidebarCart = () => {
  const { carts, setCarts } = useContext(CartContext);
  const [orderedItem, setOrderedItem] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateCart();
  }, []);

  const subTotal = carts.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * (currentValue.qty || 1),
    0
  );
  const strNumToInt = (num) => Number(num.toFixed(2));
  const vat = strNumToInt(subTotal / 10);
  const shippingCharge = subTotal > 35 ? 4.44 : subTotal === 0 ? 0 : 12.44;
  const total = strNumToInt(subTotal + vat + shippingCharge);

  const deleteCartItem = (id) => {
    removeFromDatabaseCart(id);
    updateCart();
  };

  const history = useHistory();

  const orderProcess = () => {
    if (orderedItem > 0) history.push("/shipment");
    else history.push("/shop");
  };

  const updateCart = () => {
    const productCarts = getDatabaseCart();
    const productsKey = Object.keys(productCarts);
    const productValues = Object.values(productCarts);
    const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0);

    fetch("https://lit-ridge-69490.herokuapp.com/cartProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsKey),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((pd, index) => {
          pd.qty = productValues[index];
          return pd;
        });
        setCarts(newData);
        setIsLoading(false);
      });
    setOrderedItem(totalOrder);
  };

  return (
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <div className=""></div>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div className=" bg-white ">
          <h5 id="offcanvasRightLabel">SubTotal: ${subTotal}</h5>
          <h5 id="offcanvasRightLabel">Shipping: ${shippingCharge}</h5>
          <h5 id="offcanvasRightLabel" className="pb-3 border-bottom border-2">
            Vat: ${vat}
          </h5>
          <h5 id="offcanvasRightLabel">Total: ${total}</h5>
        </div>

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
          carts.map((cart) => (
            <SingleCart
              key={cart.key}
              deleteCartItem={deleteCartItem}
              cart={cart}
            />
          ))
        )}

        <div className="text-center">
          <button onClick={orderProcess} className="cart-button">
            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon> Order
            Process
          </button>
        </div>
      </div>
    </div>
  );
};

const SingleCart = (props) => {
  const { name, qty = 1, img, key, price } = props.cart;
  const toFixed2 = (num) => num.toFixed(2);
  const priceStyle = {
    color: "#555",
  };
  return (
    <div className="d-flex border-bottom align-items-center  border-1 mb-4">
      <div className="">
        <div
          className="text-center mx-auto"
          style={{ width: 100, overflow: "hidden" }}
        >
          <img src={img} className="img-fluid" alt="" />
        </div>
        <h5 className="">{name}</h5>
        <div className="d-flex justify-content-between ">
          <p>
            {qty} X ${price}
          </p>
          <p style={priceStyle}> ${toFixed2(qty * price)}</p>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => props.deleteCartItem(key)}
          className="border-0 text-danger    "
        >
          {" "}
          <FontAwesomeIcon
            style={{ marginBottom: "2px" }}
            icon={faTrash}
          ></FontAwesomeIcon>{" "}
        </button>
      </div>
    </div>
  );
};

export default SidebarCart;
