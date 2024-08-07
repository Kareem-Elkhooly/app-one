/* eslint-disable jsx-a11y/alt-text */
// Style File --------------------------------------------------
import "./css/favorite.css";
// From React and Redux ----------------------------------------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../redux/slices/cart-slice";
import { RemoveFromFavorite } from "../redux/slices/favorite-slice";
// Local Components --------------------------------------------
import SizeComponent from "../components/SizeComponent";
import ColorComponent from "../components/ColorComponent";
import AppNavbar from "./../components/AppNavbar";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
// @Mui 
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DangerousIcon from "@mui/icons-material/Dangerous";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
// ##############################################################
export default function Favorite() {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const toTop = () => window.scrollTo(0, 0);
    // -------------------------------------------------------------------------------------------------------
    // function take "alertId" and show the alert message on product with this id, then heddin alert after 2 secondes
    function alert(alertId) {
      const alertHere = document.getElementById(alertId);
      alertHere.style.opacity = "1";
      alertHere.style.height = "fit-content";
      setTimeout(function () {
        alertHere.style.opacity = "0";
        alertHere.style.height = "0";
      }, 3000);
    }
    // -------------------------------------------------------------------------------------------------------
    // update the product size and color and save it in "valueSent" for send them to the cart with the product
    const [size, setSize] = useState("");
    // to receive size value from size component
        const sizeValue = (sizeValue) => {
          setSize(sizeValue);
        };
    const [color, setColor] = useState("");
    // to receive color value from color component
        const colorValue = (colorValue) => {
          setColor(colorValue);
        };
    // ----------------------------------------------------------------------------------------------------------
    // to control the massege for onClick "add to cart" button
    const sendValue = "Added to your cart, success!";
    const dontSendValue = "Choose the size and color first!";
    const [alertValue, setAlertValue] = useState(sendValue);
    // ----------------------------------------------------------------------------------------------------------
    const [sizeAndColorCom, setSizeAndColorCom] = useState(false);
  return (
    <>
      <AppNavbar />
      <Container className="cartFavoriteContainer">
        {favorite.length === 0 ? (
          <div className="emptyCartAnFAV">
            <h3>Your Favorite Is Empty.</h3>
            <Link to={"/"} className="text-black text-decoration-none">
              <Button variant="dark" className="border mt-3 px-2 py-1">
                Go To Shoping{" "}
                <ShoppingCartCheckoutIcon fontSize="small"></ShoppingCartCheckoutIcon>
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h4 className="text-start mt-4 mb-3 your-big-title">
              Favorite List{" "}
              <ListAltIcon
                style={{ verticalAlign: "sub" }}
              ></ListAltIcon>
            </h4>
            <div className="favoriteList">
              {favorite.map((product) => (
                <div className="favoriteItem border" key={product.id}>
                  <div>
                    <div>
                      <Link
                        to={"/product/" + product.id}
                        className="d-flex justify-content-center"
                      >
                        <img
                          src={product.image}
                          style={{
                            height: "200px",
                            width: "200px",
                          }}
                        />
                      </Link>
                      <div className="fw-500 mt-2" style={{ fontSize: "15px" }}>
                        {product.rating.rate}{" "}
                        <sup>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#F2CC8F" }}
                          />
                        </sup>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={"/product/" + product.id}
                        className="mainTitleCartCard"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <div className="elem">
                      {sizeAndColorCom === product.id ? (
                        <div className="mt-1">
                          <SizeComponent
                            sizeValue={sizeValue}
                            product={product}
                          ></SizeComponent>
                          <ColorComponent
                            colorValue={colorValue}
                            product={product}
                          ></ColorComponent>
                        </div>
                      ) :(null)}
                      {alertValue === sendValue ? (
                        <div
                          className="alert-added px-2"
                          id={product.id}
                        >
                          <TaskAltIcon fontSize="small"></TaskAltIcon>{" "}
                          {sendValue} 
                        </div>
                      ) : (
                        <div
                          className="alert-unSend-home px-2"
                          id={product.id}
                        >
                          <DangerousIcon fontSize="small"></DangerousIcon>{" "}
                          {dontSendValue}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex flex-column gap-2 flex-start">
                      <div className="favoriteItemFooter">
                        <div className="favoriteItemFPrice">
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
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="deleteIcon btn border"
                            icon={faTrash}
                            onClick={function () {
                              dispatch(RemoveFromFavorite(product));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="addAndUp mt-2">
                      <Button
                        className="add-to-cart"
                        variant="success"
                        onClick={function () {
                          if (
                            product.category.toLowerCase().includes("clothing")
                          ) {
                            if (size === "" || color === "") {
                              setSizeAndColorCom(product.id)
                              setAlertValue(dontSendValue);
                              alert(product.id);
                            } else {
                              setSizeAndColorCom(false)
                              setAlertValue(sendValue);
                              alert(product.id);
                              dispatch(AddToCart({product: product,details: [size, color, 1]}));
                              setTimeout(function () {
                                setSize("");
                                setColor("");
                              }, 300);
                            }
                          } else {
                            dispatch(AddToCart(product));
                            alert(product.id);
                          }
                        }}
                      >
                        <span>Add to Cart</span>{" "}
                        <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                      </Button>
                      { sizeAndColorCom === product.id?(
                        <FontAwesomeIcon icon={faChevronUp} className="cardUp" onClick={function(){
                          setSizeAndColorCom(false)
                        }} />
                      ):(null)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="favFooter">
              <Link
                to={"/"}
                onClick={toTop}
                className="text-decoration-none"
              >
                <Button
                  className="shoppingBtn"
                >
                  Shopping{" "}
                  <ShoppingCartCheckoutIcon fontSize="small"></ShoppingCartCheckoutIcon>
                </Button>
              </Link>
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
