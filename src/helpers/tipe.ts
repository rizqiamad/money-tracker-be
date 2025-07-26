import { QueryTypes, Transaction } from "sequelize";

export function tipe(replacement?: Object, t?: Transaction) {
  return { type: QueryTypes.SELECT, replacement, transaction: t };
}
