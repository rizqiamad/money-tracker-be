import * as bcrypt from "bcrypt";

export async function hashPassword(data: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
}

export function comparePassword(data: string, encryptedPassword: string) {
  return bcrypt.compare(data, encryptedPassword);
}
