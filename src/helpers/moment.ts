import momentjs from "moment";

export function moment(format?: string) {
  return momentjs().format(format);
}
