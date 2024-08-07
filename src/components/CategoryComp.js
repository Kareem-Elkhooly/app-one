// Style File --------------------------------------------------
import "./css/categoryComp.css";
// From React --------------------------------------------------
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Bootstrap Components
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown';
// @Mui icons
import SortIcon from '@mui/icons-material/Sort';
import DoneIcon from '@mui/icons-material/Done';
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// react slider
import Slider from 'react-slider';
// ##############################################################
export default function CategoryComp(props) {
  // -------------------------------------------------------------------------------------------------------
  //  to get the sort value on chosse or change and send it as a prop to parent component for sorting
      const [sortValue, setSortValue] = useState("default");
      const [marke, setMarke] = useState("default");
      const doneIcon = <DoneIcon fontSize="small" className="doneIcon"></DoneIcon>;
      const sendSort = ()=> {
        props.sortHandle(sortValue)
        setTimeout(function () {
          setSortValue("");
        }, 200);
      }
      useEffect(() => {
        sendSort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [sortValue]);
  // -------------------------------------------------------------------------------------------------------
      const productsFromStore = useSelector((state) => state.products);
      const productsMaxPriceFilter = ()=>{
        const maxPrice= productsFromStore.reduce((acc, current) => {
          return acc > current.price ? acc : current.price;
        }, [""]);
        return Math.ceil(maxPrice); 
      }
      useEffect(() => {
        productsMaxPriceFilter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [productsFromStore]);
      const MINPRICE = 0;
      const MAXPRICE = 2000;
      const [priceRangeValues, setPriceRangeValues]=useState([MINPRICE, MAXPRICE]);
      const MINRATE = 0;
      const MAXRATE = 5;
      const [rateRangeValues, setRateRangeValues]=useState([MINRATE, MAXRATE]);

      const sendRanges = ()=> {
        props.Ranges(priceRangeValues, rateRangeValues, false)
        setSortValue("default")
        setMarke("default")
      }
      const cancelRanges = ()=>{
        setPriceRangeValues([MINPRICE,MAXPRICE])
        setRateRangeValues([MINRATE, MAXRATE])
        props.Ranges([MINPRICE,MAXPRICE], [MINRATE, MAXRATE],true);
        setSortValue("default")
        setMarke("default")
      }
  // -------------------------------------------------------------------------------------------------------
    const toTopAndHandleSearch = () => {
        window.scrollTo(0, 0);
        props.handleSearchArr();
    };
    const toTopAndSendAllClicked = ()=> {
        props.allClicked()
        window.scrollTo(0, 0);
        props.handleSearchArr();
    }
  return (
    <>
      <div className="categ-bg">
        <Container>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="tbletCategories">
              <Dropdown>
                <Dropdown.Toggle variant="trans" id="dropdown-basic" className="py-1 hover d-flex flex-row align-items-center gap-1">
                  <span>Categories</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                    className="categoryLink"
                    onClick={toTopAndHandleSearch}
                    to="/categories/mensclothing"
                    >
                    Men's Clothing
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                    className="categoryLink"
                    onClick={toTopAndHandleSearch}
                    to="/categories/womensclothing"
                    >
                    Women's Clothing
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                    className="categoryLink"
                    onClick={toTopAndHandleSearch}
                    to="/categories/jewelery"
                    >
                    Jewelery
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                    className="categoryLink"
                    onClick={toTopAndHandleSearch}
                    to="/categories/electronics"
                    >
                    Electronics
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                    className="categoryLink"
                    to="/"
                    onClick={toTopAndSendAllClicked}
                    >
                    All
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> 
            <div className="d-flex flex-row align-items-center gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="trans" id="dropdown-basic" className="py-1 hover d-flex flex-row align-items-center gap-1">
                  <SortIcon fontSize="small"></SortIcon><span>Sort</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="sortItem" onClick={
                      function(){
                        setSortValue("b-seller")
                        setMarke("b-seller")
                        }}>Best Seller {marke=== "b-seller"?(doneIcon):(null)}</Dropdown.Item>
                  <Dropdown.Item className="sortItem" onClick={
                      function(){
                        setSortValue("h-rated")
                        setMarke("h-rated")
                        }}>Highest Rated {marke=== "h-rated"?(doneIcon):(null)}</Dropdown.Item>
                  <Dropdown.Item className="sortItem" onClick={
                      function(){
                        setSortValue("l-price")
                        setMarke("l-price")
                        }}>Lowest Price {marke=== "l-price"?(doneIcon):(null)}</Dropdown.Item>
                  <Dropdown.Item className="sortItem" onClick={
                      function(){
                        setSortValue("h-price")
                        setMarke("h-price")
                        }}>Highest Price {marke=== "h-price"?(doneIcon):(null)}</Dropdown.Item>
                  <Dropdown.Item className="sortItem" onClick={
                    function(){
                      setSortValue("name")
                      setMarke("name")
                      }}>Name (A to Z) {marke=== "name"?(doneIcon):(null)}</Dropdown.Item>
                  <Dropdown.Item className="sortItem" onClick={
                    function(){
                      setSortValue("default")
                      setMarke("default")
                      }}>Default {marke=== "default"?(doneIcon):(null)}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" className="btn py-1 px-2 hover d-flex flex-row align-items-center gap-1">
                  <FontAwesomeIcon icon={faFilter} style={{ color: "gray" }} /><span>Filter</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="px-3 py-1 d-flex">
                    <div className="filterRanges">
                      <div className="Range">
                        <div className="RangeTitle"><span>Price</span> Range</div>
                        <div className="RangeRanges"><span>{priceRangeValues[0]}</span><span>{priceRangeValues[1]}</span></div>
                        <Slider 
                        className="slider"
                        onChange={setPriceRangeValues}
                        value={priceRangeValues}
                        min={MINPRICE}
                        max={MAXPRICE}
                        ></Slider>
                      </div>
                      <div className="Range">
                        <div className="RangeTitle"><span>Rated</span> Range</div>
                        <div className="RangeRanges"><span>{rateRangeValues[0]}</span><span>{rateRangeValues[1]}</span></div>
                        <Slider 
                        className="slider"
                        onChange={setRateRangeValues}
                        value={rateRangeValues}
                        min={MINRATE}
                        max={MAXRATE}
                        ></Slider>
                      </div>
                      <div className="filterRangeBtn">
                        <div 
                        className="btn btn-light filterRangeCancel" 
                        onClick={cancelRanges}
                        >Cancel</div>
                        <div 
                        className="btn btn-success filterRangeAplay" 
                        onClick={sendRanges}
                        >Apply</div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>

    </>
  );
}
