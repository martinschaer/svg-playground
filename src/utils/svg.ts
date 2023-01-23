import { Command } from "../constants/Types";

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
