import { BindOrReplacements, QueryOptions, QueryOptionsWithType, QueryTypes, Transaction } from "sequelize"

interface IReturn {
  type?: QueryTypes.SELECT
  replacements?: BindOrReplacements
  transaction?: Transaction
}

export function tipe(replacements?: BindOrReplacements, transaction?: Transaction): IReturn {
  return { type: QueryTypes.SELECT, replacements, transaction }
}
