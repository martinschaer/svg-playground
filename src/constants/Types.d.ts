// TODO: is a, b, c… the best way to name these commands's params?
export type Command =
  | {
      type: "M" | "m" | "L" | "l";
      a: number;
      b: number;
    }
  | {
      type: "H" | "h" | "V" | "v";
      a: number;
    }
  | {
      type: "Z";
    }
  | {
      type: "z";
    };

export type Path = {
  cmds: Command[];
};
