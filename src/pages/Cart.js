/* eslint-disable jsx-a11y/alt-text */
// Style File --------------------------------------------------
import "./css/cart.css";
// From React and Redux ----------------------------------------
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  Clear,
  RemoveFromCart,
  RemoveItemFromCart,
} from "../redux/slices/cart-slice";
import {
  RemoveFromFavorite,
  AddToFavorite,
} from "../redux/slices/favorite-slice";
import { Link } from "react-router-dom";
// Local Components --------------------------------------------
import AppNavbar from "./../components/AppNavbar";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
// @Mui 
  // @Mui Component
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Checkbox from "@mui/material/Checkbox";
  // @Mui Icons
  import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
  import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
  import ClearAllIcon from "@mui/icons-material/ClearAll";
  import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// ##############################################################
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.count * product.price;
    return acc;
  }, 0);

  const toTop = () => window.scrollTo(0, 0);

  const favorite = useSelector((state) => state.favorite);

  return (
    <>
      <AppNavbar />
      <Container className="cartFavoriteContainer">
        {cart.length === 0 ? (
          <div className="emptyCartAnFAV">
            <h3>Your Cart Is Empty.</h3>
            <Link to={"/"} className="text-black text-decoration-none">
              <Button variant="dark" className="border mt-3 px-2 py-1">
                Go To Shoping{" "}
                <ShoppingCartCheckoutIcon fontSize="small"></ShoppingCartCheckoutIcon>
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h4 className="text-center mt-4 mb-3 your-big-title">
              Your Cart{" "}
              <ShoppingBasketIcon
                style={{ verticalAlign: "top" }}
              ></ShoppingBasketIcon>
            </h4>
            <div className="cartList">
              {cart.map((product) => (
                <div className="cartItem border" key={product.id}>
                  <div className="fw-500">
                    <Link
                      to={"/product/" + product.id}
                      className="mainTitleCartCard"
                    >
                      {product.title}
                    </Link>
                  </div>
                  <div className="d-flex flex-row gap-2 mb-2">
                    <Link to={"/product/" + product.id} className="">
                      <img
                        src={product.image}
                        style={{
                          height: "120px",
                          width: "120px",
                        }}
                      />
                    </Link>
                    <div className="w-100 d-flex flex-column gap-1">
                      <div className="m-0">
                        <span className="inStock fw-500">In Stock</span>
                      </div>
                      <div className="m-0">
                        <span className="productTotal">
                          Return within 15 days
                        </span>
                      </div>
                      <div className="fw-500">
                        <svg
                          style={{ verticalAlign: "middle" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          fill="currentColor"
                          className="bi bi-currency-dollar pb-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                        </svg>
                        <span>{product.price}</span>
                      </div>
                      <div className="align-self-end d-flex align-items-center gap-1">
                        <FormControlLabel
                          control={
                            <Checkbox
                              id={"Checkbox" + product.id}
                              checked={favorite.find(
                                (fav) => fav.love === "love" + product.id
                              )}
                              onClick={function addToFav() {
                                const fav = document
                                  .getElementById("Checkbox" + product.id)
                                  .nextSibling.childNodes[0].getAttribute("d")
                                  .startsWith("M16.5");
                                if (fav) {
                                  dispatch(AddToFavorite(product));
                                } else {
                                  dispatch(RemoveFromFavorite(product));
                                }
                              }}
                              icon={<FavoriteBorderIcon />}
                              checkedIcon={<FavoriteIcon />}
                            />
                          }
                        />
                        <FontAwesomeIcon
                          className="deleteIcon btn border"
                          icon={faTrash}
                          onClick={function () {
                            dispatch(RemoveFromCart(product));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-0 mb-2">
                    <span className="your-order">Your order</span>
                  </div>
                  <div className="d-flex gap-2 flex-wrap w-100">
                    {product.details ? (
                      product.details.map((x) => (
                        <div
                          key={x[0] + x[1] + x[2] + product.id}
                          className={"withDetails"}
                        >
                          <div className="text-black-50">
                            With the follow details
                          </div>
                          <div className="d-flex justify-content-between my-1">
                            <span>
                              <span className="fw-500">Size : </span>
                              {x[0]},
                            </span>
                            <span>
                              <span className="fw-500">Color : </span> {x[1]}{" "}
                              <span
                                className="colorSpan"
                                style={{ background: x[1] }}
                              ></span>
                            </span>
                          </div>
                          <div
                            className="Group"
                          >
                            <Button
                              className="minus"
                              onClick={() =>
                                dispatch(
                                  RemoveItemFromCart({
                                    product: product,
                                    details: [x[0], x[1], 1],
                                  })
                                )
                              }
                            >
                              -
                            </Button>
                            <div className="showItems">
                              {x[2] === 0
                                ? "No Items"
                                : x[2] === 1
                                ? x[2] + " Item"
                                : x[2] + " Items"}
                            </div>
                            <Button
                              className="plus"
                              onClick={() => {
                                dispatch(
                                  AddToCart({
                                    product: product,
                                    details: [x[0], x[1], 1],
                                  })
                                );
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : ( 
                      <div className="withDetails">
                        <div
                          className="Group"
                        >
                          <Button
                            className="minus"
                            onClick={() => dispatch(RemoveItemFromCart(product))}
                          >
                            -
                          </Button>
                          <div className="showItems">
                            {product.count === 0
                              ? "No Items"
                              : product.count === 1
                              ? product.count + " Item"
                              : product.count + " Items"}
                          </div>
                          <Button
                            className="plus"
                            onClick={() => dispatch(AddToCart(product))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="productTotal">
                      Product Total {(product.count * product.price).toFixed(2)}$
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">Order Total : {totalPrice.toFixed(2)}$</div>
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex gap-2 ">
                <Button
                  className="clearBtn align-self-start"
                  onClick={function () {
                    dispatch(Clear());
                  }}
                >
                  <ClearAllIcon fontSize="small"></ClearAllIcon> Clear
                </Button>
              </div>
              <div className="text-end d-flex gap-2 ">
                <Link to={"/"} onClick={toTop} className="text-decoration-none">
                  <Button className="shoppingBtn">
                    Shopping{" "}
                    <ShoppingCartCheckoutIcon fontSize="small"></ShoppingCartCheckoutIcon>
                  </Button>
                </Link>
                <Button
                  className="buyBtn align-self-end"
                >
                  Buy{" "}<MonetizationOnIcon fontSize="small"></MonetizationOnIcon>
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
      <div className="footer-copyright">
        © 2024 Copyright: Made By Kareem-Elkhooly
      </div>
    </>
  );
}
