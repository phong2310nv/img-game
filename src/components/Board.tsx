import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Board.css";
import Cell from "./Cell";
const colors = ["red", "green", "blue"];
const shapes = ["circle", "square", "triangle"];
interface CellInfo {
  id: string;
  color: "red" | "green" | "blue";
  shape: "circle" | "square" | "triangle";
  isOpen: boolean;
}
const randomCellData = () => {
  return {
    color: colors[randomInt(0, 2)],
    shape: shapes[randomInt(0, 2)],
  };
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Board: React.FC = () => {
  const [boardData, setBoardData] = useState<CellInfo[]>([]);
  const [curOpening, setCurOpening] = useState<number[]>([]);
  const [isFreezing, setIsFreezing] = useState(false);
  const stepRef = useRef(0);
  // states...
  const isFinished = useMemo(() => {
    return boardData.length && boardData.every((cell) => cell.isOpen);
  }, [boardData]);

  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const boardArr: any[] = Array.from(new Array(16));
    for (let i = 0; i < 8; i++) {
      const randomData = randomCellData();
      for (let j = 0; j < 2; j++) {
        const remainingEmptyIndex = boardArr
          .map((item, index) => (item ? item : index))
          .filter((item) => Number.isInteger(item));

        const randomEmptyIndex =
          remainingEmptyIndex[randomInt(0, remainingEmptyIndex.length - 1)];
        boardArr[randomEmptyIndex] = {
          id: `${i}_${j}`,
          isOpen: false,
          ...randomData,
        };
      }
      setBoardData(boardArr);
    }
  }, []);
  useEffect(() => {
    console.log(curOpening);
    const [index1, index2] = curOpening;
    if (index1 !== undefined && index2 !== undefined) {
      console.log(boardData[index1], boardData[index2]);
      if (
        boardData[index1].color === boardData[index2].color &&
        boardData[index1].shape === boardData[index2].shape
      ) {
        setCurOpening([]);
        setBoardData(
          boardData.map((item, index) =>
            index === index1 || index === index2
              ? { ...item, isOpen: true }
              : item
          )
        );
      } else {
        setIsFreezing(true);
      }
    }
  }, [curOpening, boardData]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isFreezing) {
      const time = setTimeout(() => {
        setIsFreezing(false);
        setCurOpening([]);
      }, 1000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [isFreezing]);

  const handleCellClick = (index: number) => {
    // Reveal cell, check for matches, update game state, and handle game completion
    if (!boardData[index].isOpen && !isFreezing) {
      console.log();

      if (curOpening[0] === undefined) {
        setCurOpening([index]);
      } else {
        stepRef.current++;
        setCurOpening([curOpening[0], index]);
      }
    }
  };

  if (isFinished) {
    return (
      <div>
        <h2>{`Game Over after ${stepRef.current} tries`}</h2>
      </div>
    );
  }

  return (
    <div className="board">
      {/* Render each cell in the board */}
      {boardData.map((cell, index) => (
        <Cell
          key={cell.id}
          color={cell.color}
          shape={cell.shape}
          isOpen={
            cell.isOpen || index === curOpening[0] || index === curOpening[1]
          }
          onClick={() => handleCellClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
