import React from "react";
import { Path } from "../../constants/Types";
import { commandsToStr } from "../../utils/svg";

interface Props {
  paths: Path[];
}

const Canvas: React.FC<Props> = ({ paths }) => {
  return (
    <div
      className="bg-white drop-shadow-2xl"
      style={{ width: "400px", height: "400px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 100 100"
      >
        <g
          fill="transparent"
          stroke="currentColor"
          strokeWidth="var(--stroke-width, 8)"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {paths.map((path, i) => (
            <path key={i} d={commandsToStr(path.cmds)} />
          ))}
        </g>
      </svg>
      <div className="text-xs mt-4">
        {paths.map((path, i) => (
          <code className="block" key={i}>{commandsToStr(path.cmds)}</code>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
