// Style File --------------------------------------------------
import "./css/products.css";
// From React and Redux ----------------------------------------
import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
// Local Components --------------------------------------------
import AppNavbar from "./../components/AppNavbar";
import Footer from "./../components/Footer";
import CarouselComp from "./../components/CarouselComp";
import CategoryComp from "./../components/CategoryComp";
import CardCom from "../components/CardCom";
import PaginationComp from "../components/PaginationComp";
import CategoryNav from "./../components/CategoryNav";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
// ##############################################################
function Products() {
  const productsFromStore = useSelector((state) => state.products);
  const [products, setProducts] = useState(productsFromStore);
  useEffect(() => {
    setProducts(productsFromStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsFromStore]);
  // -------------------------------------------------------------------------------------------------------
  // search logic
      const [searchArr, setSearchArr] = useState("");
      const [Results, setResults] = useState("");
      const searchHandle = (searchValue) => {
        if (searchValue !== "") {
          const search = productsFromStore.filter(
            (prod) =>
              prod.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              prod.description.toLowerCase().includes(searchValue.toLowerCase()) ||
              prod.category.toLowerCase().includes(searchValue.toLowerCase())
          );
          if (search.length === 0) {
            setResults("No Results! Try Again With Better Words.");
            setTimeout(function () {
              setResults("");
            }, 4000);
          } else {
            setResults("Your Results");
            setTimeout(function () {
              setResults("");
            }, 10000);
          }
          setSearchArr(search);
        }
      };
      const handleSearchArr = () => {
        setSearchArr("");
      };
  // -------------------------------------------------------------------------------------------------------
  // sort logic
      const [productsBySort, setProductsBySort]= useState([]);
      const [searchArrBySort, setSearchArrBySort]= useState([]);
      function nameSortLogic(arr, setupNewArr){
        const sortByName = [...arr].sort(function(a, b) {
          const nameA = a.title.split(" ").join().toUpperCase();
          const nameB = b.title.split(" ").join().toUpperCase();
          if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
          });
          setupNewArr(sortByName)
      } 
      function hPriceSortLogic(arr, setupNewArr){
        const sortByHPrice = [...arr].sort((a, b) => b.price - a.price);
        setupNewArr(sortByHPrice)
      }
      function lPriceSortLogic(arr, setupNewArr){
        const sortByLPrice = [...arr].sort((a, b) => a.price - b.price);
        setupNewArr(sortByLPrice)
      } 
      function hRatedSortLogic(arr, setupNewArr){
        const sortByHRated = [...arr].sort((a, b) => b.rating.rate - a.rating.rate);
        setupNewArr(sortByHRated)
      } 
      function bSellerSortLogic(arr, setupNewArr){
        const sortByBSeller = [...arr].sort((a, b) => b.rating.count - a.rating.count);
        setupNewArr(sortByBSeller)
      }
      const sortHandle = (sortValue) => {
        if(sortValue !== ""){
          if (sortValue === "name"){
            if(searchArr.length !== 0){
              nameSortLogic(searchArr,setSearchArrBySort);
            }else {
              nameSortLogic(products,setProductsBySort);
            }
            }else if(sortValue === "h-price"){
              if(searchArr.length !== 0){
                hPriceSortLogic(searchArr,setSearchArrBySort)
              }else {
                hPriceSortLogic(products,setProductsBySort)
              }
            }else if(sortValue === "l-price"){
              if(searchArr.length !== 0){
                lPriceSortLogic(searchArr,setSearchArrBySort)
              }else {
                lPriceSortLogic(products,setProductsBySort)
              }
            }else if(sortValue === "h-rated"){
              if(searchArr.length !== 0){
                hRatedSortLogic(searchArr,setSearchArrBySort)
              }else {
                hRatedSortLogic(products,setProductsBySort)
              }
            }else if(sortValue === "b-seller"){
              if(searchArr.length !== 0){
                bSellerSortLogic(searchArr,setSearchArrBySort)
              }else {
                bSellerSortLogic(products,setProductsBySort)
              }
            }else if(sortValue === "default"){
              if(searchArr.length !== 0){
                const sortByDefault = [...searchArr];
                  setSearchArrBySort(sortByDefault)
              }else {
                const sortByDefault = [...products];
                  setProductsBySort(sortByDefault)
              }
            }
          }
      };
  // -------------------------------------------------------------------------------------------------------
  // pagination logic
      const [pageNum, setPageNum] = useState(1);
      const theProductsWillShow = (pageNum) => {
        setPageNum(pageNum);
      };
      let startIndex = (pageNum - 1) * 12;
      let endIndex = pageNum * 12;
  // -------------------------------------------------------------------------------------------------------
      const Ranges = (priceRange, rateRange, cancel)=>{
        if(searchArr.length!==0){
          const filter = searchArr.filter(
            (prod) =>
              prod.price >= priceRange[0] && prod.price <= priceRange[1] && prod.rating.rate >= rateRange[0] && prod.rating.rate <= rateRange[1]
          );
          if(filter.length !== 0){
            setSearchArr(filter)
            if(cancel === true){
              setResults("")
            }else{
              if(filter.length > 1){
                setResults(`There are ${filter.length} products in this range`)
                setTimeout(function () {
                  setResults("");
                }, 5000);
              }else if(filter.length === 1) {
                setResults(`There is ${filter.length} product in this range`)
                setTimeout(function () {
                  setResults("");
                }, 5000);
              }
            }
          }else {
            setResults("No products between this range for your search!.")
            setTimeout(function () {
              setResults("");
            }, 8000);
          }
        }else{
          const filter = productsFromStore.filter(
            (prod) =>
            prod.price >= priceRange[0] && prod.price <= priceRange[1] && prod.rating.rate >= rateRange[0] && prod.rating.rate <= rateRange[1]
          );
          if(filter.length !== 0){
            setProducts(filter)
            if(cancel === true){
              setResults("")
            }else{
              if(filter.length > 1){
                setResults(`There are ${filter.length} products in this range`)
                setTimeout(function () {
                  setResults("");
                }, 5000);
              }else if(filter.length === 1) {
                setResults(`There is ${filter.length} product in this range`)
                setTimeout(function () {
                  setResults("");
                }, 5000);
              }
            }
          }else {
            setResults("No products between this range!.")
            setTimeout(function () {
              setResults("");
            }, 8000);
          }
        }
      }
  // -------------------------------------------------------------------------------------------------------
      const run =(arr)=>{
        return(
          <>
            <div className="cardsContainer">
              {arr.slice(startIndex, endIndex).map((product) => (
                <CardCom key={product.id} product={product} />
              ))}
            </div>
            {arr.length > 12? (
              <PaginationComp
              productsShow={theProductsWillShow}
              numOfPages={Math.ceil(arr.length / 12)}
              ></PaginationComp>
            ):(null)}
          </>
        ); 
      }
  // -------------------------------------------------------------------------------------------------------
      const allClicked = ()=>{
        setProducts(productsFromStore)
      }
  return (
    <div className="home">
      <AppNavbar />
      <CategoryNav
        searchHandle={searchHandle}
        allClicked={allClicked}
        handleSearchArr={handleSearchArr}
      ></CategoryNav>
      <CarouselComp />
      <div id="scrollToHere"></div>
      <CategoryComp
        handleSearchArr={handleSearchArr}
        allClicked={allClicked}
        sortHandle={sortHandle}
        Ranges={Ranges}
      ></CategoryComp>
      <Container>
        <h5 className="text-start text-secondary results">{Results}</h5>
      </Container>
      {searchArr.length !== 0?(
        <Container className="pt-1">
          {searchArrBySort.length !== 0 && searchArrBySort.length === searchArr.length ?(
            run(searchArrBySort)
          ):(
            run(searchArr)
          )}
        </Container>
      ) : (
        <Container className="pt-1">
          {productsBySort.length !== 0 && productsBySort.length === products.length ?(
            run(productsBySort)
          ):(
            run(products)
          )}
        </Container>
      )}
      <Footer />
    </div>
  );
}
export default Products;
