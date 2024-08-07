// Style File --------------------------------------------------
import "./css/sizeComp.css";
// From React and Redux ----------------------------------------
import React, { useState } from "react";
// @Mui 
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// ##############################################################
export default function SizeComponent(props) {
  const [size, setSize] = useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    props.sizeValue(event.target.value);
  };
  const sizes = ["Small", "Medium", "Large", "XL", "XXL"];
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Size</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={size}
          label="Size"
          onChange={handleSizeChange}
        >
          {sizes
            ? sizes.map((size) => (
                <MenuItem key={size + props.product.id} value={size}>
                  {size}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
