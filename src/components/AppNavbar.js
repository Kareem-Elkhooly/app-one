// Style File --------------------------------------------------
import "./css/appNavbar.css";
// From React and Redux ----------------------------------------
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Bootstrap Components
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
// @Mui 
  // @Mui Components
  import Badge from "@mui/material/Badge";
  // @Mui Icons
  import FavoriteIcon from "@mui/icons-material/Favorite";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// ##############################################################
function AppNavbar() {
  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.favorite);
  const toTop = () => window.scrollTo(0, 0);
  const logout = ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    document.location.reload();
    toTop();
  }
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        fixed="top"
        expand="lg"
        className="bg-body-tertiary navBar"
      >
        <Container>
          <Link className="navbar-brand" onClick={toTop} to="/">
            RK STORE
          </Link>
          <div className="navOutOfDropdown">
            <Link className="nav-link" onClick={toTop} to="/cart">
              <Badge badgeContent={cart.length}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="align-text-bottom"
                />
              </Badge>
            </Link>
            <Link className="nav-link" onClick={toTop} to="/favorite">
              <Badge badgeContent={favorite.length}>
                <FavoriteIcon
                  fontSize="small"
                  className="align-text-bottom"
                ></FavoriteIcon>
              </Badge>
            </Link>
            {localStorage.getItem("userData")?(
              <>
              <Dropdown className="userDropdown">
                <Dropdown.Toggle className="userDropdownIcon"></Dropdown.Toggle>
                <Dropdown.Menu className="userDropdownMenu">
                  <Dropdown.Item className="userDropdownItem">
                    <Link onClick={toTop} to="/">
                      {localStorage.getItem("userData")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="userDropdownItem">
                    <Link onClick={logout} to="/login">
                      Log Out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>
            ):sessionStorage.getItem("userData")?(
              <>
              <Dropdown className="userDropdown">
                <Dropdown.Toggle className="userDropdownIcon"></Dropdown.Toggle>
                <Dropdown.Menu className="userDropdownMenu">
                  <Dropdown.Item className="userDropdownItem">
                    <Link onClick={toTop} to="/">
                      {sessionStorage.getItem("userData")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="userDropdownItem">
                    <Link onClick={logout} to="/">
                      Log Out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>
            ):(
              <>
                <Link className="nav-link login" onClick={toTop} to="/login">
                  LogIn
                </Link>
              </>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
export default AppNavbar;
