import { Command } from "../constants/Types";

export const getArgsSize = (type: Command["type"]): number => {
  switch (type) {
    case "M":
    case "m":
    case "L":
    case "l":
      return 3;
    case "H":
    case "h":
    case "V":
    case "v":
      return 2;
    case "Z":
    case "z":
    default:
      return 1;
  }
};

// TODO: unit test
export const commandToStr = (cmd: Command) => {
  let result = "";
  switch (cmd.type) {
    case "M":
    case "m":
    case "L":
    case "l":
      result += `${cmd.type}${cmd.a} ${cmd.b}`;
      break;
    case "H":
    case "h":
    case "V":
    case "v":
      result += `${cmd.type}${cmd.a}`;
      break;
    default:
      result += cmd.type;
  }
  return result;
};

// TODO: unit test
export const commandsToStr = (cmds: Command[]) => {
  let result = "";
  for (const cmd of cmds) {
    result += commandToStr(cmd);
  }
  return result;
};
