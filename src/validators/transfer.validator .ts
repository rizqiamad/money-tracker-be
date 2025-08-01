import { z } from "zod/v4";

export const TransferLogSchema = z.strictObject({
  pool_accounts_users_from_id: z.number("input valid type"),
  amount_sent: z.number("input valid type"),
  pool_accounts_users_to_id: z.number("input valid type"),
  amount_received: z.number("input valid type"),
  description: z.string().nullish(),
});

export type TransferLogType = z.infer<typeof TransferLogSchema>;
