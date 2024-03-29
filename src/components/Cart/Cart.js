import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const strNumToInt = (num) => Number(num.toFixed(2));
  const cart = props.cart;
  const subTotal = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * (currentValue.qty || 1),
    0
  );
  const vat = strNumToInt(subTotal / 10);
  const shippingCharge = subTotal > 35 ? 4.44 : subTotal === 0 ? 0 : 12.44;
  const total = strNumToInt(subTotal + vat + shippingCharge);

  return (
    <div>
      <h2 className="cart-title">Review Cart</h2>
      <h5 className="cart-title">Item ordered: {props.ordered}</h5>
      <p>SubTotal: ${strNumToInt(subTotal)}</p>
      <p>Shipping charge: ${shippingCharge}</p>
      <p>Tax + VAT: ${vat}</p>
      <p>Total: ${total}</p>
      {props.children}
    </div>
  );
};

export default Cart;
