// Style File --------------------------------------------------
import "./css/cardCom.css";
// From React and Redux ----------------------------------------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../redux/slices/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveFromFavorite,
  AddToFavorite,
} from "../redux/slices/favorite-slice";
// Local Components --------------------------------------------
import SizeComponent from "../components/SizeComponent";
import ColorComponent from "../components/ColorComponent";
// Bootstrap Components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// @Mui 
  //@Mui Components
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Checkbox from "@mui/material/Checkbox";
  //@Mui Icons
  import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import TaskAltIcon from "@mui/icons-material/TaskAlt";
  import DangerousIcon from "@mui/icons-material/Dangerous";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
// ##############################################################
function CardCom(props) {
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
  // add the product to the favorite list
      const addToFav = () => {
        const fav = document
          .getElementById("Checkbox" + props.product.id)
          .nextSibling.childNodes[0].getAttribute("d")
          .startsWith("M16.5");
        if (fav) {
          dispatch(AddToFavorite(props.product));
        } else {
          dispatch(RemoveFromFavorite(props.product));
        }
      };
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
      const valueSent = {
        product: props.product,
        details: [size, color, 1],
      };
  // ----------------------------------------------------------------------------------------------------------
  // to control the massege for onClick "add to cart" button
      const sendValue = "Added, success!";
      const dontSendValue = "Insert size and color first!";
      const [alertValue, setAlertValue] = useState(sendValue);
  // ----------------------------------------------------------------------------------------------------------
      const [sizeAndColorCom, setSizeAndColorCom] = useState(false);
  return (
    <>
      <div className="cardContain " key={props.product.id}>
        <Card className="cardProduct" style={{ width: "100%" }}>
          <div>
            <Link
              onClick={toTop}
              to={"/product/" + props.product.id}
              className="d-flex justify-content-center"
            >
              <Card.Img
                variant="top"
                className="p-3"
                src={props.product.image}
                style={{ height: "170px", width: "170px" }}
              />
            </Link>
          </div>
          <Card.Title className="card-body">
            <div className="mb-1" style={{ fontSize: "15px" }}>
              {props.product.rating.rate}{" "}
              <sup>
                <FontAwesomeIcon icon={faStar} className="starIcon" />
              </sup>
            </div>
            <Link
              onClick={toTop}
              to={"/product/" + props.product.id}
              className="productTitle"
            >
              {props.product.title}
            </Link>
          </Card.Title>
          <Card.Body
            style={{ flex: "none" }}
            className="pt-0"
            id={props.product.id + "details"}
          >
            <div className="elem">
              {sizeAndColorCom === true ? (
                <div className="mt-1">
                  <SizeComponent
                    sizeValue={sizeValue}
                    product={props.product}
                  ></SizeComponent>
                  <ColorComponent
                    colorValue={colorValue}
                    product={props.product}
                  ></ColorComponent>
                </div>
              ) :(null)}
              {alertValue === sendValue ? (
                <div
                  className="alert-added px-2"
                  id={props.product.id}
                >
                  {sendValue} 
                  <TaskAltIcon fontSize="small"></TaskAltIcon>{" "}
                </div>
              ) : (
                <div
                  className="alert-unSend-home px-2"
                  id={props.product.id}
                >
                  {dontSendValue}{" "}
                  <DangerousIcon fontSize="small"></DangerousIcon>
                </div>
              )}
            </div>
            <div className="footerOfCard">
              <Card.Text className="m-0 fw-500 price">
                {/* icon for the dollar sign */}
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
                <span>{props.product.price}</span>
              </Card.Text>
              {/* for love button */}
              <FormControlLabel
                control={
                  <Checkbox
                    id={"Checkbox" + props.product.id}
                    checked={favorite.find(
                      (fav) => fav.love === "love" + props.product.id
                    )}
                    onClick={addToFav}
                    icon={<FavoriteBorderIcon />}
                    checkedIcon={<FavoriteIcon />}
                  />
                }
              />
            </div>
            <div className="addAndUp">
              <Button
                className="add-to-cart"
                variant="success"
                onClick={function () {
                  if (
                    props.product.category.toLowerCase().includes("clothing")
                  ) {
                    if (size === "" || color === "") {
                      setSizeAndColorCom(true)
                      setAlertValue(dontSendValue);
                      alert(props.product.id);
                    } else {
                      setSizeAndColorCom(false)
                      setAlertValue(sendValue);
                      alert(props.product.id);
                      dispatch(AddToCart(valueSent));
                      setTimeout(function () {
                        setSize("");
                        setColor("");
                      }, 300);
                    }
                  } else {
                    dispatch(AddToCart(props.product));
                    alert(props.product.id);
                  }
                }}
              >
                <span>Add to Cart</span>{" "}
                <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
              </Button>
              { sizeAndColorCom === true?(
                <FontAwesomeIcon icon={faChevronUp} className="cardUp" onClick={function(){
                  setSizeAndColorCom(false)
                }} />
              ):(null)}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default CardCom;
