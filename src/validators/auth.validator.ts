import * as z from "zod/v4";

const UserSchema = z.strictObject(
  {
    username: z.string("Username is not valid").nonempty("Username is required"),
    email: z.email("Email format is not valid").nonempty("Email is required"),
    password: z.string("Password is not valid").nonempty("Password is required"),
    no_handphone: z.string("Handphone number is not valid"),
  },
  "Your body request is not valid"
);

export const RegisterSchema = z.clone(UserSchema).omit({ no_handphone: true });
export const LoginSchema = UserSchema.omit({ no_handphone: true, username: true });

export type RegisterType = z.infer<typeof RegisterSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
