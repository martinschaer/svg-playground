// TODO: is a, b, c… the best way to name these commands's params?
export type CommandArgs0 = {
  type: "Z" | "z";
};
export type CommandArgs1 = {
  type: "H" | "h" | "V" | "v";
  a: number;
};
export type CommandArgs2 = {
  type: "M" | "m" | "L" | "l";
  a: number;
  b: number;
};

export type Command = CommandArgs0 | CommandArgs1 | CommandArgs2;

export type Path = {
  cmds: Command[];
};
