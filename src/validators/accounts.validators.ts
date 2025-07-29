import { z } from "zod/v4";

export const AccountSchema = z.strictObject({ account_name: z.string().nonempty("account_name is required") }, "request body is not valid");

export type AccountType = z.infer<typeof AccountSchema>;
