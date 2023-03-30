import React from "react";
import "./Cell.css";

export interface CellProps {
  // Your code here
  color: "red" | "green" | "blue";
  shape: "circle" | "square" | "triangle";
  isOpen: boolean;
  onClick: Function;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <>
      {props.isOpen ? (
        <div
          className="cell"
          style={{ backgroundColor: props.color }}
          onClick={() => props.onClick()}
        >
          {props.shape}
        </div>
      ) : (
        <div
          className="cell"
          style={{ backgroundColor: "gray" }}
          onClick={() => props.onClick()}
        >
          Open
        </div>
      )}
    </>
  );
};

export default Cell;
