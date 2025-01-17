// From React and Redux ----------------------------------------
import * as React from "react";
// @Mui 
  // @Mui Components
  import Box from "@mui/material/Box";
  import Rating from "@mui/material/Rating";
  // @Mui Icons
  import StarIcon from "@mui/icons-material/Star";
// ##############################################################
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
// ##############################################################
export default function TextRating({ reat }) {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="text-feedback"
        value={reat}
        readOnly
        size="small"
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2, fontSize: "12px" }}>{labels[reat]}</Box>
    </Box>
  );
}
