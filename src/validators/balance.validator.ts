import { z } from "zod/v4";

export const BalanceSchema = z.strictObject({ user_id: z.number("send valid data"), account_id: z.number("send valid data"), total_balance: z.number().nonnegative("send positive value") });

export type BalanceType = z.infer<typeof BalanceSchema>;
