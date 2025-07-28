import { BindOrReplacements, QueryOptionsWithType, QueryTypes, Transaction } from "sequelize";

export function tipe(replacements?: BindOrReplacements, t?: Transaction): QueryOptionsWithType<QueryTypes.SELECT> {
  return { type: QueryTypes.SELECT, replacements, transaction: t };
}
