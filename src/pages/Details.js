// Style File --------------------------------------------------
import "./css/details.css";
// From React and Redux ----------------------------------------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../redux/slices/cart-slice";
import { useDispatch, useSelector } from "react-redux";
// Local Components --------------------------------------------
import AppNavbar from "./../components/AppNavbar";
import Footer from "./../components/Footer";
// Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
// @Mui 
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// ##############################################################
import {
  RemoveFromFavorite,
  AddToFavorite,
} from "../redux/slices/favorite-slice";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";

import Carousel from "react-bootstrap/Carousel";
import Rating from "@mui/material/Rating";
import SizeComponent from "../components/SizeComponent";
import ColorComponent from "../components/ColorComponent";
import CommentBarComp from "../components/CommentBarComp";
import { AddToComments } from "../redux/slices/comments-slice";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DangerousIcon from "@mui/icons-material/Dangerous";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function Details(props) {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const comments = useSelector((state) => state.comments);

  const [countOfAdd, setCountOfAdd] = useState(1);

  function alert(alertId) {
    const alertHere = document.getElementById(alertId);
    alertHere.style.opacity = "1";
    alertHere.style.height = "fit-content";
    setTimeout(function () {
      alertHere.style.opacity = "0";
      alertHere.style.height = "0";
    }, 3000);
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const commentValue = (commentValue, reatingValue) => {
    dispatch(
      AddToComments({
        id: props.product.id,
        name: "guest",
        commentID: `${props.product.id + "guest"}`,
        reat: reatingValue,
        comment: `${commentValue}`,
        date: getDate(),
      })
    );
  };

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

  const [size, setSize] = useState("");
  const sizeValue = (sizeValue) => {
    setSize(sizeValue);
  };
  const [color, setColor] = useState("");
  const colorValue = (colorValue) => {
    setColor(colorValue);
  };
  const valueSent = {
    product: props.product,
    details: [size, color, 1],
  };

  const sendValue = "Added to your cart " + countOfAdd + " Itme, success!";
  const dontSendValue = "Please!, choose the size and color first";
  const [alertValue, setAlertValue] = useState(sendValue);
  return (
    <>
      <AppNavbar />
      <Container>
        <h4 className="text-satrt pt-5 mb-4 mt-5 titleMain">
          <Link to={"/"}>
            Home
          </Link>{"/"}
          <Link to={"/categories/"+props.product.category.toLowerCase().split(" ").join("").split("'").join("")}>
            {props.product.category}
          </Link>
          {"/" + props.product.title}
        </h4>
        <Card className="containerOfDetailsCard mb-5">
          <Carousel
            slide={false}
            className=""
            style={{ height: "fit-content" }}
          >
            <Carousel.Item>
              <Card.Img
                variant="top"
                className="imageCarousel"
                src={props.product.image}
                alt={"Image For /" + props.product.title}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                variant="top"
                className="imageCarousel"
                src={props.product.image}
                alt={"Image For /" + props.product.title}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                variant="top"
                className="imageCarousel"
                src={props.product.image}
                alt={"Image For /" + props.product.title}
              />
            </Carousel.Item>
          </Carousel>
          <Card.Body className="pb-4 d-flex justify-content-between flex-column">
            <div>
              <Card.Title>{props.product.title}</Card.Title>
              <Card.Text className="cardDescription">{props.product.description}</Card.Text>
              <Card.Text>
                <span className="inStock fw-500">In Stock</span>
              </Card.Text>
              <Card.Text>
                <span className="fw-500">Brand :</span>{" "}
                {props.product.brand || "undefined"}
              </Card.Text>
              {props.product.category.toLowerCase().includes("clothing") ? (
                <div>
                  <SizeComponent
                    sizeValue={sizeValue}
                    product={props.product}
                  ></SizeComponent>
                  <ColorComponent
                    colorValue={colorValue}
                    product={props.product}
                  ></ColorComponent>
                </div>
              ) : null}
              <div className="d-flex gap-2 mt-2 mb-3 align-items-center">
                <span className="fw-500">Quantity:</span>
                <div className="GroupInDetails">
                  <Button
                    className="minus"
                    onClick={function () {
                      if (countOfAdd > 1) {
                        setCountOfAdd(countOfAdd - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <div className="showItems">
                    {countOfAdd}
                  </div>
                  <Button
                    className="plus"
                    onClick={() => setCountOfAdd(countOfAdd + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Card.Text className="mb-2">
                <span className="fw-500">{props.product.rating.rate} </span>{" "}
                <Rating
                  name="read-only"
                  value={props.product.rating.rate}
                  size="small"
                  readOnly
                />{" "}
                <sub className="text-muted">
                  ​"{props.product.rating.count}"
                </sub>
              </Card.Text>
              <Card.Text className="mb-0 mt-3">
                <span className="fw-600 priceInDetails">{props.product.price}</span>
                <svg
                  style={{ verticalAlign: "top" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  className="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                </svg>
              </Card.Text>
            </div>
            <div>
              {alertValue === sendValue ? (
                <Card.Text
                  className="alert-added my-2 px-2 py-1"
                  id={props.product.id}
                >
                  <TaskAltIcon fontSize="small"></TaskAltIcon>{" "}
                  {sendValue} 
                </Card.Text>
              ) : (
                <Card.Text
                  className="alert-unSend my-2 px-2 py-1"
                  id={props.product.id}
                >
                  {dontSendValue}{" "}
                  <DangerousIcon fontSize="small"></DangerousIcon>
                </Card.Text>
              )}

              <div className="detailsCardFooter">
                <div className="d-flex justify-content-start gap-2">
                <Button
                    className="add-to-cart-details"
                    onClick={function () {
                      if (
                        props.product.category
                          .toLowerCase()
                          .includes("clothing")
                      ) {
                        if (size === "" || color === "") {
                          setAlertValue(dontSendValue);
                          alert(props.product.id);
                        } else {
                          setAlertValue(sendValue);
                          alert(props.product.id);
                          for (let i = 0; i < countOfAdd; i++) {
                            dispatch(AddToCart(valueSent));
                          }
                        }
                      } else {
                        setAlertValue(sendValue);
                        alert(props.product.id);
                        for (let i = 0; i < countOfAdd; i++) {
                          dispatch(AddToCart(props.product));
                        }
                      }
                    }}
                  >
                    Add to Cart{" "}
                    <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                  </Button>
                  <Button className="buyNowBtn">
                    Buy now{" "}
                    <MonetizationOnIcon fontSize="small"></MonetizationOnIcon>
                  </Button>
                </div>
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
            </div>
          </Card.Body>
        </Card>
        <CommentBarComp
          comments={comments}
          finalCommentValue={commentValue}
          productID={props.product.id}
        ></CommentBarComp>
      </Container>
      <Footer />
    </>
  );
}
