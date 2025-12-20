import bcrypt from "bcrypt"

export async function hashPassword(data: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(data, salt)
}
