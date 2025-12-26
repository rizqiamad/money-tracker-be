import bcrypt from "bcrypt"

export async function hashPassword(data: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(data, salt)
}

export async function comparePassword(data: string, encrypted: string) {
  return await bcrypt.compare(data, encrypted)
}
