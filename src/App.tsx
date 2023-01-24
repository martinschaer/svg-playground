import React from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Inspector from "./components/inspector/Inspector";
import { Command, Path } from "./constants/Types";

const PATHS: Path[] = [
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
  const [paths, pathsSet] = React.useState(PATHS);
  const onChange = React.useCallback(
    (pathIndex: number, cmdIndex: number, newCmd: Command) => {
      const updated = [...paths];
      updated[pathIndex].cmds[cmdIndex] = newCmd;
      pathsSet(updated);
    },
    [paths]
  );
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center gap-4">
      <Canvas paths={paths} />
      <Inspector paths={paths} onChange={onChange} />
    </div>
  );
};

export default App;
