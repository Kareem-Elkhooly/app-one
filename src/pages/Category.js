// From React and Redux ----------------------------------------
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./../redux/slices/products-slice";
// Local Components --------------------------------------------
import CategoryComp from "../components/CategoryComp";
import CardCom from "./../components/CardCom";
import PaginationComp from "../components/PaginationComp";
import AppNavbar from "./../components/AppNavbar";
import Footer from "./../components/Footer";
import CategoryNav from "./../components/CategoryNav";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
// ##############################################################
function Category(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  });
  // -------------------------------------------------------------------------------------------------------
  // get the category products coming from props and show it
  const categoryProd = [];
  products.forEach((ele) => {
    const categoryClear = ele.category.split(" ").join("").split("'").join("");
    if (categoryClear === props.category.split(" ").join("").split("'").join("")) {
      categoryProd.push(ele);
    } else {
      <h1>Not Found !</h1>;
    }
  });
  const  [categoryProducts, setCategoryProducts] = useState(categoryProd);
  useEffect(() => {
    setCategoryProducts(categoryProd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);
  // -------------------------------------------------------------------------------------------------------
  // search logic
      const [searchArr, setSearchArr] = useState("");
      const [Results, setResults] = useState("");
      const searchHandle = (searchValue) => {
        if (searchValue !== "") {
          const search = categoryProd.filter(
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
          nameSortLogic(searchArr,setSearchArrBySort)
        }else {
          nameSortLogic(categoryProducts,setProductsBySort)
        }
        }else if(sortValue === "h-price"){
          if(searchArr.length !== 0){
            hPriceSortLogic(searchArr,setSearchArrBySort)
          }else {
            hPriceSortLogic(categoryProducts,setProductsBySort)
          }
        }else if(sortValue === "l-price"){
          if(searchArr.length !== 0){
            lPriceSortLogic(searchArr,setSearchArrBySort)
          }else {
            lPriceSortLogic(categoryProducts,setProductsBySort)
          }
        }else if(sortValue === "h-rated"){
          if(searchArr.length !== 0){
            hRatedSortLogic(searchArr,setSearchArrBySort)
          }else {
            hRatedSortLogic(categoryProducts,setProductsBySort)
          }
        }else if(sortValue === "b-seller"){
          if(searchArr.length !== 0){
            bSellerSortLogic(searchArr,setSearchArrBySort)
          }else {
            bSellerSortLogic(categoryProducts,setProductsBySort)
          }
        }else if(sortValue === "default"){
          if(searchArr.length !== 0){
            const SortByDefault = [...searchArr];
              setSearchArrBySort(SortByDefault)
          }else {
            const SortByDefault = [...categoryProducts];
              setProductsBySort(SortByDefault)
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
              setResults(`There are ${filter.length} products between this range in ${categoryProd[0].category} category`)
              setTimeout(function () {
                setResults("");
              }, 5000);
            }else if(filter.length === 1){
              setResults(`There is ${filter.length} product between this range in ${categoryProd[0].category} category`)
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
        const filter = categoryProd.filter(
          (prod) =>
            prod.price >= priceRange[0] && prod.price <= priceRange[1] && prod.rating.rate >= rateRange[0] && prod.rating.rate <= rateRange[1]
        );
        if(filter.length !== 0){
          setCategoryProducts(filter)
          if(cancel === true){
            setResults("")
          }else{
            if(filter.length > 1){
              setResults(`There are ${filter.length} products between this range in ${categoryProd[0].category} category`)
              setTimeout(function () {
                setResults("");
              }, 5000);
            }else if(filter.length === 1){
              setResults(`There is ${filter.length} product between this range in ${categoryProd[0].category} category`)
              setTimeout(function () {
                setResults("");
              }, 5000);
            }
          }
        }else {
          setResults(`No products between this range in ${categoryProd[0].category} category!.`)
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
        
      }
  return (
    <>
      <AppNavbar />
      <div className="pt-5">
        <div id="scrollToHere"></div>
        <CategoryNav
          searchHandle={searchHandle}
          allClicked={allClicked}
          handleSearchArr={handleSearchArr}
        ></CategoryNav>
        <CategoryComp
          handleSearchArr={handleSearchArr}
          allClicked={allClicked}
          sortHandle={sortHandle}
          Ranges={Ranges}
        ></CategoryComp>
        <Container>
          <h5 className="text-left mt-5 text-capitalize text-black-50 categoryTitle">
            {categoryProducts[0].category}
          </h5>
          <h6 className="text-start mb-1 m-0 text-secondary results">{Results}</h6>
          {searchArr.length !== 0? (
            <>
              {searchArrBySort.length !== 0 && searchArrBySort.length === searchArr.length ?(
                run(searchArrBySort)
              ):(
                run(searchArr)
              )}
            </>
          ) : (
            <>
              {productsBySort.length !== 0 && productsBySort[0].category === categoryProducts[0].category && productsBySort.length === categoryProducts.length ?(
                run(productsBySort)
              ):(
                run(categoryProducts)
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
export default Category;
