import React, {
  MouseEventHandler,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Path, Command } from "../../constants/Types";

const getArgsSize = (type: Command["type"]): number => {
  switch (type) {
    case "M":
    case "m":
    case "L":
    case "l":
      return 2;
    case "H":
    case "h":
    case "V":
    case "v":
      return 1;
    case "Z":
    case "z":
    default:
      return 0;
  }
};

const InspectorCmd: React.FC<{
  cmd: Command;
  onClick: MouseEventHandler;
  editMode: boolean;
  onChange: (newCmd: Command) => void;
}> = ({ cmd, onClick, editMode, onChange }) => {
  const [pos, posSet] = useState(0);
  const styles = useMemo(() => {
    let str =
      "p-1 border border-black rounded leading-none flex gap-2 cursor-pointer";
    if (editMode) {
      str += " bg-black text-white";
    }
    return str;
  }, [editMode]);

  const onKeyDown: React.KeyboardEventHandler = useCallback(
    (event: React.KeyboardEvent) => {
      // console.log(event.code);
      if (
        cmd.type === "M" ||
        cmd.type === "m" ||
        cmd.type === "L" ||
        cmd.type === "l"
      ) {
        if (event.code === "ArrowUp") {
          if (pos === 0) {
            onChange({ ...cmd, a: cmd.a + 1 });
          } else {
            onChange({ ...cmd, b: cmd.b + 1 });
          }
        } else if (event.code === "ArrowDown") {
          if (pos === 0) {
            onChange({ ...cmd, a: cmd.a - 1 });
          } else {
            onChange({ ...cmd, b: cmd.b - 1 });
          }
        } else if (event.code === "ArrowLeft") {
          posSet((pos - 1) % getArgsSize(cmd.type));
        } else if (event.code === "ArrowRight") {
          posSet((pos + 1) % getArgsSize(cmd.type));
        }
      } else if (
        cmd.type === "H" ||
        cmd.type === "h" ||
        cmd.type === "V" ||
        cmd.type === "v"
      ) {
        if (event.code === "ArrowUp") {
          onChange({ ...cmd, a: cmd.a + 1 });
        } else if (event.code === "ArrowDown") {
          onChange({ ...cmd, a: cmd.a - 1 });
        } else if (event.code === "ArrowLeft") {
          posSet((pos - 1) % getArgsSize(cmd.type));
        } else if (event.code === "ArrowRight") {
          posSet((pos + 1) % getArgsSize(cmd.type));
        }
      }
    },
    [cmd, pos]
  );

  return (
    <div
      className={styles}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={1}
    >
      {cmd.type === "M" ||
      cmd.type === "m" ||
      cmd.type === "L" ||
      cmd.type === "l" ? (
        <>
          <code>{cmd.type}</code>
          <code>{cmd.a}</code>
          <code>{cmd.b}</code>
        </>
      ) : cmd.type === "H" ||
        cmd.type === "h" ||
        cmd.type === "V" ||
        cmd.type === "v" ? (
        <>
          <code>{cmd.type}</code>
          <code>{cmd.a}</code>
        </>
      ) : (
        <code>{cmd.type}</code>
      )}
    </div>
  );
};

interface PathProps {
  path: Path;
  editMode: boolean;
  onClick: () => void;
  onChange: (cmdIndex: number, newCmd: Command) => void;
}
const InspectorPath: React.FC<PathProps> = ({
  path,
  editMode,
  onClick,
  onChange,
}) => {
  const [editingIndex, editingIndexSet] = useState(-1);
  return (
    <div className="flex gap-2">
      {path.cmds.map((cmd, i) => (
        <InspectorCmd
          key={i}
          cmd={cmd}
          editMode={editMode && editingIndex === i}
          onClick={() => {
            editingIndexSet(editMode ? (i === editingIndex ? -1 : i) : i);
            onClick();
          }}
          onChange={(newCmd: Command) => onChange(i, newCmd)}
        />
      ))}
    </div>
  );
};

interface Props {
  paths: Path[];
  onChange: (pathIndex: number, cmdIndex: number, newCmd: Command) => void;
}
const Inspector: React.FC<Props> = ({ paths, onChange }) => {
  const [editingIndex, editingIndexSet] = useState(-1);
  return (
    <div className="border border-black p-2 rounded flex flex-col gap-2">
      {paths.map((path, i) => (
        <InspectorPath
          key={i}
          path={path}
          editMode={editingIndex === i}
          onClick={() => editingIndexSet(i)}
          onChange={(cmdIndex, newCmd) => onChange(i, cmdIndex, newCmd)}
        />
      ))}
    </div>
  );
};

export default Inspector;
