import { z } from "zod/v4";

export const RecordSchema = z.strictObject({
  pool_accounts_users_id: z.number("input valid type"),
  type: z.enum(["income", "expenses"], "input valid type"),
  category: z.enum(["residence", "meal", "lifestyle", "equipment", "transportation", "charity", "health", "salary", "investment", "freelance", "internet", "etc"]),
  amount: z.number("input valid type"),
  description: z.string().nullish(),
});

export type RecordType = z.infer<typeof RecordSchema>;
