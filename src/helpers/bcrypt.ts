import * as bcrypt from "bcrypt";

export function hashPassword(data: string) {
  return bcrypt.hashSync(data, 10);
}

export function comparePassword(data: string, encryptedPassword: string) {
  return bcrypt.compareSync(data, encryptedPassword);
}
