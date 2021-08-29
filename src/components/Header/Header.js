import { Badge, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SidebarCart from "../Cart/SidebarCart";
import { getDatabaseCart } from "../../utilities/databaseManager";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    background: "#349da2",
    marginLeft: "1rem",
    "&:hover": {
      background: "#1b895a",
    },
  },
}));

const Header = () => {
  const productCarts = getDatabaseCart();
  const productValues = Object.values(productCarts);
  const totalOrder = productValues.reduce((sum, acc) => acc + sum, 0);

  const activeStyle = {
    background: "rgba(209, 190, 190, 0.5)",
  };
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  const classes = useStyles();
  return (
    <>
      <header className="bg-white">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </header>
      <nav
        className="navbar sticky-top navbar-expand-lg  navbar-dark bg-dark"
        style={{ background: "linear-gradient(45deg, #32a7d5,#6b39f7)" }}
      >
        <div class="container ">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100 justify-content-between mb-2  mb-lg-0">
              <div className="d-md-flex d-block">
                <li class="nav-item me-1">
                  <NavLink
                    to="/shop"
                    className="nav-link text-center text-white"
                    activeStyle={activeStyle}
                  >
                    shop
                  </NavLink>
                </li>
                <li class="nav-item me-1">
                  <NavLink
                    to="/review"
                    className="nav-link text-center text-white"
                    activeStyle={activeStyle}
                  >
                    order review
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    to="/inventory"
                    className="nav-link text-center text-white"
                    activeStyle={activeStyle}
                  >
                    manage inventory{" "}
                  </NavLink>
                </li>
              </div>
              <div className="d-md-flex d-block align-items-center ">
                {loggedUser.email ||
                (loggedUser.displayName && loggedUser.success) ? (
                  <li className="">
                    <Button
                      onClick={() => setLoggedUser({})}
                      className={classes.root}
                    >
                      Log Out
                    </Button>
                  </li>
                ) : (
                  <li className="">
                    <Button>
                      <NavLink
                        className="nav-link text-white"
                        activeStyle={activeStyle}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </Button>
                  </li>
                )}
                <li>
                  <Button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    className="text-white mt-3 mt-md-0"
                  >
                    <Badge badgeContent={totalOrder} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </Button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <SidebarCart />
    </>
  );
};

export default Header;
