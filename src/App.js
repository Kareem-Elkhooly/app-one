// Style File --------------------------------------------------
import "./app-css/app.css";
// From React and Redux ----------------------------------------
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/slices/products-slice";
// Local Components --------------------------------------------
import Products from "./pages/Products";
import Category from "./pages/Category";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
// ##############################################################
function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  });
  const category = [];
  products.forEach((ele) => {
    category.push(ele.category);
  });
  const uniqueCategory = category.filter(
    (value, index) => category.indexOf(value) === index
  );
  const uniqueCategoryClear = uniqueCategory.map((category, index) =>
    category.split(" ").join("").split("'").join("")
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        {products.map((product) => (
          <Route
            key={product.id}
            path={"/product/" + product.id}
            element={<Details product={product} />}
          />
        ))}
        {uniqueCategoryClear.map((category, index) => (
          <Route
            key={index}
            path={"/categories/" + category}
            element={<Category category={category} />}
          />
        ))}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}export default App;
