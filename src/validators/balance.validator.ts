import { z } from "zod/v4";

export const BalanceSchema = z.strictObject({
  account_id: z.number("send valid data"),
  initial_balance: z.number().nonnegative("send positive value"),
});

export type BalanceType = z.infer<typeof BalanceSchema>;
