import * as z from "zod";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username is required and must have a minimum of 3 characters"),
  password: z.string().min(1, "Password is required"),
});

export { loginFormSchema };

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username is required and must have a minimum of 3 characters"),
    password: z.string().min(1, "Password is required"),
    password_confirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords should match!",
    path: ["password_confirm"],
  });

export { signUpSchema };
