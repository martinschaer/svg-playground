import React from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import { Path } from "./constants/Types";

const paths: Path[] = [
  {
    cmds: [
      { type: "M", a: 10, b: 10 },
      { type: "H", a: 90 },
      { type: "V", a: 90 },
      { type: "H", a: 10 },
      { type: "L", a: 10, b: 10 },
    ],
  },
  {
    cmds: [
      { type: "M", a: 30, b: 30 },
      { type: "H", a: 70 },
      { type: "V", a: 70 },
      { type: "Z" },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
      <Canvas paths={paths} />
    </div>
  );
};

export default App;
