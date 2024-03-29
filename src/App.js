import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [carts, setCarts] = useState([]);

  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <CartContext.Provider value={{ carts, setCarts }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/inventory">
              <Inventory></Inventory>
            </PrivateRoute>
            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
