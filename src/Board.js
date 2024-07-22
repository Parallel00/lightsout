import React, { useState, useEffect, useCallback } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This handles clicks on individual cells
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard());
  }, [nrows, ncols, chanceLightStartsOn]);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({ length: nrows }).map(() =>
      Array.from({ length: ncols }).map(
        () => Math.random() < chanceLightStartsOn
      )
    );
  }

  /** Check if the player has won */
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /** Flip cells around a given cell */
  const flipCellsAround = useCallback((coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);
      flipCell(y - 1, x);
      flipCell(y + 1, x);

      return boardCopy;
    });
  }, [ncols, nrows]);

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board: rows of Cell components
  const tblBoard = board.map((row, y) => (
    <tr key={y}>
      {row.map((cell, x) => {
        const coord = `${y}-${x}`;
        return (
          <Cell
            key={coord}
            isLit={cell}
            lightCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      })}
    </tr>
  ));

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
