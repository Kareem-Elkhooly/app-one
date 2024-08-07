// Style File --------------------------------------------------
import "./css/categoryComp.css";
// From React --------------------------------------------------
import React, { useState } from "react";
// Bootstrap Components
import Container from "react-bootstrap/Container";
// @Mui icons
import SearchIcon from '@mui/icons-material/Search';
// ##############################################################
export default function CategoryNav(props) {
    // to get search value then send it and remove it
      const [searchValue, setSearchValue] = useState("");
      const serchValueSend = (e) => {
        e.preventDefault();
        props.searchHandle(searchValue);
        setSearchValue("");
      };
return (
    <>
    <div className="categoryNav shadow-sm">
        <Container className="overflow-hidden">
            <div className="d-block">
              <form className="form-inline my-lg-0 d-flex align-items-center me-2 input-group">
                <input
                  className="form-control search"
                  type="search"
                  placeholder="what do you need?"
                  aria-label="Search"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <button
                  className="submit d-flex align-items-center gap-2"
                  type="submit"
                  onClick={(e) => serchValueSend(e)}
                >
                    <span>Search</span>
                    <SearchIcon fontSize="small"></SearchIcon>
                </button>
              </form>
            </div>
        </Container>
    </div>
    </>
);
}
