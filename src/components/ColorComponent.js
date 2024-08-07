// From React and Redux ----------------------------------------
import React, { useState } from "react";
// @Mui 
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// ##############################################################
export default function ColorComponent(props) {
  const [color, setcolor] = useState("");

  const handleColorChange = (event) => {
    setcolor(event.target.value);
    props.colorValue(event.target.value);
  };
  const colors = ["white", "black", "blue", "green", "off-white"];

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Color</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={color}
          label="Color"
          onChange={handleColorChange}
        >
          {colors
            ? colors.map((color) => (
                <MenuItem key={Math.random()} value={color}>
                  {color}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
