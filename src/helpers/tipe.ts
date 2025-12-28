import { QueryTypes, Transaction } from "sequelize"

export function tipe(replacement?: Object, transaction?: Transaction) {
  return { type: QueryTypes.SELECT, replacement, transaction }
}
