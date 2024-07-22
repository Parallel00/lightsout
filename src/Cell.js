import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This handles clicks --- by calling `lightCellsAroundMe`
 *
 * Props:
 *
 * - isLit: boolean, is this cell lit?
 * - lightCellsAroundMe: function to call to flip cells around this cell
 *
 * State: none
 *
 **/

function Cell({ isLit, lightCellsAroundMe }) {
  const classes = isLit ? "Cell Cell-lit" : "Cell";
  return <td className={classes} onClick={lightCellsAroundMe} />;
}

export default Cell;
